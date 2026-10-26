#!/usr/bin/env python3
"""Turns the hero's rotating ring text into outlines (assets/art/ring.svg).
Outlines avoid font loading and keep the ring from being picked as a text LCP candidate.
Needs: pip install fonttools brotli.  Run: python3 scripts/gen_ring.py
"""
import math, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

TEXT = "HALL OF FLOWERS · BALLOONS & EVENTS · POTTERS BAR · DELIVERING SMILES · "
R_BASE, SIZE, VB = 368.0, 31.0, 800.0
font = TTFont("assets/fonts/jost-latin-500-normal.woff2")
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
upm = font["head"].unitsPerEm
k = SIZE / upm
adv = [hmtx[cmap[ord(c)]][0] * k for c in TEXT]
circ = 2 * math.pi * R_BASE
spacing = (circ - sum(adv)) / len(TEXT)
c = VB / 2
pos = 0.0
d = ""
for ch, a in zip(TEXT, adv):
    if ch != " ":
        mid = pos + a / 2
        phi = math.pi + mid / R_BASE          # start at 9 o'clock, run clockwise
        cx, cy = c + R_BASE * math.cos(phi), c + R_BASE * math.sin(phi)
        tx, ty = -math.sin(phi), math.cos(phi)  # tangent
        nx, ny = math.cos(phi), math.sin(phi)   # outward normal
        m = (k * tx, k * ty, k * nx, k * ny, cx - tx * a / 2, cy - ty * a / 2)
        sp = SVGPathPen(gs, ntos=lambda v: str(int(round(v))))
        gs[cmap[ord(ch)]].draw(TransformPen(sp, m))
        d += sp.getCommands()
    pos += a + spacing
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {int(VB)} {int(VB)}"><path fill="#d9b872" d="{d}"/></svg>'
out = pathlib.Path("assets/art/ring.svg")
out.write_text(svg)
pathlib.Path("assets/art/ring.svg.html").write_text(f'<svg class="ringtxt" viewBox="0 0 {int(VB)} {int(VB)}" aria-hidden="true" focusable="false"><path fill="currentColor" d="{d}"/></svg>')
print("ring.svg", len(svg), "bytes; spacing", round(spacing, 2))
