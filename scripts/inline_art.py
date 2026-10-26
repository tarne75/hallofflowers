#!/usr/bin/env python3
"""Injects generated SVG art into index.html between marker comments."""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
page = root / "index.html"
s = page.read_text()
def put(name, file):
    global s
    body = (root / "assets/art" / file).read_text().strip()
    s = re.sub(rf"<!--{name}-START-->.*?<!--{name}-END-->", lambda m: f"<!--{name}-START-->{body}<!--{name}-END-->", s, flags=re.S)
put("RING", "ring.svg.html")
put("BLOOM", "bloom.symbol.html")
page.write_text(s)
print("inlined; index.html =", len(s), "bytes")
