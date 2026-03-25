# Voice Aura Design System — Continuous Improvement Plan

> A living document defining how the design system evolves over time.
> Grounded in a fresh audit of 40 SCSS partials, 13,879 lines of source,
> 384 KB compiled CSS (347 KB with PurgeCSS), and 9 HTML pages.
>
> Last updated: 2026-03-26

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
| SCSS partials | 40 | — | — |
| SCSS source lines | 13,879 | < 10,000 | ⚠️ Over (includes ref page + logical props) |
| Compiled CSS (expanded) | 512 KB | < 400 KB | ⚠️ Over |
| Compiled CSS (minified) | 384 KB | < 300 KB | ⚠️ Over |
| Compiled CSS (minified + PurgeCSS) | **347 KB** | < 300 KB | ⚠️ Closer |
| `@import` statements | 68 | 0 | ❌ Blocked on Bootstrap 6 |
| `@use` statements | 10 | All | ⚠️ Partial |
| `@forward` statements | 0 | Match @use | ❌ Not started |
| `@extend` usages | 56 | ~56 (justified) | ✅ All delta-only pattern |
| `--va-*` custom properties | 38 authored | 60+ | ✅ Good start |
| `var(--va-*)` references in SCSS | 356 | All components | ✅ 15/18 sections migrated |
| Container queries (`@container`) | 8 | Key components | ✅ Cards, pricing, features, blog |
| Logical properties (inline/block) | 14 + full utility set | All spacing | ✅ RTL-ready |
| `prefers-contrast: more` | ✅ Supported | ✅ | ✅ |
| `forced-colors: active` | ✅ Supported | ✅ | ✅ |
| Raw `z-index` (non-variable) in SCSS | 1 | 0 | ✅ Nearly done |
| `@keyframes` definitions | 14 | — | — |
| `transition` declarations | 101 | — | — |
| Inline `style=` in HTML pages | 674 total | < 50 | ⚠️ 61 ref-* classes available |
| Stylelint errors | 0 | 0 | ✅ |
| Sass deprecation warnings | 343 | 0 | ⚠️ All Bootstrap-internal |
| HTML pages | 9 | — | — |
| Broken links / images | 0 | 0 | ✅ |
| Accessibility violations (manual) | 0 known | 0 | ✅ |
| Accessibility checklist | ✅ Added | Section 16 in DESIGN_SYSTEM.md | ✅ |

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

1. ~~**Monolithic CSS output**~~ — ✅ PurgeCSS added (`build:purge`); 384 KB → 347 KB with tree-shaking
2. **68 `@import` statements** — Will break on Dart Sass 3.0; blocks module isolation (blocked on Bootstrap 6)
3. **56 `@extend` usages** — All justified by delta-only Bootstrap pattern; selector bloat accepted
4. ~~**Three parallel button systems**~~ — ✅ Unified via `@extend .va-btn` (`18fa927`)
5. **674 inline `style=` attributes** — 61 `ref-*` CSS classes available for migration
6. ~~**No build pipeline beyond Sass**~~ — ✅ autoprefixer + cssnano + PurgeCSS
7. ~~**No CI/CD**~~ — ✅ GitHub Actions: lint + build + size budget + visual regression + a11y
8. ~~**No dark mode**~~ — ✅ `prefers-color-scheme` + `[data-va-theme]` in `_reset.scss`
9. ~~**Navbar duplicated 4× across HTML**~~ — ✅ 11ty partials (`_includes/navbar.njk`)

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

### Fixes Applied — Commit `18fa927`

| ID | Issue | Fix |
|----|-------|-----|
| F-1 | No `:focus-visible` on `.va-pricing__tab` | Added `:focus-visible` outline (2px solid `$va-primary-blue`) |
| F-2 | 26 hardcoded SVG `url()` paths | All now use `#{$va-asset-base-path}/patterns/...` |
| F-3 | Google Fonts `@import` render-blocking + brand-coupled | New `$va-google-fonts-url` variable with `@if` guard in `_typography.scss` |
| F-4 | 3 parallel button systems (hero, navbar, buttons) | Hero/navbar buttons `@extend .va-btn` + section-specific deltas only |
| F-5 | 7 files missing BOOTSTRAP ALIGNMENT blocks | Added to all 7 files |
| F-8 | Grid section missing from components.html | Added with auto-fit, 2/3/4-col, spacing demos + code snippet |

### Fixes Applied — var(--va-*) Token Migration

