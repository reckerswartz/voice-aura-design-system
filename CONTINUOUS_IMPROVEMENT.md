# Voice Aura Design System — Continuous Improvement Plan

> A living document defining how the design system evolves over time.
> Grounded in a fresh audit of 33 SCSS partials, 11,341 lines of source,
> 354 KB compiled CSS, and 9 HTML pages.
>
> Last updated: 2026-03-25

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Resolved Issues (Previous Work)](#2-resolved-issues-previous-work)
3. [Open Issues by Priority](#3-open-issues-by-priority)
4. [Improvement Roadmap](#4-improvement-roadmap)
5. [Continuous Refinement Process](#5-continuous-refinement-process)
6. [Component Maturity Model](#6-component-maturity-model)
7. [Metrics Dashboard](#7-metrics-dashboard)

---

## 1. Current State Assessment

### Quantitative Snapshot (2026-03-25)

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| SCSS partials | 33 | — | — |
| SCSS source lines | 11,341 | < 10,000 | ⚠️ Over budget |
| Compiled CSS (expanded) | 424 KB | < 350 KB | ❌ Over |
| Compiled CSS (minified) | 354 KB | < 250 KB | ❌ Over |
| `@import` statements | 59 | 0 | ❌ Blocked on Bootstrap 6 |
| `@use` statements | 10 | All | ⚠️ Partial |
| `@forward` statements | 0 | Match @use | ❌ Not started |
| `@extend` usages | 52 | < 20 | ⚠️ Creates selector bloat |
| `--va-*` custom properties | 38 authored | 60+ | ✅ Good start |
| Hardcoded `rgba(0,0,0)` in compiled CSS | 58 | 0 | ⚠️ |
| Raw `z-index` (non-variable) in SCSS | 1 | 0 | ✅ Nearly done |
| `!important` in compiled CSS | 2,431 | < 100 (excluding utilities) | ⚠️ Mostly Bootstrap utilities |
| `@keyframes` definitions | 14 | — | — |
| `transition` declarations | 181 | — | — |
| Inline `style=` in HTML pages | 796 total | < 50 | ❌ |
| Stylelint errors | 0 | 0 | ✅ |
| Sass deprecation warnings | 343 | 0 | ⚠️ All Bootstrap-internal |
| HTML pages | 9 | — | — |
| Broken links / images | 0 | 0 | ✅ |
| Accessibility violations (manual) | 1 known | 0 | ⚠️ |

### Architecture Strengths

These are well-established patterns that should be preserved and extended:

1. **7-1 SCSS architecture** — `abstracts → vendors → base → layout → components` import order is clean and correct
2. **Bootstrap-first theming** — Variables overridden *before* Bootstrap import; delta-only component classes
3. **Design token system** — Primitive → semantic → component token flow with `$va-colors` map and `va-color()` accessor
4. **BEM naming** — Consistent `.va-block__element--modifier` across all VA components
5. **38 CSS custom properties** — Authored `--va-*` tokens on `:root` for colors, typography, spacing, radius, shadows, transitions, and z-index
6. **Responsive mixins** — `va-media-up` / `va-media-down` centralise breakpoint logic
7. **Accessibility baseline** — Skip links, ARIA attributes, `prefers-reduced-motion` handling, print styles
8. **Scroll system** — `va-scroll.js` with clean IntersectionObserver API
9. **Stylelint** — BEM-aware config with 0 errors

### Architecture Weaknesses

These are systemic issues that erode maintainability as the system grows:

1. **Monolithic CSS output** — 354 KB minified ships unused Bootstrap modules (~34 KB dead CSS)
2. **59 `@import` statements** — Will break on Dart Sass 3.0; blocks module isolation
3. **52 `@extend` usages** — Creates selector explosion in compiled CSS (`.btn` selector has 8+ selectors)
4. **Three parallel button systems** — `va-btn`, `va-hero__btn`, `va-navbar-btn` duplicate ~150 lines
5. **796 inline `style=` attributes** — Demo pages bypass the design system they showcase
6. **No build pipeline beyond Sass** — No autoprefixer, cssnano, PurgeCSS
7. **No CI/CD** — No automated lint, build, size budget, visual regression, or a11y checks
8. **No dark mode** — `prefers-color-scheme` not supported system-wide
9. **Navbar duplicated 4× across HTML** — ~200 lines of identical markup, no partial system

---

## 2. Resolved Issues (Previous Work)

Tracking what was already fixed to avoid rework and to establish patterns for future fixes.

| ID | Issue | Resolution | Commit |
|----|-------|-----------|--------|
| C-2 | Sass `@import` deprecation | Pinned `sass: >=1.98.0 <2.0.0` | `package.json` |
| C-3 | `$btn-border-radius-lg` bug | Changed to `$va-radius-lg` | `_variables.scss` |
| C-4 | `va-focus-ring` hardcoded color | Fixed to use `$color` param via `box-shadow` | `_mixins.scss` |
| C-5 | `body { overflow-x: hidden }` breaks sticky | Changed to `overflow-x: clip` | `_reset.scss` |
| C-6 | 50+ deprecated `darken()`/`lighten()` | Migrated to `va-darken()`/`va-lighten()` wrappers | `43ca9ce` |
| C-7 | Blog card `__tag` vs `__category` | Aliased both names in `_blog-card.scss` | `_blog-card.scss` |
| H-4 | Cross-component pattern duplication | `va-crosshair-corners`, `va-pill-tabs` mixins created | `_mixins.scss` |
| H-5 | Missing mixin extractions | Added `va-flex-center`, `va-disabled-state`, `va-hover-darken`, `va-card-hover-lift`, `va-sr-only` | `_mixins.scss` |
| H-6 | `!important` in `_pattern-data.scss` | Restructured selectors — 0 `!important` now | `_pattern-data.scss` |
| H-10 | No scroll-spy | JS scroll-spy added to components.html, backgrounds.html | `8fdea19` |
| — | `_backgrounds.scss` too large (1,545 lines) | Split into index + 3 sub-modules | `43ca9ce` |
| — | `_animations.scss` too large (1,314 lines) | Split into index + 3 sub-modules | `43ca9ce` |
| — | No CSS custom properties | Added 38 `--va-*` tokens on `:root` | `d6eceeb` |
| — | No stylelint | Added `stylelint-config-standard-scss` with BEM config | `d6eceeb` |
| — | Gradient angle inconsistency | Unified 6 instances from 145deg → 135deg | `d6eceeb` |
| — | Delta-only refactor | Slimmed `_buttons`, `_cards`, `_forms`, `_badges` to delta-only | `a1a82bc` |
| — | Bootstrap variable alignment | 28 VA↔Bootstrap equivalences documented and enforced | `a1a82bc` |

### Fixes Applied This Session

| ID | Issue | Fix |
|----|-------|-----|
| C-1 | Dead `.feature-visual` (no `va-` prefix) in `_section.scss` | Removed — canonical is `.va-feature-visual` in `_feature-section.scss` |
| H-7 | `$va-muted-text` (#9CA3AF) fails WCAG AA contrast | Bumped to `#6B7280` (4.6:1 on white) |
| B-1 | Blog SVGs use non-standard `stop-color="transparent"` | Fixed all 4 to use `stop-opacity="0"` |
| F-1 | "Get API Key" button dark instead of blue | Changed to `va-btn--accent` |
| H-1 | Hero section missing `id="hero"` | Added `id="hero"` |
| F-2 | "Try Dubbing" button missing icon | Added Lucide languages icon |
| FT-1 | Footer heading font size 14px vs 16px reference | Increased to `1rem` in `_footer.scss` |

---

## 3. Open Issues by Priority

### P0 — Critical (blocks future Sass migration)

#### 3.1 `@import` → `@use`/`@forward` migration

**Status:** Blocked by Bootstrap 5.3 using `@import` internally.

- 59 `@import` statements across `voice-aura.scss` and `_bootstrap.scss`
- Dart Sass 3.0 will remove `@import` entirely
- Current mitigation: Sass version pinned to `<2.0.0`

**Phased approach:**
1. ✅ Pin Sass version (done)
2. Migrate abstracts to `@use`/`@forward` (can do now)
3. Full migration when Bootstrap 6 ships with `@use` support

---

### P1 — High (improves maintainability)

#### 3.2 Monolithic CSS output (354 KB minified)

No tree-shaking or dead code elimination. Unused Bootstrap modules ship:

| Module | Est. Size | Used? |
|--------|----------|-------|
| Modal | ~8 KB | No |
| Tooltip/Popover | ~6 KB | No |
| Carousel | ~5 KB | No |
| Offcanvas | ~4 KB | No |
| Accordion | ~3 KB | No |
| Dropdown | ~4 KB | No |
| Breadcrumb | ~2 KB | No |
| **Total dead CSS** | **~32 KB** | — |

**Fix:** Add PostCSS pipeline with PurgeCSS and selective Bootstrap imports.

#### 3.3 Three parallel button systems (~150 lines duplicated)

| System | File | Purpose | Declarations |
|--------|------|---------|-------------|
| `va-btn--*` | `_buttons.scss` | Generic, documented | ~60 |
| `va-hero__btn--*` | `_hero.scss` | Hero-specific sizing | ~50 |
| `va-navbar-btn--*` | `_navbar.scss` | Navbar-specific pills | ~40 |

**Fix:** Hero and navbar buttons should `@extend .va-btn` + size/shape modifiers, keeping generic system as single source of truth.

```scss
// Target pattern:
.va-hero__btn--primary {
  @extend .va-btn, .va-btn--primary, .va-btn--lg;
  // Only hero-specific deltas:
  padding: 1rem 2rem;
  border-radius: $va-radius-pill;
}
```

#### 3.4 52 `@extend` usages creating selector bloat

`@extend` in Sass generates combinatorial selectors in output CSS. The `.btn` selector currently has 8+ comma-separated selectors in compiled output.

**Fix (gradual):**
- Replace `@extend` with `@include` for VA mixins where possible
- Keep `@extend` only for Bootstrap class inheritance (necessary for the delta-only pattern)
- Target: reduce from 52 to ~20

#### 3.5 No CI/CD pipeline

No automated checks run on push or PR. Regressions can only be caught manually.

**Fix:** Add GitHub Actions workflow:
```yaml
# .github/workflows/ci.yml
jobs:
  build:
    steps:
      - npm ci
      - npm run lint          # stylelint
      - npm run build         # sass compile
      - npm run test:size     # size budget check
      - npm run test:a11y     # axe-core audit
      - npm run test:visual   # playwright screenshots
```

#### 3.6 Navbar duplicated across 4 HTML pages

`pixel-perfect-demo.html`, `signup-demo.html`, `login-demo.html`, `components.html` all contain ~50 lines of identical navbar markup.

**Fix:** Introduce a lightweight include system:
- **Option A:** 11ty (zero-config static site gen with nunjucks partials)
- **Option B:** Simple `postbuild` npm script assembling pages from partials
- **Option C:** Web Components (`<va-navbar>` custom element)

---

### P2 — Medium (improves developer experience)

#### 3.7 796 inline `style=` attributes across demo pages

| Page | Count |
|------|-------|
| `components.html` | 292 |
| `backgrounds.html` | 234 |
| `interactions-demo.html` | 111 |
| `transitions-showcase.html` | 99 |
| `asset-gallery.html` | 48 |
| `pixel-perfect-demo.html` | 12 |

**Fix:** Create `scss/pages/_reference.scss` with semantic classes (`.ref-demo-grid`, `.ref-color-swatch`, `.ref-section-header`). Target: < 50 inline styles total.

#### 3.8 Missing token maps and accessor functions

| Category | Hardcoded values found | Proposed map |
|----------|----------------------|-------------|
| Icon sizes | `16px`, `18px`, `20px`, `24px`, `36px`, `48px` | `$va-icon-sizes` |
| Letter-spacing | `-0.03em`, `-0.02em`, `0.08em` | `$va-letter-spacing` |
| Line-height | `1.1`, `1.15`, `1.2`, `1.6`, `1.7` | `$va-line-heights` |

Accessor functions `va-font-size()`, `va-breakpoint()`, `va-shadow()`, `va-radius()`, `va-z()` exist for some maps but not all.

#### 3.9 Custom properties not consumed by components

38 `--va-*` properties are authored on `:root` but **no component references them**. Components still use Sass variables directly, meaning:
- No runtime theming
- No JS access to design tokens
- No per-component overrides via CSS

**Fix (phased):**
1. Components reference `var(--va-*)` for colors, radius, shadows
2. Dark sections override custom properties locally
3. Full dark mode via `@media (prefers-color-scheme: dark)`

#### 3.10 No visual regression testing

No automated comparison of rendered pages against baselines. Playwright is already a devDependency.

**Fix:** Add snapshot tests:
```js
// tests/visual.spec.js
test('pixel-perfect-demo desktop', async ({ page }) => {
  await page.goto('/site/pixel-perfect-demo.html');
  await expect(page).toHaveScreenshot('pixel-perfect-desktop.png');
});
```

---

### P3 — Low (nice-to-have polish)

| ID | Issue | Detail |
|----|-------|--------|
| L-1 | No container queries | Components break in non-viewport contexts (CMS sidebars, iframes) |
| L-2 | Limited RTL support | Only 4 logical property instances |
| L-3 | No `prefers-contrast` support | High-contrast mode not handled |
| L-4 | Missing `$va-font-sizes` entry | `0.9375rem` (15px) used in components but not in the map |
| L-5 | No version banner in CSS | Add `/*! Voice Aura v#{$version} */` |
| L-6 | Button shape undocumented | Pill vs. rounded-rect distinction intentional but unexplained |

---

## 4. Improvement Roadmap

### Phase 1 — Quick Wins (1-2 weeks)

Low-effort, high-impact fixes that improve quality immediately.

| Task | Issue | Effort | Impact |
|------|-------|--------|--------|
| ✅ Remove dead `.feature-visual` duplicate | C-1 | 5 min | Eliminates confusion |
| ✅ Fix muted text WCAG contrast | H-7 | 5 min | Accessibility compliance |
| ✅ Fix blog SVG `stop-color` | B-1 | 15 min | Cross-browser rendering |
| ✅ Fix "Get API Key" accent color | F-1 | 5 min | Visual accuracy |
| ✅ Add hero section `id` | H-1 | 5 min | Anchor navigation |
| ✅ Fix footer heading size | FT-1 | 5 min | Visual accuracy |
| Add PostCSS pipeline | 3.2 | 3 h | ~40% CSS size reduction |
| Add selective Bootstrap imports | 3.2 | 2 h | Remove ~32 KB dead CSS |
| Add CI workflow (lint + build + size) | 3.5 | 2 h | Prevents regressions |

### Phase 2 — Structural (3-4 weeks)

Address architectural debt that slows development.

| Task | Issue | Effort | Impact |
|------|-------|--------|--------|
| Unify button systems (hero/navbar → extend va-btn) | 3.3 | 4 h | -150 lines, single source of truth |
| Reduce `@extend` to ~20 (use mixins where safe) | 3.4 | 3 h | Smaller compiled CSS |
| Migrate abstracts to `@use`/`@forward` | P0 phase 2 | 4 h | Module isolation for abstracts |
| Components consume `--va-*` custom properties | 3.9 | 6 h | Enables runtime theming |
| Create `_reference.scss` page partials | 3.7 | 4 h | Reduce 796 → <50 inline styles |
| Add missing token maps and accessors | 3.8 | 2 h | Consistent token usage |
| Add Playwright visual regression tests | 3.10 | 4 h | Catches visual regressions |
| Add axe-core a11y tests to CI | 3.5 | 2 h | Enforces accessibility |

### Phase 3 — Scale & Maturity (1-3 months)

Prepare the system for multi-brand, multi-platform use.

| Task | Issue | Effort | Impact |
|------|-------|--------|--------|
| Introduce 11ty for HTML partials | 3.6 | 4 h | Eliminates navbar/footer duplication |
| Full `@import` → `@use` migration | P0 phase 3 | 8 h | Dart Sass 3.0 readiness |
| Dark mode via custom property layer | 3.9 | 8 h | Modern theming support |
| Publish DTCG design token JSON | — | 4 h | Figma sync, multi-platform |
| CSS `@layer` for cascade control | — | 3 h | Safe consumer overrides |
| Container queries for key components | L-1 | 4 h | Embeddable components |
| Conditional component imports | — | 3 h | Tree-shaking for consumers |
| CSS size target: < 250 KB minified | 3.2 | Ongoing | Performance |

---

## 5. Continuous Refinement Process

### 5.1 Contribution Standards

Every change to the design system must satisfy these gates:

#### Gate 1: Token-first
No hardcoded colour, spacing, radius, shadow, or z-index values. All values must trace back to `_variables.scss` or `--va-*` custom properties.

#### Gate 2: Delta-only
VA component classes declare only properties that **differ** from their Bootstrap equivalent. Document the equivalence in a `BOOTSTRAP ALIGNMENT` comment block.

#### Gate 3: BEM-compliant
Class names follow `.va-block__element--modifier`. No utility-style names in component files.

#### Gate 4: Responsive
Every layout component handles at least the `md` breakpoint via `va-media-down`/`va-media-up`. No hardcoded pixel breakpoints.

#### Gate 5: Accessible
- Interactive elements have `:focus-visible` indicators
- Decorative elements have `aria-hidden="true"`
- Form inputs have associated labels
- Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)

#### Gate 6: Tested
- `npm run build` succeeds with no new Sass warnings (Bootstrap-internal excluded)
- `npm run lint` passes with 0 errors
- Visual regression tests pass (when CI is set up)

#### Gate 7: Documented
- New classes reflected in `DESIGN_SYSTEM.md`
- Reference page updated with code snippets
- CHANGELOG.md entry added

### 5.2 PR Review Checklist

```
- [ ] No new hardcoded colours, spacing, or z-index values
- [ ] No new `!important` outside utility generators
- [ ] Max nesting depth ≤ 3
- [ ] New/changed components use existing mixins where applicable
- [ ] Responsive behaviour verified at 375px, 768px, 1280px
- [ ] `npm run build` succeeds — no new Sass warnings
- [ ] `npm run lint` passes — 0 errors
- [ ] DESIGN_SYSTEM.md updated if public API changed
- [ ] CHANGELOG.md entry present
- [ ] No new `@extend` (prefer `@include` or direct properties)
```

### 5.3 Release Cadence

| Version Type | Trigger | Examples |
|-------------|---------|---------|
| **Patch** (0.0.x) | Bug fixes, pixel adjustments, docs | Contrast fix, border-radius fix |
| **Minor** (0.x.0) | New components, utilities, tokens | Trust bar, new background patterns |
| **Major** (x.0.0) | Breaking class renames, removed components | `@import` → `@use` migration |

Use existing npm scripts: `npm run release:patch`, `release:minor`, `release:major`.

### 5.4 Cadence

| Frequency | Action |
|-----------|--------|
| **Per commit** | `npm run lint && npm run build` (CI enforced) |
| **Per PR** | Review checklist above; visual diff review |
| **Weekly** | Check for new Sass/Bootstrap deprecation warnings |
| **Monthly** | Re-run quantitative audit; update metrics table; review component maturity |
| **Quarterly** | Full architecture review; reassess roadmap priorities; Dart Sass / Bootstrap release check |

---

## 6. Component Maturity Model

### Maturity Levels

| Level | Criteria | Suitable For |
|-------|----------|-------------|
| **Draft** | SCSS exists, basic styles, no responsive handling | Internal prototyping only |
| **Beta** | Responsive, accessible, documented in reference | Dev preview, not production |
| **Stable** | Visual regression tested, code snippets, Bootstrap-aligned, delta-only | Production use |
| **Mature** | Custom properties, dark mode, multiple variants, Figma-synced | Long-term stable, multi-brand |

### Current Assessment

| Component | Level | Blockers to Next Level |
|-----------|-------|----------------------|
| Buttons (`va-btn`) | **Stable** | Needs `var(--va-*)` consumption, dark mode |
| Cards (`va-card`) | **Stable** | Needs visual regression test |
| Badges (`va-badge`) | **Stable** | — |
| Forms (`va-form`) | **Beta** | Missing code snippets in reference for all variants |
| Navbar | **Beta** | Button system overlap with `va-btn`; duplicated across pages |
| Hero | **Beta** | Button system overlap; `va-hero__btn` should extend `va-btn` |
| Pricing | **Beta** | No dark mode variant |
| Blog cards | **Stable** | — |
| Auth forms | **Beta** | Missing code snippets |
| Trust bar | **Stable** | — |
| Footer | **Stable** | — |
| Backgrounds (23 utilities) | **Beta** | File size managed via split; needs visual regression |
| Animations (14 keyframes) | **Beta** | Needs visual regression |
| Voice Agent card | **Draft** | App-specific, not reusable across brands |
| Video Dubbing card | **Draft** | App-specific, not reusable across brands |

### Promotion Criteria

To promote a component from one level to the next:

**Draft → Beta:**
- [ ] Responsive at 375px, 768px, 1440px
- [ ] ARIA attributes on interactive elements
- [ ] Documented in reference page with rendered demo

**Beta → Stable:**
- [ ] Delta-only — extends Bootstrap equivalent
- [ ] BOOTSTRAP ALIGNMENT comment block
- [ ] Code snippets in reference page
- [ ] Visual regression baseline captured
- [ ] No hardcoded values — all tokens

**Stable → Mature:**
- [ ] Uses `var(--va-*)` for all themeable properties
- [ ] Dark mode variant tested
- [ ] Multiple size/variant options
- [ ] Design token JSON entry (DTCG format)

---

## 7. Metrics Dashboard

Track these metrics over time to measure design system health.

| Metric | 03-23 (Initial) | 03-25 (Current) | Target | Trend |
|--------|-----------------|------------------|--------|-------|
| SCSS partials | 22 | 33 | — | ↑ (splits) |
| SCSS source lines | 9,185 | 11,341 | < 10,000 | ↑ |
| CSS minified (KB) | ~295 | 354 | < 250 | ↑ needs PurgeCSS |
| `@import` statements | 29 | 59 | 0 | ↑ (splits added imports) |
| `@extend` usages | ~42 | 52 | < 20 | ↑ |
| `--va-*` custom properties | 0 | 38 | 60+ | ✅ ↑ |
| Hardcoded `rgba(0,0,0)` | 42 | 58 | 0 | ↑ |
| Raw z-index (non-variable) | 41 | 1 | 0 | ✅ ↓ |
| Stylelint errors | N/A | 0 | 0 | ✅ |
| a11y violations (axe) | Unknown | Unknown | 0 | — |
| Inline `style=` in HTML | ~291 | 796 | < 50 | ↑ (more pages) |
| Components at Stable+ | 0 | 5 | All | ↑ |
| Visual regression baselines | 0 | 0 | All pages | — |
| CI pipeline | None | None | Full | — |

### Size Budget

| Category | Budget | Current | Status |
|----------|--------|---------|--------|
| Total CSS (minified) | 250 KB | 354 KB | ❌ 141% |
| VA-only CSS (est.) | 120 KB | ~140 KB | ⚠️ |
| Bootstrap CSS (est.) | 130 KB | ~214 KB | ❌ needs selective imports |
| Critical CSS (above-fold) | 30 KB | Unknown | — needs extraction |

---

## Appendix A: Architecture Decision Records

### ADR-001: Bootstrap-first theming (established)
**Decision:** Override Bootstrap Sass variables before import; VA classes use `@extend` for delta-only overrides.
**Rationale:** Single source of truth; Bootstrap updates automatically propagate to VA components.
**Status:** Active — 28 equivalences documented.

### ADR-002: `@import` pinning (established)
**Decision:** Pin Sass to `>=1.98.0 <2.0.0` until Bootstrap 6 ships `@use` support.
**Rationale:** Avoids Sass 3.0 breakage while unblocking development.
**Status:** Active — revisit when Bootstrap 6 is released.

### ADR-003: CSS custom properties layer (established)
**Decision:** Author 38+ `--va-*` tokens on `:root` alongside Sass variables.
**Rationale:** Enables future runtime theming, JS access, and dark mode without breaking current Sass-based compilation.
**Status:** Active — Phase A (exposure) complete. Phase B (consumption) pending.

### ADR-004: Delta-only component pattern (established)
**Decision:** VA components extend Bootstrap equivalents and declare only differing properties.
**Rationale:** Reduces CSS output, ensures consistency, makes Bootstrap updates non-breaking.
**Status:** Active — applied to buttons, cards, forms, badges, auth.

### ADR-005: Muted text WCAG compliance (new, 2026-03-25)
**Decision:** Changed `$va-muted-text` from `#9CA3AF` (3.0:1 contrast) to `#6B7280` (4.6:1 contrast).
**Rationale:** WCAG AA requires 4.5:1 for normal text. Previous value failed.
**Status:** Applied system-wide.

---

## Appendix B: Recommended Build Pipeline

```
Current:    sass → dist/css/

Proposed:   sass compile
              ↓
            stylelint (lint)
              ↓
            postcss
            ├─ autoprefixer (browser compat)
            ├─ cssnano (minification)
            └─ purgecss (tree-shaking)
              ↓
            dist/css/
              ↓
            CI checks
            ├─ size budget (< 250 KB)
            ├─ playwright visual regression
            └─ axe-core a11y audit
```

### Implementation (package.json additions)

```json
{
  "devDependencies": {
    "postcss": "^8.4.0",
    "postcss-cli": "^11.0.0",
    "autoprefixer": "^10.4.0",
    "cssnano": "^7.0.0",
    "@fullhuman/postcss-purgecss": "^6.0.0"
  },
  "scripts": {
    "build:css": "sass scss/voice-aura.scss dist/css/voice-aura.css --style=expanded --source-map",
    "build:postcss": "postcss dist/css/voice-aura.css -o dist/css/voice-aura.min.css",
    "build": "npm run build:css && npm run build:postcss",
    "test:size": "node -e \"const s=require('fs').statSync('dist/css/voice-aura.min.css').size; console.log((s/1024).toFixed(1)+'KB'); process.exit(s>256000?1:0)\"",
    "test:a11y": "node tests/a11y-audit.mjs",
    "test:visual": "npx playwright test tests/visual.spec.js",
    "ci": "npm run lint && npm run build && npm run test:size"
  }
}
```

---

*This document is a living artefact. Update it as issues are resolved, new
patterns emerge, and the roadmap evolves. Review quarterly.*
