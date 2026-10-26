#!/usr/bin/env python3
"""Procedurally draws the botanical line-art (hero) and the festive wreath (workshops).
Output is injected between marker comments in index.html by scripts/inline_art.py.
Deterministic (seeded) so re-running gives identical art.
Run: python3 scripts/gen_art.py && python3 scripts/inline_art.py
"""
import math, random, pathlib

R = lambda v: f"{v:.1f}".rstrip('0').rstrip('.')

def pt(cx, cy, r, a):
    return cx + r * math.cos(a), cy + r * math.sin(a)

def petal(cx, cy, length, width, ang, tip_curve=0.9):
    """One pointed petal radiating from (cx,cy) along angle ang (radians)."""
    ux, uy = math.cos(ang), math.sin(ang)
    vx, vy = -uy, ux
    def P(f, s):  # f along petal, s sideways
        return cx + ux * f + vx * s, cy + uy * f + vy * s
    p0 = P(0, 0)
    c1 = P(length * 0.15, -width)
    c2 = P(length * 0.75, -width * 0.9)
    tip = P(length, 0)
    c3 = P(length * 0.75, width * 0.9)
    c4 = P(length * 0.15, width)
    return (f"M{R(p0[0])} {R(p0[1])}C{R(c1[0])} {R(c1[1])} {R(c2[0])} {R(c2[1])} {R(tip[0])} {R(tip[1])}"
            f"C{R(c3[0])} {R(c3[1])} {R(c4[0])} {R(c4[1])} {R(p0[0])} {R(p0[1])}Z")

def bloom(cx, cy, r, rot=0.0, layers=((13, 1.0, 0.30), (10, 0.74, 0.30), (7, 0.5, 0.32), (5, 0.28, 0.34))):
    """Dahlia / camellia style bloom: concentric rings of petals. Returns list of path strings (one per layer)."""
    out = []
    for i, (n, scale, wid) in enumerate(layers):
        d = ""
        off = rot + (math.pi / n) * (i % 2)
        for k in range(n):
            a = off + k * 2 * math.pi / n
            d += petal(cx, cy, r * scale, r * scale * wid, a)
        out.append(d)
    return out

def bezier(p0, p1, p2, p3, t):
    u = 1 - t
    x = u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0]
    y = u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]
    dx = 3*u*u*(p1[0]-p0[0]) + 6*u*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0])
    dy = 3*u*u*(p1[1]-p0[1]) + 6*u*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1])
    return x, y, math.atan2(dy, dx)

def leaf(x, y, ang, L, W):
    """Leaf outline with a mid-vein, pointing along ang."""
    ux, uy = math.cos(ang), math.sin(ang)
    vx, vy = -uy, ux
    def P(f, s): return x + ux*f + vx*s, y + uy*f + vy*s
    a = P(L*0.30, -W); b = P(L*0.75, -W*0.8); t = P(L, 0)
    c = P(L*0.75, W*0.8); d = P(L*0.30, W)
    return (f"M{R(x)} {R(y)}C{R(a[0])} {R(a[1])} {R(b[0])} {R(b[1])} {R(t[0])} {R(t[1])}"
            f"C{R(c[0])} {R(c[1])} {R(d[0])} {R(d[1])} {R(x)} {R(y)}Z"
            f"M{R(x)} {R(y)}L{R(P(L*0.85,0)[0])} {R(P(L*0.85,0)[1])}")

def stem_with_leaves(p0, p1, p2, p3, n_leaves, leaf_len, rnd, side0=1, start=0.12, end=0.9):
    stem = f"M{R(p0[0])} {R(p0[1])}C{R(p1[0])} {R(p1[1])} {R(p2[0])} {R(p2[1])} {R(p3[0])} {R(p3[1])}"
    leaves = ""
    for i in range(n_leaves):
        t = start + (end - start) * i / max(1, n_leaves - 1)
        x, y, a = bezier(p0, p1, p2, p3, t)
        side = side0 * (1 if i % 2 == 0 else -1)
        la = a + side * math.radians(rnd.uniform(38, 62))
        L = leaf_len * (1.15 - 0.55 * t) * rnd.uniform(0.85, 1.1)
        leaves += leaf(x, y, la, L, L * 0.30)
    return stem, leaves

