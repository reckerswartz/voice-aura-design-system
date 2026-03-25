import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const root = '/home/pkumar/voice-aura-design-system';
const docs = path.join(root, 'docs');
const outDir = path.join(root, 'audit-screenshots', 'qa-2026-03-24');
fs.mkdirSync(outDir, { recursive: true });

const pages = fs.readdirSync(docs).filter(f => f.endsWith('.html')).sort();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 2200 }, deviceScaleFactor: 2 });
const report = [];

for (const file of pages) {
  const page = await context.newPage();
  const consoleMsgs = [];
  const pageErrors = [];
  page.on('console', msg => {
    if (['error','warning'].includes(msg.type())) consoleMsgs.push(`${msg.type()}: ${msg.text()}`);
  });
  page.on('pageerror', err => pageErrors.push(String(err)));

  const url = 'file://' + path.join(docs, file);
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(300);

  const jsCheck = await page.evaluate(() => {
    const out = { navbarTogglePresent: !!document.querySelector('.va-navbar-toggle'), navbarCollapsePresent: !!document.querySelector('.va-navbar-collapse'), navToggleWorked: null };
    const toggle = document.querySelector('.va-navbar-toggle');
    const collapse = document.querySelector('.va-navbar-collapse');
    if (toggle && collapse) {
      const before = collapse.classList.contains('is-open');
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      const after = collapse.classList.contains('is-open');
      out.navToggleWorked = before !== after;
    }
    return out;
  });

  const linkCheck = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href'));
    const ids = new Set(Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    const unresolvedAnchors = [];
    let hashOnly = 0;
    for (const h of links) {
      if (!h) continue;
      if (h === '#') { hashOnly++; continue; }
      if (h.startsWith('#')) {
        if (!ids.has(h.slice(1))) unresolvedAnchors.push(h);
      }
    }
    return { totalLinks: links.length, hashOnly, unresolvedAnchors };
  });

  const relLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(h => h && !h.startsWith('#') && !h.startsWith('http') && !h.startsWith('mailto:') && !h.startsWith('tel:'))
  );
  const missingRelLinks = relLinks.filter(h => !fs.existsSync(path.resolve(docs, h.split('#')[0])));

  const shot = path.join(outDir, file.replace('.html','') + '.png');
  await page.screenshot({ path: shot, fullPage: true });

  report.push({ file, consoleMsgs, pageErrors, jsCheck, linkCheck, missingRelLinks, screenshot: shot });
  await page.close();
}

await browser.close();
const reportPath = path.join(outDir, 'qa-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(reportPath);
