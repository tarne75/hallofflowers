# Hall Of Flowers - project notes (CLAUDE.md)

Static one-page marketing site for **Hall Of Flowers (Balloons & Events)**, a florist at 23 The Service Road, Potters Bar EN6 1QA.
Hosted on **GitHub Pages**: https://tarne75.github.io/hallofflowers/ (repo `tarne75/hallofflowers`, branch `main`).
No online sales - it is an enriched landing page. **No pricing anywhere on the site.**

## Rules for working here
- Commit as Tarne himself - **no Co-Authored-By / Claude attribution lines**. Commit after every completed change ("commit always").
- **Push only when told** (`git push origin main` publishes the live site).
- Test locally first (`file://` or `python3 -m http.server 8080`) - do not push untested.
- Never use photos with people in them. Never add prices.
- Target: 100 on https://pagespeed.web.dev (mobile + desktop), plus 100 Accessibility / Best Practices / SEO.

## Facts (source: Instagram @hall.of.flowers.and.events + Google Business listing)
- Phone/mobile: 07961 124788 (+447961124788). Email: hello@hallofflowers.co.uk
- Instagram: https://www.instagram.com/hall.of.flowers.and.events/  Facebook: facebook.com/hallofflowersandevents
- Hours (from their Instagram post): Mon closed, Tue-Sat 9:30am-5:50pm, Sun closed.
  NOTE: Google listing says "Opens 9am Tue" - confirm which is right with the client, edit `business.hours` in data.js.
- Google: 5.0 stars, 10 reviews. Map coords 51.6980475, -0.19017. Maps link https://maps.app.goo.gl/Bx7nnWKepEynczZy7
- Contact form -> Formspree form id `xwvndkow` (same as t4-digital.uk contact form; submissions go to that Formspree account).
- Seasonal: Christmas Wreath Making Workshops (25 Nov Brookmans Park; 26 & 27 Nov The Old Guinea, Ridge) - 2026. Set `seasonal.show` false in data.js when finished.

## Brand / design
- Palette: forest `#12261b`/`#1a3526`, cream `#f5ede0`, paper `#fbf7ef`, blush `#f0c3b0`, rose `#d9826b`, gold `#d9b872`.
- Fonts (self-hosted, latin subset woff2 in assets/fonts): Cormorant Garamond (400, 400 italic) + Jost (400, 500).
- Mark: generated "bloom" (concentric petal rings) - used in logo, dial, petal menu, footer, favicons.
- Signature ideas: **bloom dial** (circular button, text ring rotates with scroll, border ring = scroll progress) opening a **petal wheel menu**
  (circle-reveal from the dial); hero = circular photo with orbiting text ring + orbiting photos; arch-shaped service cards with slow hover zoom
  (touch devices zoom when in view); scalloped section edges; rotated marquee ribbon; drawn-on botanical line art; falling petals; custom cursor (desktop).

## Structure
- `index.html` - everything inline (CSS in `<style>`) for fastest first paint. Contains static JSON-LD (update if address/phone/hours change).
- `assets/js/data.js` - **ALL editable content as JSON** (`window.HOF_DATA`): business details, hours, services, workshops, gallery, about, reviews.
  Plain `<script>` (not fetch) so it also works from `file://`. Edit it and refresh - no build.
- `src/main.js` -> built to `assets/js/main.js` (minified) with `npm run build`. Runs after window load so the hero paints first.
- `assets/js/botanical.js` - generated hero line-art (loaded by main.js after load).
- `assets/img/*.webp` - responsive images from `source/*.jpg` via `npm run images` (edit crops/quality in scripts/optimise-images.mjs).
  After adding images run it, then copy `assets/img/manifest.json` widths/ratio into `images` in data.js.
- `assets/art/` - generated art (wreath.svg, ring.svg, bloom symbol). `python3 scripts/gen_art.py && python3 scripts/gen_ring.py && python3 scripts/inline_art.py`
  (needs `pip install fonttools brotli`). `index.html` has marker comments `<!--RING-START-->` / `<!--BLOOM-START-->` that inline_art.py fills.
- `assets/icons/` - favicon set (svg, ico, apple-touch, 192/512/maskable, og-image.jpg, webmanifest). `npm run icons` rebuilds PNG/ICO from the SVGs.
- `source/` - original photos (from Instagram + Google listing; people-free).

## Performance rules (keep 100)
- CSS inline, JS deferred + small, fonts preloaded (one) + `font-display:swap` + metric-matched fallbacks, images WebP with width/height + lazy below fold,
  hero image preloaded with fetchpriority=high, nothing third-party until the map scrolls near the viewport (Google Maps iframe injected by IntersectionObserver).
- The hero ring text is converted to outlines (path) on purpose: SVG `<text>` was picked as the LCP element. Don't turn it back into text.
- Animations: transform/opacity only (botanical stroke draw is the one exception - short, runs once, starts after load).
- Preview with Lighthouse: serve the folder over HTTP with gzip, mobile + desktop. `file://` shows font-preload CORS warnings - that's expected only on file://.

## Status
- v1 built and Lighthouse-tested locally (desktop 100/100/100/100, mobile 99-100/100/100/100).
- TODO / ideas: confirm opening hours; swap in higher-res originals from client; live Instagram feed (e.g. Behold) if they want automatic updates;
  custom domain hallofflowers.co.uk (CNAME + DNS) when ready.
