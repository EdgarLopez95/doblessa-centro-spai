import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');

async function processDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const webpPath = fullPath.slice(0, -ext.length) + '.webp';
        try {
          const srcStat = await fs.promises.stat(fullPath);
          let needsUpdate = true;
          try {
            const webpStat = await fs.promises.stat(webpPath);
            if (webpStat.mtimeMs >= srcStat.mtimeMs) {
              needsUpdate = false;
            }
          } catch {
            // webp does not exist
          }

          if (needsUpdate) {
            await sharp(fullPath)
              .webp({ quality: 85, effort: 4 })
              .toFile(webpPath);
            console.log(`Generated: ${path.relative(imagesDir, webpPath)}`);
          }
        } catch (err) {
          console.error(`Failed to process ${fullPath}:`, err.message);
        }
      }
    }
  }
}

console.log('Generating WebP images in public/images/ ...');
await processDir(imagesDir);
console.log('WebP generation complete.');
