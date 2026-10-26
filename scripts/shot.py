import sys
from playwright.sync_api import sync_playwright
# usage: shot.py out.png width height [scrollY] [full]
out, w, h = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
y = int(sys.argv[4]) if len(sys.argv) > 4 else 0
full = len(sys.argv) > 5
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=(w < 700), is_mobile=(w < 700))
    pg = ctx.new_page()
    errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file:///home/claude/hof/index.html')
    pg.wait_for_timeout(1500)
    if y:
        pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(1800)
    if full:
        H = pg.evaluate('document.documentElement.scrollHeight')
        for yy in range(0, H, 500):
            pg.evaluate(f'window.scrollTo(0,{yy})'); pg.wait_for_timeout(220)
        pg.evaluate('window.scrollTo(0,0)'); pg.wait_for_timeout(1200)
    pg.screenshot(path=out, full_page=full)
    print('errors:', errs)
    b.close()
