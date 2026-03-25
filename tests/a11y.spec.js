// Accessibility audit tests for Voice Aura Design System
// Run: npx playwright test tests/a11y.spec.js
// Uses axe-core via @axe-core/playwright to check WCAG 2.1 AA compliance.

const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  { name: 'components', path: './components.html' },
  { name: 'pixel-perfect-demo', path: './pixel-perfect-demo.html' },
  { name: 'signup-demo', path: './signup-demo.html' },
  { name: 'login-demo', path: './login-demo.html' },
];

for (const { name, path } of pages) {
  test(`${name} — WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    // Log violations for debugging
    if (results.violations.length > 0) {
      console.log(`\n${name} — ${results.violations.length} violation(s):`);
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} node(s))`);
      }
    }

    expect(results.violations).toEqual([]);
  });
}
