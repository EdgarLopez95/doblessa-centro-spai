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
    const expected = 'Solicitud demostrativa: en la web real este formulario conectará con el equipo';
    if (!statusText.includes(expected)) {
      console.error(`FAIL: Status text does not contain exact required string: "${expected}"`);
      errors++;
    } else {
      console.log('✓ Exact demonstration status message confirmed');
    }

    // 3. Test Domain copy in Contact and Footer
    const contactDomain = await page.locator('.domain-note').innerText();
    const expectedDomainCopy = 'El dominio público actual es centro-espai.com. El nombre de marca de esta propuesta es Centro Spai. La grafía definitiva la confirmará el cliente.';
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