| ID | Issue | Fix |
|----|-------|-----|
| F-6 | 0 components consume `var(--va-*)` tokens | 15/18 sections migrated — colors, borders, shadows, transitions, focus states now use `var(--va-*)` |
| — | Buttons, Badges, Cards, Forms, Pricing, Blog Cards | Migrated colors, focus-visible outlines, shadows, transitions |
| — | Trust Bar, Footer, Auth | Migrated text colors, borders, backgrounds |
| — | Section, Feature Section, Hero, Navbar | Migrated bg, text, borders, shadows, transitions, focus states |
| — | Voice Agent, Video Dubbing | Migrated colors, focus-visible, accent/danger colors |
| — | Anim Core, Anim Components | Migrated shadows, focus-visible outlines |

### Fixes Applied — Brand Directory Restructure

| ID | Issue | Fix |
|----|-------|-----|
| F-7 | 1,147 lines app-specific SCSS in `components/` | Moved `_auth.scss`, `_voice-agent.scss`, `_video-dubbing.scss` to `scss/brands/voice-aura/` with index file. Other themes exclude via single import line. |

### Fixes Applied — Visual Audit (commits `69fb9d2`, `be6d07b`)

Full desktop 1920×1080 audit of all 9 pages. See `VISUAL_AUDIT_REPORT.md` for details.

| ID | Issue | Fix |
|----|-------|-----|
| P-1 | Feature row text clipped on left edge | Removed `overflow: hidden` from `.va-feature-row` in `_feature-section.scss` |
| P-2/P-3/D-1 | Pricing cards + interactions-demo sections invisible (`opacity: 0`) | Implemented `va-scroll-ready` graceful degradation — `opacity: 0` only applied when `.va-scroll-ready` is on `<html>`, added by JS. Without JS, all content visible. Files: `_anim-components.scss`, `_anim-core.scss`, `va-scroll.js`, `pixel-perfect-demo.html`, `interactions-demo.html` |
| B-1/B-2 | backgrounds.html sticky TOC overlapping sections | Fixed `.ref-toc`: z-index 100, white bg, border-bottom. Added `scroll-margin-top: 4rem` to `.ref-section` |
| I-1 | Index page title near-invisible on dark gradient | Added explicit `color: $va-white` + `text-shadow` to `.hero h1` |
| P-4 | CTA text hard to read over halftone pattern | Reduced `va-pattern-halftone--dark` opacity `0.7` → `0.35` |
| I-3 | Index footer unstyled | Added `body > footer` styles in `_page-index.scss` |
| A-1 | Wave Divider SVG invisible on white bg | Darkened stroke `#E9E9EA` → `#C5C6C8` |

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

#### ~~3.2 Monolithic CSS output~~ ✅ PARTIALLY RESOLVED

PurgeCSS added to PostCSS pipeline (`npm run build:purge`). Unused Bootstrap modules (modal, tooltip, close) already removed. CSS reduced from 384 KB → 347 KB with PurgeCSS. Further reduction requires consumers to configure PurgeCSS content sources for their specific pages.

#### ~~3.3 Three parallel button systems~~ ✅ RESOLVED (`18fa927`)

Hero and navbar buttons now extend `.va-btn` + variant classes with section-specific deltas only. ~160 lines of duplicated logic removed.

#### ~~3.4 56 `@extend` usages~~ ✅ ANALYZED — ACCEPTED

All 56 `@extend` usages are justified by the delta-only Bootstrap inheritance pattern. Removing them would duplicate Bootstrap styles and increase CSS size. The `.btn` selector has 8+ comma-separated selectors in compiled output — this is acceptable for the delta-only approach.

#### ~~3.5 No CI/CD pipeline~~ ✅ RESOLVED

GitHub Actions CI workflow runs on every push/PR to main: lint → build → size budget → visual regression → a11y audit.

#### ~~3.6 Navbar duplicated across 4 HTML pages~~ ✅ RESOLVED

11ty partial system implemented with `_includes/navbar.njk`, `_includes/head.njk`, and `_layouts/base.njk`.

---

### P2 — Medium (improves developer experience)

#### 3.7 ~~796~~ 587 inline `style=` attributes across demo pages — PARTIALLY RESOLVED

18 semantic `ref-*` utility classes added to `_reference.scss` (commit `7e826e7`).
Bootstrap utility classes (`.mb-0`, `.text-center`, `.mx-auto`, `.text-primary`, etc.) used where available.

