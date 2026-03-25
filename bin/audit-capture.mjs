#!/usr/bin/env node
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const ROOT = '/home/pkumar/voice-aura-design-system';
const OUT = path.join(ROOT, 'screenshots', 'audit', 'sections');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  'index.html',
  'pixel-perfect-demo.html',
  'components.html',
  'backgrounds.html',
  'transitions-showcase.html',
  'interactions-demo.html',
  'asset-gallery.html',
  'signup-demo.html',
  'login-demo.html',
];

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  }

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  for (const file of PAGES) {
    const slug = file.replace('.html', '');
    const page = await context.newPage();
    
    // Block Google Fonts to prevent timeout
    await page.route('**/fonts.googleapis.com/**', r => r.fulfill({ status: 200, body: '' }));
    await page.route('**/fonts.gstatic.com/**', r => r.abort());

    try {
      console.log(`Capturing ${file}...`);
      await page.goto(`file://${ROOT}/site/${file}`, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(500);

      // Make all scroll-animated elements visible for screenshots
      await page.evaluate(() => {
        document.documentElement.classList.add('va-scroll-ready');
        document.querySelectorAll('.va-scroll-fade-left, .va-scroll-fade-right, .va-scroll-stagger, .va-scroll-fade-up, .va-scroll-scale-in, .va-scroll-fade-in, .va-reveal').forEach(el => {
          el.classList.add('is-visible');
        });
      });
      await page.waitForTimeout(300);

      const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(`  Height: ${docHeight}px`);

      // Capture at scroll positions: top, 25%, 50%, 75%, bottom
      const stops = [
        { name: 'top', frac: 0 },
        { name: '25', frac: 0.25 },
        { name: '50', frac: 0.50 },
        { name: '75', frac: 0.75 },
        { name: 'bottom', frac: 1.0 },
      ];

      const maxScroll = Math.max(0, docHeight - 1080);
      for (const stop of stops) {
        if (stop.frac > 0 && maxScroll <= 0) continue;
        const y = Math.round(maxScroll * stop.frac);
        await page.evaluate((sy) => window.scrollTo(0, sy), y);
        await page.waitForTimeout(200);
        const outPath = path.join(OUT, `${slug}-${stop.name}.png`);
        await page.screenshot({ path: outPath, type: 'png' });
      }
      console.log(`  ✓ Done`);
    } catch (e) {
      console.error(`  ✗ ${file}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log(`\nAll screenshots saved to ${OUT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