def botanical():
    rnd = random.Random(7)
    paths = []   # (class, d) - few, long, multi-subpath strokes so the draw-on animation stays cheap

    def add_plant(p0, p1, p2, p3, n, ll, head_r, side=1, rot=0, buds=()):
        stem, leaves = stem_with_leaves(p0, p1, p2, p3, n, ll, rnd, side)
        bl = bloom(p3[0], p3[1], head_r, rot) if head_r else []
        gold = "".join(bl[2:])
        for (t, r) in buds:
            x, y, a = bezier(p0, p1, p2, p3, t)
            bx, by = pt(x, y, r * 2.2, a + math.radians(-70 * side))
            stem += f"M{R(x)} {R(y)}Q{R(x + (bx-x)*0.2)} {R(y + (by-y)*0.9)} {R(bx)} {R(by)}"
            gold += "".join(petal(bx, by, r, r*0.34, a + math.radians(-70*side) + k*0.8) for k in (-1, 0, 1))
        paths.append(("s", stem))
        paths.append(("l", leaves))
        if bl:
            paths.append(("b", "".join(bl[:2])))
        paths.append(("g", gold))

    add_plant((-20, 930), (120, 740), (80, 420), (300, 190), 9, 90, 120, 1, 0.2, buds=((0.55, 26), (0.38, 20)))
    add_plant((60, 940), (260, 820), (390, 640), (560, 590), 7, 80, 70, -1, 0.5, buds=((0.6, 18),))
    add_plant((1230, 920), (1090, 760), (1130, 480), (940, 250), 9, 90, 105, -1, 0.1, buds=((0.5, 24),))
    add_plant((1160, 940), (990, 840), (860, 720), (730, 700), 6, 70, 54, 1, 0.9, buds=((0.5, 16),))
    gs, gg = "", ""
    for i in range(7):
        x0 = rnd.choice([rnd.uniform(0, 340), rnd.uniform(860, 1200)])
        top = (x0 + rnd.uniform(-90, 90), rnd.uniform(420, 640))
        c1 = (x0 + rnd.uniform(-40, 40), 900 - 130)
        c2 = (top[0] + rnd.uniform(-60, 60), top[1] + 160)
        gs += f"M{R(x0)} 920C{R(c1[0])} {R(c1[1])} {R(c2[0])} {R(c2[1])} {R(top[0])} {R(top[1])}"
        gg += "".join(petal(top[0], top[1], 20, 6, -math.pi/2 + k*0.55) for k in (-2, -1, 0, 1, 2))
    paths.append(("s", gs)); paths.append(("g", gg))
    out = ['<svg class="botanical" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">']
    for i, (cls, d) in enumerate(paths):
        out.append(f'<path class="{cls}" pathLength="1" style="--d:{R(i * 0.05)}s" d="{d}"/>')
    out.append('</svg>')
    return "".join(out)