| Page | Before | After | Reduction |
|------|--------|-------|-----------|
| `backgrounds.html` | 240 | 67 | **-72%** |
| `components.html` | 182 | 133 | -27% |
| `interactions-demo.html` | 120 | 112 | -7% |
| `transitions-showcase.html` | 100 | 81 | -19% |
| `asset-gallery.html` | 48 | 34 | -29% |
| `pixel-perfect-demo.html` | 8 | 8 | — |

**Remaining:** 587 inline styles. Many are highly page-specific (demo dimensions, one-off layouts). Further reduction requires deeper refactoring of demo HTML structure.

#### ~~3.8 Missing token maps and accessor functions~~ ✅ RESOLVED

All three maps now exist in `_variables.scss`:
- `$va-icon-sizes` (xs: 12px … xxl: 48px) — line 200
- `$va-letter-spacing` (tighter: -0.03em … wider: 0.1em) — line 211
- `$va-line-heights` (none: 1 … loose: 1.8) — line 221

Accessor functions `va-font-size()`, `va-breakpoint()`, `va-shadow()`, `va-radius()`, `va-z()` exist for existing maps.

#### ~~3.9 Custom properties not consumed by components~~ ✅ MOSTLY RESOLVED

15 of 18 sections now consume `var(--va-*)` tokens for colors, borders, shadows, transitions, and focus states. Sass variables retained only for compile-time constructs (`rgba()`, `va-darken()`/`va-lighten()`, `@extend`).

**Migrated files:** `_buttons.scss`, `_badges.scss`, `_cards.scss`, `_forms.scss`, `_pricing.scss`, `_blog-card.scss`, `_trust-bar.scss`, `_footer.scss`, `_auth.scss`, `_section.scss`, `_feature-section.scss`, `_hero.scss`, `_navbar.scss`, `_voice-agent.scss`, `_video-dubbing.scss`, `_anim-core.scss`, `_anim-components.scss`

**Remaining phases:**
1. ~~Components reference `var(--va-*)` for colors, radius, shadows~~ ✅ Done
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
| ~~L-1~~ | ~~No container queries~~ | ✅ 8 `@container` queries across cards, pricing, features, blog cards |
| ~~L-2~~ | ~~Limited RTL support~~ | ✅ Full logical property utility set (`.va-ms-*`, `.va-me-*`, `.va-ps-*`, `.va-pe-*`) |
| ~~L-3~~ | ~~No `prefers-contrast` support~~ | ✅ `@media (prefers-contrast: more)` + `@media (forced-colors: active)` in `_reset.scss` |
| ~~L-4~~ | ~~Missing `$va-font-sizes` entry~~ | ✅ `"md": 0.9375rem` added to `$va-font-sizes` map |
| ~~L-5~~ | ~~No version banner in CSS~~ | ✅ `/*! Voice Aura Design System v1.0.0 */` in `voice-aura.scss` line 25 |
| ~~L-6~~ | ~~Button shape undocumented~~ | ✅ Shape convention documented in `_buttons.scss` — pill = nav/conversion, rounded-rect = in-context |

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
| ~~Unify button systems~~ | ~~3.3~~ | ~~✅ Done~~ | ~~`18fa927`~~ |
| Reduce `@extend` to ~20 (use mixins where safe) | 3.4 | 3 h | Smaller compiled CSS |
| Migrate abstracts to `@use`/`@forward` | P0 phase 2 | 4 h | Module isolation for abstracts |
| Components consume `--va-*` custom properties | 3.9 | 8 h | Enables runtime theming — **next priority** |
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
| ✅ Container queries for key components | L-1 | ✅ Done | Embeddable components |
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
| Navbar | **Beta** | ~~Button system overlap~~ ✅; still duplicated across pages |
| Hero | **Beta** | ~~Button system overlap~~ ✅; needs `var(--va-*)` consumption |
| Pricing | **Beta** | ~~No `:focus-visible`~~ ✅; no dark mode variant |
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

