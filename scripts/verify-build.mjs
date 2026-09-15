import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const full = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.isFile() && file.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Found ${htmlFiles.length} HTML files in dist/`);

let errors = 0;

// 1. Check 12 pages
if (htmlFiles.length !== 12) {
  console.error(`ERROR: Expected 12 pages, found ${htmlFiles.length}`);
  errors++;
}

// Target anchors to verify across the site
const targetAnchors = [
  '#desarrollo',
  '#respiratorio',
  '#orientacion',
  '#tratamientos',
  '#bienestar',
  '#taller-moquitos',
  '#apps',
];
const foundAnchors = new Set();

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check 1: H1 count
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`ERROR [${rel}]: Expected exactly 1 H1, found ${h1Matches.length}`);
    errors++;
  }

  // Check 2: No href="#"
  if (/href=["']#["']/i.test(content)) {
    console.error(`ERROR [${rel}]: Found href="#"`);
    errors++;
  }

  // Check 3: noindex, follow present
  if (!/<meta\s+name=["']robots["']\s+content=["']noindex,\s*follow["']/i.test(content)) {
    console.error(`ERROR [${rel}]: Missing <meta name="robots" content="noindex, follow" />`);
    errors++;
  }

  // Check 4: No "desde la primera sesión" in H2
  const h2Matches = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  for (const h2 of h2Matches) {
    if (/desde la primera sesión/i.test(h2)) {
      console.error(`ERROR [${rel}]: Found 'desde la primera sesión' in H2: ${h2}`);
      errors++;
    }
    if (/\b(resultados|cura)\b/i.test(h2)) {
      console.error(`ERROR [${rel}]: Found forbidden claim word in H2: ${h2}`);
      errors++;
    }
  }

  // Check 5: Track existing element IDs
  const idMatches = content.match(/id=["']([^"']+)["']/gi) || [];
  for (const idAttr of idMatches) {
    const id = '#' + idAttr.replace(/id=["']/i, '').replace(/["']$/, '');
    foundAnchors.add(id);
  }

  // Check 6: Verify image sources exist on disk
  const imgMatches = content.match(/src=["'](\/doblessa-centro-spai\/[^"']+)["']/gi) || [];
  for (const srcAttr of imgMatches) {
    const url = srcAttr.replace(/src=["']/i, '').replace(/["']$/, '');
    if (url.startsWith('/doblessa-centro-spai/images/')) {
      const relPath = url.replace('/doblessa-centro-spai/', '');
      const filePath = path.join(distDir, relPath);
      if (!fs.existsSync(filePath)) {
        console.error(`ERROR [${rel}]: Image not found on disk: ${filePath}`);
        errors++;
      }
    }
  }
}

// Verify all required anchors exist somewhere in dist/
for (const anchor of targetAnchors) {
  if (!foundAnchors.has(anchor)) {
    console.error(`ERROR: Target anchor ${anchor} was not found in any page!`);
    errors++;
  } else {
    console.log(`✓ Anchor ${anchor} exists`);
  }
}

if (errors === 0) {
  console.log('✓ ALL HTML BUILD CHECKS PASSED PERFECTLY (0 errors)');
} else {
  console.error(`FAIL: ${errors} errors found in HTML verification`);
  process.exit(1);
}
