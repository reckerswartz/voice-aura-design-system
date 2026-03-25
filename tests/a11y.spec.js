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
  { name: 'backgrounds-animations-demo', path: './backgrounds-animations-demo.html' },
];

for (const { name, path } of pages) {
  test(`${name} — WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const builder = new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .exclude('.ref-swatch')         // color palette swatches — decorative, inherently low-contrast
      .exclude('.ref-swatch-grid')   // color palette grid wrapper
      .exclude('.ref-demo-box')      // component preview boxes with decorative content
      .exclude('.ref-code');          // code snippet blocks — monospace on dark bg, decorative

    // components.html has many intentional color demos (badges on colored bg,
    // trust-bar greyscale logos, feature visual placeholders) — exclude those
    if (name === 'components') {
      builder
        .exclude('.ref-narrow')       // form/auth demo containers with specimen elements
        .exclude('.va-trust-bar')     // greyscale logos — intentionally low-contrast
        .exclude('.va-pricing')       // pricing cards with colored badge variants
        .exclude('.va-blog-card')     // blog card demos
        .exclude('.va-feature-row');  // feature section demos with placeholder visuals
    }

    const results = await builder.analyze();

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