def wreath():
    rnd = random.Random(11)
    cx = cy = 250
    R0 = 150
    greens = {"#2f6b45": [], "#1f4d32": [], "#4a8a5c": [], "#173b27": []}
    for ring, (r, n, L, W) in enumerate(((R0 + 6, 74, 84, 27), (R0 - 8, 66, 76, 25), (R0 + 0, 58, 68, 22))):
        for i in range(n):
            a = i * 2 * math.pi / n + rnd.uniform(-0.05, 0.05) + ring * 0.07
            x, y = pt(cx, cy, r + rnd.uniform(-8, 8), a)
            la = a + math.pi / 2 + rnd.uniform(-0.5, 0.5) * (1 if i % 2 else -1) + (0.35 if i % 2 else -0.35)
            col = rnd.choice(list(greens))
            greens[col].append(leaf(x, y, la, L * rnd.uniform(0.8, 1.15), W))
    parts = []
    for col, ds in greens.items():
        parts.append(f'<path fill="{col}" stroke="#0f2418" stroke-width="1" d="{"".join(ds)}"/>')
    # berries
    berries = ""
    for i in range(34):
        a = rnd.uniform(0, 2 * math.pi)
        x, y = pt(cx, cy, R0 + rnd.uniform(-22, 22), a)
        rr = rnd.uniform(4.5, 7)
        berries += f"M{R(x - rr)} {R(y)}a{R(rr)} {R(rr)} 0 1 0 {R(rr * 2)} 0a{R(rr)} {R(rr)} 0 1 0 {R(-rr * 2)} 0Z"
    parts.append(f'<path fill="#c43d4b" stroke="#6e1f2b" stroke-width="1" d="{berries}"/>')
    # dried orange slices
    slices = ""
    spokes = ""
    for a in (math.radians(25), math.radians(140), math.radians(255), math.radians(330)):
        x, y = pt(cx, cy, R0 + 4, a)
        rr = 21
        slices += f"M{R(x - rr)} {R(y)}a{R(rr)} {R(rr)} 0 1 0 {R(rr * 2)} 0a{R(rr)} {R(rr)} 0 1 0 {R(-rr * 2)} 0Z"
        for k in range(8):
            ka = k * math.pi / 4
            sx, sy = pt(x, y, rr - 2, ka)
            spokes += f"M{R(x)} {R(y)}L{R(sx)} {R(sy)}"
    parts.append(f'<path fill="#e8a24a" stroke="#fbe3b5" stroke-width="2" d="{slices}"/>')
    parts.append(f'<path fill="none" stroke="#fbe3b5" stroke-width="1.2" opacity=".8" d="{spokes}"/>')
    # pine cones
    cones = ""
    for a in (math.radians(80), math.radians(200), math.radians(300)):
        x, y = pt(cx, cy, R0 + 2, a)
        for k in range(5):
            cones += petal(x, y, 24, 7, a + math.pi / 2 + (k - 2) * 0.5)
    parts.append(f'<path fill="#8a5a36" stroke="#43291a" stroke-width="1" d="{cones}"/>')
    # ribbon bow at bottom
    bx, by = cx, cy + R0 + 4
    bow = (f"M{bx} {by}C{bx-70} {by-48} {bx-96} {by+10} {bx-52} {by+26}C{bx-26} {by+34} {bx-8} {by+10} {bx} {by}Z"
           f"M{bx} {by}C{bx+70} {by-48} {bx+96} {by+10} {bx+52} {by+26}C{bx+26} {by+34} {bx+8} {by+10} {bx} {by}Z")
    tails = (f"M{bx-6} {by+4}L{bx-40} {by+64}L{bx-22} {by+60}L{bx-16} {by+78}L{bx+6} {by+8}Z"
             f"M{bx+6} {by+4}L{bx+40} {by+64}L{bx+22} {by+60}L{bx+16} {by+78}L{bx-6} {by+8}Z")
    parts.append(f'<path fill="#a3303f" stroke="#531520" stroke-width="1.5" d="{tails}"/>')
    parts.append(f'<path fill="#bf3b4b" stroke="#531520" stroke-width="1.5" d="{bow}"/>')
    parts.append(f'<circle cx="{bx}" cy="{by+2}" r="11" fill="#8f2634" stroke="#531520" stroke-width="1.5"/>')
    return ('<svg class="wreath-svg" viewBox="0 0 500 520" aria-hidden="true" focusable="false">' + "".join(parts) + '</svg>')

def bloom_symbol():
    layers = ((12, 1.0, 0.27), (9, 0.72, 0.30), (6, 0.46, 0.32), (4, 0.24, 0.36))
    ds = bloom(0, 0, 52, -math.pi / 2, layers)
    inner = "".join(f'<path d="{d}"/>' for d in ds)
    return f'<g id="bloom" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">{inner}</g>'

if __name__ == "__main__":
    out = pathlib.Path("assets/art")
    out.mkdir(parents=True, exist_ok=True)
    b = botanical()
    w = wreath()
    (out / "botanical.svg.html").write_text(b)
    import json
    pathlib.Path("assets/js/botanical.js").write_text("/* generated by scripts/gen_art.py - hero line-art, drawn in after first paint */\n(function(){var h=document.getElementById('hero');if(h)h.insertAdjacentHTML('afterbegin',"+json.dumps(b)+")})();\n")
    (out / "wreath.svg.html").write_text(w)
    (out / "bloom.symbol.html").write_text(bloom_symbol())
    print("botanical", len(b), "bytes; wreath", len(w), "bytes")
