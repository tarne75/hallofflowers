// Converts the originals in /source to responsive WebP files in /assets/img.
// Run: npm run images
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

// crop = fraction box [left, top, width, height] applied before resizing
const IMAGES = {
  g1:  { },                          // sweet cart + florals
  g2:  { },                          // balloon nursery arch
  g3:  { },                          // pastel hydrangea hand-tie
  g4:  { crop: [0, 0, 1, 0.97] },    // sympathy spray
  g5:  { crop: [0, 0, 1, 0.94] },    // peach & cream wreath (watermark trimmed)
  g6:  { widths: [360, 520, 788], q: 52 }, // peony basket (hero - smaller & lighter)
  g7:  { },                          // balloon number stack
  g8:  { },                          // circus backdrop
  g9:  { },                          // heart tribute
  g10: { },                          // copper urn arrangement
  n13: { },                          // flower display
  ig2: { },                          // hydrangea vase
  ig5: { crop: [0, 0, 1, 0.74] },    // hydrangeas (caption trimmed)
};
const WIDTHS = [360, 560, 800, 1100];
mkdirSync('assets/img', { recursive: true });
const manifest = {};
for (const [id, opt] of Object.entries(IMAGES)) {
  let img = sharp(`source/${id}.jpg`);
  const meta = await img.metadata();
  let { width: W, height: H } = meta;
  if (opt.crop) {
    const [l, t, w, h] = opt.crop;
    const box = { left: Math.round(l*W), top: Math.round(t*H), width: Math.round(w*W), height: Math.round(h*H) };
    img = sharp(await img.extract(box).toBuffer());
    W = box.width; H = box.height;
  }
  const out = [];
  const targets = (opt.widths || WIDTHS).filter(w => w <= W);
  if (!targets.length || targets[targets.length-1] < W * 0.9) targets.push(W);
  for (const w of targets) {
    const file = `assets/img/${id}-${w}.webp`;
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: opt.q || 70, effort: 6 }).toFile(file);
    out.push(w);
  }
  manifest[id] = { w: out, ratio: +(W / H).toFixed(4) };
  console.log(id, W + 'x' + H, out.join(','));
}
writeFileSync('assets/img/manifest.json', JSON.stringify(manifest, null, 1));
