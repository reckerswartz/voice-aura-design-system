// Visual regression tests for Voice Aura Design System
// Run: npx playwright test tests/visual.spec.js

const { test, expect } = require('@playwright/test');

const pages = [
  { name: 'components', path: './components.html' },
  { name: 'pixel-perfect-demo', path: './pixel-perfect-demo.html' },
  { name: 'backgrounds', path: './backgrounds.html' },
  { name: 'interactions-demo', path: './interactions-demo.html' },
  { name: 'transitions-showcase', path: './transitions-showcase.html' },
  { name: 'backgrounds-animations-demo', path: './backgrounds-animations-demo.html' },
];

for (const { name, path } of pages) {
  test(`${name} — visual snapshot`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
}
