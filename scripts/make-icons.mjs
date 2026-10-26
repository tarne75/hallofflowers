// Renders the favicon set from assets/icons/*.svg. Run: npm run icons
import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'node:fs';
const d = 'assets/icons/';
const png = (src, size, out) => sharp(d + src, { density: 384 }).resize(size, size).png().toFile(d + out);
await png('favicon.svg', 16, '_16.png'); await png('favicon.svg', 32, '_32.png'); await png('favicon.svg', 48, '_48.png');
await png('favicon.svg', 96, 'favicon-96.png');
await png('_apple.svg', 180, 'apple-touch-icon.png');
await png('favicon.svg', 192, 'icon-192.png'); await png('favicon.svg', 512, 'icon-512.png');
await png('_maskable.svg', 512, 'icon-maskable-512.png');
execSync(`convert ${d}_16.png ${d}_32.png ${d}_48.png ${d}favicon.ico`);
for (const f of ['_16.png', '_32.png', '_48.png']) unlinkSync(d + f);
writeFileSync(d + 'site.webmanifest', JSON.stringify({
  name: 'Hall Of Flowers', short_name: 'Hall Of Flowers', description: 'Florist, balloons & events in Potters Bar',
  start_url: '../../', scope: '../../', display: 'standalone', background_color: '#12261b', theme_color: '#12261b',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}, null, 2));
console.log('icons done');
