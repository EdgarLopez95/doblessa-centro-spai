import fs from 'node:fs';
import path from 'node:path';

const fontsDir = path.resolve('public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  {
    name: 'fraunces-normal-ext.woff2',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxCFTeO-U.woff2'
  },
  {
    name: 'fraunces-normal.woff2',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeA.woff2'
  },
  {
    name: 'fraunces-italic-ext.woff2',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NU58FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjdPeQ_5Y.woff2'
  },
  {
    name: 'fraunces-italic.woff2',
    url: 'https://fonts.gstatic.com/s/fraunces/v38/6NU58FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChjeveQ.woff2'
  },
  {
    name: 'source-sans-3-normal-ext.woff2',
    url: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3wEaZfrc.woff2'
  },
  {
    name: 'source-sans-3-normal.woff2',
    url: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpStKy2OAdR1K-IwhWudF-R3w8aZQ.woff2'
  },
  {
    name: 'source-sans-3-italic-ext.woff2',
    url: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpMtKy2OAdR1K-IwhWudF-R3woqaeLY1HY.woff2'
  },
  {
    name: 'source-sans-3-italic.woff2',
    url: 'https://fonts.gstatic.com/s/sourcesans3/v19/nwpMtKy2OAdR1K-IwhWudF-R3woqZ-LY.woff2'
  }
];

console.log('Downloading fonts to public/fonts/ ...');
for (const font of fonts) {
  const dest = path.join(fontsDir, font.name);
  console.log(`Fetching ${font.name}...`);
  const res = await fetch(font.url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${font.url}: ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${font.name} (${buffer.length} bytes)`);
}
console.log('All fonts downloaded successfully.');
