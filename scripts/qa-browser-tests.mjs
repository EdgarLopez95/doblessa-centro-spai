import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/NITRO/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';

const distDir = path.resolve('dist');
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

// Simple static server
const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.startsWith('/doblessa-centro-spai')) {
    reqPath = reqPath.slice('/doblessa-centro-spai'.length);
  }
  if (reqPath === '' || reqPath === '/') {
    reqPath = '/index.html';
  } else if (!path.extname(reqPath)) {
    reqPath = path.join(reqPath, 'index.html');
  }

  const filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found: ' + reqPath);
  }
});

const PORT = 8124;
server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}/doblessa-centro-spai/`);
  let errors = 0;

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Test responsive viewports & overflow on Home
    const viewports = [
      { name: 'Mobile 360', width: 360, height: 740 },
      { name: 'Mobile 390', width: 390, height: 844 },
      { name: 'Tablet 768', width: 768, height: 1024 },
      { name: 'Desktop 1440', width: 1440, height: 900 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/`, { waitUntil: 'networkidle' });

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      if (overflow) {
        console.error(`FAIL: Horizontal overflow detected at ${vp.name}`);
        errors++;
      } else {
        console.log(`✓ No horizontal overflow at ${vp.name}`);
      }

      // Check mobile-specific elements at 390
      if (vp.width === 390) {
        const colicVisible = await page.locator('.colic__media').isVisible();
        const adultsVisible = await page.locator('.adults__media').isVisible();
        const firstNeedText = await page.locator('.needs-grid .need-card__text').first().isVisible();
        const textDisplay = await page.locator('.needs-grid .need-card__text').first().evaluate(el => window.getComputedStyle(el).display);

        if (!colicVisible) {
          console.error('FAIL: .colic__media is hidden at 390px!');
          errors++;
        } else {
          console.log('✓ .colic__media is visible on mobile');
        }

        if (!adultsVisible) {
          console.error('FAIL: .adults__media is hidden at 390px!');
          errors++;
        } else {
          console.log('✓ .adults__media is visible on mobile');
        }

        if (!firstNeedText || textDisplay === 'none') {
          console.error('FAIL: .need-card__text is hidden at 390px!');
          errors++;
        } else {
          console.log('✓ .need-card__text is visible on mobile with line-clamp');
        }

        // Test mobile menu interaction & full children list
        const menuToggle = page.locator('[data-menu-toggle]');
        await menuToggle.click();
        const isExpanded = await menuToggle.getAttribute('aria-expanded');
        if (isExpanded !== 'true') {
          console.error('FAIL: Mobile menu aria-expanded is not true after click');
          errors++;
        }

        // Verify all 3 children under Infantil are rendered
        const subLinks = await page.locator('.mobile-menu__sub a').allTextContents();
        console.log('Mobile menu sub-links found:', subLinks.map(s => s.trim()));
        if (!subLinks.some(s => s.includes('Fisioterapia infantil')) || !subLinks.some(s => s.includes('Cólicos del lactante'))) {
          console.error('FAIL: Mobile menu did not render all children (check slice(1))');
          errors++;
        } else {
          console.log('✓ Mobile menu renders all children including Cólicos and Fisioterapia infantil');
        }

        // Test body overflow locked
        const bodyOverflow = await page.evaluate(() => document.body.style.overflow || document.documentElement.style.overflow);
        if (bodyOverflow !== 'hidden') {
          console.error('FAIL: Body overflow is not hidden with mobile menu open');
          errors++;
        } else {
          console.log('✓ Body overflow is locked when mobile menu is open');
        }

        // Press Escape to close mobile menu
        await page.keyboard.press('Escape');
        const closedExpanded = await menuToggle.getAttribute('aria-expanded');
        if (closedExpanded !== 'false') {
          console.error('FAIL: Mobile menu did not close on Escape');
          errors++;
        } else {
          console.log('✓ Mobile menu closes on Escape');
        }
      }

      // Check desktop dropdown at 1440px
      if (vp.width === 1440) {
        const infantilToggle = page.locator('[data-dropdown]').first().locator('[data-dropdown-toggle]');
        await infantilToggle.click();
        const dropExpanded = await infantilToggle.getAttribute('aria-expanded');
        if (dropExpanded !== 'true') {
          console.error('FAIL: Desktop dropdown aria-expanded is not true after click');
          errors++;
        }

        const dropLinks = await page.locator('[data-dropdown]').first().locator('.nav-dropdown__link').allTextContents();
        console.log('Desktop dropdown links found:', dropLinks.map(s => s.trim()));
        if (!dropLinks.some(s => s.includes('Cólicos del lactante'))) {
          console.error('FAIL: Cólicos del lactante not found in desktop dropdown!');
          errors++;
        } else {
          console.log('✓ Desktop dropdown renders Cólicos del lactante accessible in 1 click');
        }

        // El menú de escritorio debe tener tarjetas amplias, iconos y títulos legibles.
        const dropdownPanel = page.locator('[data-dropdown]').first().locator('[data-dropdown-panel]');
        const panelWidth = await dropdownPanel.evaluate((el) => el.getBoundingClientRect().width);
        const cardIcons = await dropdownPanel.locator('.nav-dropdown__link-icon').count();
        const allLabelsNoWrap = await dropdownPanel.locator('.nav-dropdown__label').evaluateAll((labels) =>
          labels.every((label) => window.getComputedStyle(label).whiteSpace === 'nowrap'),
        );
        if (panelWidth < 400 || cardIcons !== dropLinks.length || !allLabelsNoWrap) {
          console.error(
            `FAIL: Dropdown desktop sin jerarquía suficiente (ancho:${panelWidth}, iconos:${cardIcons}, etiquetas-sin-salto:${allLabelsNoWrap})`,
          );
          errors++;
        } else {
          console.log('✓ Desktop dropdown uses spacious icon cards with unbroken labels');
        }

        // Test Escape on desktop dropdown
        await page.keyboard.press('Escape');
        const dropClosed = await infantilToggle.getAttribute('aria-expanded');
        if (dropClosed !== 'false') {
          console.error('FAIL: Desktop dropdown did not close on Escape');
          errors++;
        } else {
          console.log('✓ Desktop dropdown closes on Escape');
        }
      }
    }

    // 2. Test Form with ?tipo=adulto on Contact page
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/contacto/?tipo=adulto`, { waitUntil: 'networkidle' });

    const adultoChecked = await page.locator('input[name="tipo"][value="adulto"]').isChecked();
    if (!adultoChecked) {
      console.error('FAIL: ?tipo=adulto did not preselect radio adulto');
      errors++;
    } else {
      console.log('✓ ?tipo=adulto preselected radio correctly');
    }

    const edadHidden = await page.locator('[data-only="infantil"]').isHidden();
    if (!edadHidden) {
      console.error('FAIL: [data-only="infantil"] is not hidden when tipo=adulto');
      errors++;
    } else {
      console.log('✓ [data-only="infantil"] is hidden when tipo=adulto');
    }

    // Test form submission and exact status text
    await page.locator('#motivo').selectOption({ index: 8 }); // select one adult option
    await page.locator('#nombre').fill('Paciente Prueba');
    await page.locator('#contacto').fill('600123456');
    await page.locator('input[name="consentimiento"]').check();

    await page.locator('[data-submit]').click();
    await page.waitForTimeout(100);

    // Click confirm in summary
    const confirmBtn = page.locator('[data-confirm]');
    await confirmBtn.click();
    await page.waitForTimeout(800);

    const statusText = await page.locator('[data-status]').innerText();
    const expected = 'Solicitud demostrativa: este formulario no envía ni almacena datos';
    if (!statusText.includes(expected)) {
      console.error(`FAIL: Status text does not contain exact required string: "${expected}"`);
      errors++;
    } else {
      console.log('✓ Exact demonstration status message confirmed');
    }

    // 3. Test Domain copy in Contact and Footer
    const contactDomain = await page.locator('.domain-note').innerText();
    const expectedDomainCopy = 'Web actual del centro: centro-espai.com';
    if (!contactDomain.includes(expectedDomainCopy)) {
      console.error('FAIL: Exact domain copy not found in Contact domain note');
      errors++;
    } else {
      console.log('✓ Domain copy verified in Contact page');
    }

    const footerDomain = await page.locator('.site-footer__domain-note').innerText();
    if (!footerDomain.includes(expectedDomainCopy)) {
      console.error('FAIL: Exact domain copy not found in Footer');
      errors++;
    } else {
      console.log('✓ Domain copy verified in Footer');
    }

    // 4. Contacto heredado de la web original operativo en el mockup
    const telInfantil = await page.locator('a[href="tel:+34655461568"]').count();
    const telAdultos = await page.locator('a[href="tel:+34699952632"]').count();
    const mail = await page.locator('a[href="mailto:info@centro-spai.com"]').count();
    if (telInfantil < 1 || telAdultos < 1 || mail < 1) {
      console.error(`FAIL: Faltan enlaces heredados en Contacto (infantil:${telInfantil}, adultos:${telAdultos}, email:${mail})`);
      errors++;
    } else {
      console.log('✓ Teléfonos y email heredados enlazados en Contacto');
    }

    // 5. Taller Moquitos: formato online y CTA de inscripción de maqueta
    await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/talleres/`, { waitUntil: 'networkidle' });
    const tallerHtml = await page.locator('#taller-moquitos').innerText();
    if (!/Taller Moquitos · Online/i.test(tallerHtml)) {
      console.error('FAIL: No aparece el formato online del Taller Moquitos');
      errors++;
    } else {
      console.log('✓ Taller Moquitos muestra el formato online heredado');
    }

    const ctaTaller = await page.locator('#taller-moquitos a.btn', { hasText: 'Apúntate al taller' }).count();
    if (ctaTaller < 1) {
      console.error('FAIL: Falta la CTA «Apúntate al taller»');
      errors++;
    } else {
      console.log('✓ CTA «Apúntate al taller» presente');
    }

    if (/no hay inscripción online/i.test(tallerHtml)) {
      console.error('FAIL: Sigue apareciendo la negación de inscripción online');
      errors++;
    } else {
      console.log('✓ Sin frases que contradigan la web original en Talleres');
    }

    // 6. Las dos apps heredadas con el mismo peso visual
    const appCards = await page.locator('#apps .app').count();
    const appImages = await page.locator('#apps .app img').count();
    if (appCards !== 2 || appImages !== 2) {
      console.error(`FAIL: Se esperaban 2 apps con imagen propia (tarjetas:${appCards}, imágenes:${appImages})`);
      errors++;
    } else {
      console.log('✓ No más Cólicos y Anticólicos con recurso gráfico propio');
    }

    const storeLinks = await page.locator('a[href*="play.google.com"], a[href*="apps.apple.com"]').count();
    if (storeLinks > 0) {
      console.error('FAIL: Hay enlaces a tiendas de aplicaciones sin verificar');
      errors++;
    } else {
      console.log('✓ Sin enlaces a tiendas sin verificar');
    }

    // 7. Catálogos heredados de infantil y adultos
    await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/fisioterapia-infantil-burriana/`, { waitUntil: 'networkidle' });
    const herencia = await page.locator('#herencia').innerText();
    for (const item of ['Tortícolis congénita', 'Parálisis braquial', 'Baby-Nesst', 'Enuresis']) {
      if (!herencia.includes(item)) {
        console.error(`FAIL: Falta "${item}" en el catálogo heredado infantil`);
        errors++;
      }
    }
    console.log('✓ Catálogo infantil heredado presente');

    await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/fisioterapia-adultos-burriana/`, { waitUntil: 'networkidle' });
    const inventario = await page.locator('#inventario').innerText();
    for (const item of ['Kinesiotaping', 'Acupuntura', 'Hipopresivos', 'Presoterapia', 'Electroterapia']) {
      if (!inventario.includes(item)) {
        console.error(`FAIL: Falta "${item}" en el inventario heredado de adultos`);
        errors++;
      }
    }
    const invImgs = await page.locator('#inventario .inventory__media img').count();
    if (invImgs !== 4) {
      console.error(`FAIL: Se esperaban 4 imágenes en el inventario, hay ${invImgs}`);
      errors++;
    }
    console.log('✓ Inventario adulto heredado presente con sus imágenes');

    // 8. La etiqueta de propuesta acompaña a los recorridos de atención
    for (const route of [
      'fisioterapia-infantil-burriana',
      'colicos-del-lactante-burriana',
      'osteopatia-bebes-burriana',
      'fisioterapia-adultos-burriana',
      'embarazo-posparto',
    ]) {
      await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/${route}/`, { waitUntil: 'networkidle' });
      const tags = await page.locator('.proposal-tag').count();
      if (tags < 1) {
        console.error(`FAIL: ${route} no marca su recorrido como propuesta de experiencia`);
        errors++;
      }
      const tagText = tags ? await page.locator('.proposal-tag').first().innerText() : '';
      if (tags && !/Propuesta de experiencia para el rediseño/i.test(tagText)) {
        console.error(`FAIL: etiqueta de propuesta inesperada en ${route}: "${tagText}"`);
        errors++;
      }
    }
    console.log('✓ Recorridos de atención marcados como propuesta de experiencia');

    // 9. El formulario se presenta solo por lo verificable
    await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/contacto/`, { waitUntil: 'networkidle' });
    const demoNote = await page.locator('[data-demo-form] .demo-form__note').innerText();
    if (!/Formulario demostrativo:\s*no envía ni almacena datos/i.test(demoNote)) {
      console.error(`FAIL: aviso del formulario inesperado: "${demoNote}"`);
      errors++;
    } else {
      console.log('✓ El formulario se anuncia como demostrativo y sin almacenamiento');
    }

    // 10. Páginas legales neutras, sin marcadores ni obligaciones inventadas
    for (const legal of ['politica-de-privacidad', 'aviso-legal']) {
      await page.goto(`http://localhost:${PORT}/doblessa-centro-spai/${legal}/`, { waitUntil: 'networkidle' });
      const body = await page.locator('main').innerText();
      if (/\[(Razón social|NIF|Domicilio social|Email de privacidad|Datos registrales)\]/.test(body)) {
        console.error(`FAIL: ${legal} conserva marcadores de plantilla`);
        errors++;
      }
      if (!/antes de una publicación real/i.test(body)) {
        console.error(`FAIL: ${legal} no advierte de que la información legal definitiva falta`);
        errors++;
      }
    }
    console.log('✓ Páginas legales presentadas como propuesta, sin marcadores');

    // 11. Sin <source> convertido en item de layout (regresión de <Picture>)
    const sourceBoxes = await page.evaluate(() =>
      [...document.querySelectorAll('picture.spai-picture > source')].filter(
        (el) => el.getBoundingClientRect().width > 0,
      ).length,
    );
    if (sourceBoxes > 0) {
      console.error(`FAIL: ${sourceBoxes} elementos <source> generan caja y descolocan el layout`);
      errors++;
    } else {
      console.log('✓ Ningún <source> genera caja en el layout');
    }

    await browser.close();
  } catch (err) {
    console.error('Unexpected error in tests:', err);
    errors++;
  } finally {
    server.close();
  }

  if (errors === 0) {
    console.log('\n=======================================');
    console.log('✓ ALL BROWSER QA TESTS PASSED WITH ZERO ERRORS');
    console.log('=======================================\n');
    process.exit(0);
  } else {
    console.error(`\nFAILED: ${errors} errors in browser QA tests\n`);
    process.exit(1);
  }
});