| Metric | 03-23 (Initial) | 03-25 | 03-26 (Current) | Target | Trend |
|--------|-----------------|-------|------------------|--------|-------|
| SCSS partials | 22 | 33 | 40 | — | ↑ (new features) |
| SCSS source lines | 9,185 | 11,341 | 13,399 | < 10,000 | ↓ (ref-* classes replace inline styles) |
| CSS minified (KB) | ~295 | 354 | 387 (347 w/ PurgeCSS) | < 300 | ⚠️ PurgeCSS helps |
| `@import` statements | 29 | 59 | 68 | 0 | ↑ (blocked on Bootstrap 6) |
| `@extend` usages | ~42 | 55 | 56 | ~56 (justified) | ✅ Accepted |
| `--va-*` custom properties | 0 | 38 | 38 | 60+ | ✅ |
| `var(--va-*)` references | 0 | ~55 | 356 | All components | ✅ ↑↑ |
| Container queries | 0 | 0 | 8 | Key components | ✅ New |
| Logical properties | 4 | 4 | 14 + utility set | All spacing | ✅ ↑↑ |
| `prefers-contrast` | ❌ | ❌ | ✅ | ✅ | ✅ New |
| `forced-colors` | ❌ | ❌ | ✅ | ✅ | ✅ New |
| Raw z-index (non-variable) | 41 | 1 | 1 | 0 | ✅ ↓ |
| Stylelint errors | N/A | 0 | 0 | 0 | ✅ |
| a11y violations (axe) | Unknown | Unknown | 0 | 0 | ✅ |
| Inline `style=` in HTML | ~291 | 796 | **587** | < 50 | ↓ 87 replaced with ref-* + Bootstrap classes |
| Components at Stable+ | 0 | 5 | 6 | All | ↑ |
| Visual regression baselines | 0 | 5 pages | 5 pages | All pages | ✅ |
| CI pipeline | None | Full | Full | Full | ✅ |
| PurgeCSS | ❌ | ❌ | ✅ | ✅ | ✅ New |
| Accessibility checklist | ❌ | ❌ | ✅ | ✅ | ✅ New |

### Size Budget

| Category | Budget | Current | w/ PurgeCSS | Status |
|----------|--------|---------|-------------|--------|
| Total CSS (minified) | 300 KB | 384 KB | **347 KB** | ⚠️ 116% |
| VA-only CSS (est.) | 150 KB | ~170 KB | ~150 KB | ✅ |
| Bootstrap CSS (est.) | 150 KB | ~214 KB | ~197 KB | ⚠️ |
| Critical CSS (above-fold) | 30 KB | Unknown | Unknown | — needs extraction |

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

### ADR-005: Muted text WCAG compliance (2026-03-25)
**Decision:** Changed `$va-muted-text` from `#9CA3AF` (3.0:1 contrast) to `#6B7280` (4.6:1 contrast).
**Rationale:** WCAG AA requires 4.5:1 for normal text. Previous value failed.
**Status:** Applied system-wide.

### ADR-006: Configurable Google Fonts URL (2026-03-25)
**Decision:** Introduced `$va-google-fonts-url` variable with `!default` flag. `_typography.scss` uses `@if` guard — set to `false` to skip the import entirely.
**Rationale:** Decouples font loading from the design system core. Consumers can self-host fonts, use a different Google Fonts URL, or load fonts via HTML `<link>` for better performance.
**Status:** Applied. Default URL loads IBM Plex Sans + Serif.

### ADR-007: Button system unification (2026-03-25)
**Decision:** Hero and navbar buttons now `@extend .va-btn` + variant classes, declaring only section-specific deltas (size, shape, text-decoration).
**Rationale:** Single source of truth for button styles. Eliminates ~160 lines of duplicated logic. All button behaviour changes propagate automatically.
**Status:** Applied to `_hero.scss` and `_navbar.scss`.

---

## Appendix B: Recommended Build Pipeline

```
✅ IMPLEMENTED:

    sass compile
      ↓
    stylelint (lint)
      ↓
    postcss
    ├─ autoprefixer (browser compat)
    ├─ cssnano (minification)
    └─ purgecss (tree-shaking, via PURGE=true)
      ↓
    dist/css/
      ↓
    CI checks
    ├─ size budget (< 400 KB)
    ├─ playwright visual regression (5 pages)
    └─ axe-core a11y audit (4 pages)
```

### Implementation — ✅ DONE

All dependencies installed. Key scripts:
- `npm run build` — Sass + autoprefixer + cssnano (standard build)
- `npm run build:purge` — Sass + autoprefixer + PurgeCSS + cssnano (production)
- `npm run lint` — Stylelint
- `npm run test:size` — Size budget check (< 400 KB)
- `npm run test:a11y` — axe-core WCAG 2.1 AA audit
- `npm run test:visual` — Playwright visual regression

---

*This document is a living artefact. Update it as issues are resolved, new
patterns emerge, and the roadmap evolves. Review quarterly.*
