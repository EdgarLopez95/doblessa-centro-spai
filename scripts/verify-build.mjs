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
  '#herencia',
  '#inventario',
  '#otros-talleres',
];

// Datos de contacto heredados de la web original: deben estar presentes
const inheritedContact = [
  { label: 'teléfono infantil', re: /655\s?461\s?568/ },
  { label: 'teléfono adultos', re: /699\s?952\s?632/ },
  { label: 'email', re: /info@centro-spai\.com/ },
  { label: 'dirección', re: /Calle San José, 18/ },
];

// Frases que contradicen la web del centro, inventan operativa o exponen
// el andamiaje interno del proyecto en la interfaz.
const forbiddenPhrases = [
  // Contradicen lo publicado por el centro
  'No hay inscripción online',
  'te informará de la próxima convocatoria',
  'te avisamos cuando haya',
  'se ha impartido a distancia',
  'Centro Spai desarrolló',
  // Afirman práctica, proceso o resultado no sustentados
  'te orientamos',
  'manos expertas',
  'suave y personalizada',
  'os ayudamos a entender',
  'valoramos al bebé',
  'trato cercano desde',
  'Cuidado experto',
  'coordinar horarios',
  'Radiofrecuencia corporal',
  // Andamiaje del proyecto: vive en GAPS.md y ESTADO.md, no en pantalla
  'pendiente de validar',
  'pendientes de validar',
  'pendiente de confirmar',
  'pendientes de confirmar',
  'pendientes de revisión',
  'Por validar',
  'confirmará el centro',
  'confirmará el cliente',
  'confirmará el equipo',
  'Lo aporta el centro',
  'mockup',
  'maqueta',
  // Afirmaciones de práctica clínica u operativa en primera persona
  'os explicamos',
  'te ayudamos',
  'os ayudamos',
  'acompañaros',
  'valoramos al bebé',
  'Tratamos al bebé',
  'nos consultan',
  'Adaptamos la atención',
  'trabajamos con familias',
  'técnicas manuales suaves',
  'adaptadas a la edad',
  'Recuperarte sin prisas',
  'Cuidar tu cuerpo mientras cambia',
  'la presta un profesional',
  // Promesas de atención, respuesta o relación previa
  'Sin compromiso',
  'a tu ritmo',
  'Si ya venís',
  'Solo pedimos',
  'para poder responderte',
  'Lo usaremos solo',
  'conectará con el equipo',
];

// Marcadores de plantilla que no deben quedar en las páginas legales
const legalPlaceholders = /\[(Razón social|NIF|Domicilio social|Email de privacidad|Plazo de conservación|Proveedores tecnológicos|Datos registrales|Titularidad de las imágenes)\]/;
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

    // Check 4: No "desde la primera sesión" anywhere in content
    if (/desde la primera sesión/i.test(content)) {
      console.error(`ERROR [${rel}]: Found 'desde la primera sesión' in content`);
      errors++;
    }

    // Check 4b: No "cura" or "resultados garantizados" in H2
    const h2Matches = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    for (const h2 of h2Matches) {
      if (/\b(resultados|cura)\b/i.test(h2)) {
        console.error(`ERROR [${rel}]: Found forbidden claim word in H2: ${h2}`);
        errors++;
      }
    }

    // Check 6b: Contacto heredado presente en el pie de todas las páginas
    for (const item of inheritedContact) {
      if (!item.re.test(content)) {
        console.error(`ERROR [${rel}]: Falta el dato heredado (${item.label}) en la página`);
        errors++;
      }
    }

    // Check 6c: Enlaces tel:/mailto: operativos en el mockup
    if (!/href=["']tel:\+34655461568["']/.test(content) || !/href=["']tel:\+34699952632["']/.test(content)) {
      console.error(`ERROR [${rel}]: Faltan los enlaces tel: de las dos líneas de cita`);
      errors++;
    }
    if (!/href=["']mailto:info@centro-spai\.com["']/.test(content)) {
      console.error(`ERROR [${rel}]: Falta el enlace mailto: heredado`);
      errors++;
    }

    // Check 6d: Frases que niegan la herencia o inventan operativa
    for (const phrase of forbiddenPhrases) {
      if (content.toLowerCase().includes(phrase.toLowerCase())) {
        console.error(`ERROR [${rel}]: Frase prohibida encontrada: "${phrase}"`);
        errors++;
      }
    }

    // Check 6d-bis: Páginas legales sin marcadores de plantilla
    if (/politica-de-privacidad|aviso-legal/.test(rel) && legalPlaceholders.test(content)) {
      console.error(`ERROR [${rel}]: Marcador de plantilla en una página legal`);
      errors++;
    }

    // Check 6e: Sin enlaces a tiendas de aplicaciones sin verificar
    if (/apps\.apple\.com|play\.google\.com|itunes\.apple\.com/i.test(content)) {
      console.error(`ERROR [${rel}]: Enlace a tienda de aplicaciones no verificado`);
      errors++;
    }

    // Check 7: No fonts.googleapis.com or fonts.gstatic.com
    if (/fonts\.googleapis\.com/i.test(content) || /fonts\.gstatic\.com/i.test(content)) {
      console.error(`ERROR [${rel}]: Found external Google Fonts reference!`);
      errors++;
    }

    // Check 8: Font preloads exist on disk
    const fontMatches = content.match(/href=["'](\/doblessa-centro-spai\/fonts\/[^"']+)["']/gi) || [];
    for (const fontAttr of fontMatches) {
      const url = fontAttr.replace(/href=["']/i, '').replace(/["']$/, '');
      const relPath = url.replace('/doblessa-centro-spai/', '');
      const filePath = path.join(distDir, relPath);
      if (!fs.existsSync(filePath)) {
        console.error(`ERROR [${rel}]: Font file not found on disk: ${filePath}`);
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
