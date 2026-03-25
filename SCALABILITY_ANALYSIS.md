# Scalability Analysis: Bootstrap-Based Theme Generation from Reference Designs

> **Context:** This analysis evaluates the Voice Aura Design System as a
> *template* for creating reusable Bootstrap-based themes from Behance/Figma
> reference designs. It identifies what prevents this workflow from scaling
> to additional brands, and which modern practices should be adopted.
>
> Last updated: 2026-03-25

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Scalability Bottlenecks](#2-scalability-bottlenecks)
3. [Missing Modern Practices](#3-missing-modern-practices)
4. [Reference-to-Theme Workflow Analysis](#4-reference-to-theme-workflow-analysis)
5. [Recommended Architecture for Multi-Theme Scalability](#5-recommended-architecture)
6. [Implementation Priority Matrix](#6-implementation-priority-matrix)

---

## 1. Executive Summary

The Voice Aura design system is well-constructed for a **single brand** — clean
7-1 SCSS architecture, Bootstrap variable overrides, BEM naming, and a solid
design token foundation. However, several architectural decisions create
**hard ceilings** when attempting to:

- Create a second theme from a new reference design
- Allow runtime theming (dark mode, white-label, user preferences)
- Scale the team beyond 1-2 developers
- Keep the CSS bundle under performance budgets

### Key Numbers

| Metric | Value | Impact |
|--------|-------|--------|
| Compiled CSS (minified) | **334 KB** | 2× larger than ideal; ~48 KB gzipped |
| Unused Bootstrap modules in output | **~135 selectors** (modal, tooltip, dropdown, close) | Dead CSS shipped to every user |
| Hardcoded asset paths in SCSS | **18 `url()` references** | Breaks when consuming via npm in different project structures |
| App-specific (non-reusable) SCSS | **1,671 lines** (16.5% of total) | Cannot be used by another brand |
| `@extend` usages across Bootstrap | **42 instances** | Creates invisible selector coupling, hard to override |
| HTML template duplication | **5 pages** duplicate the full navbar (~46 lines each) | Changes require 5-file edits |
| Inline `<style>` blocks across pages | **~594 lines** total | Shadow stylesheets outside the build pipeline |
| Dart Sass deprecation warnings | **449+** (suppressed) | Build will break on Sass 3.0 upgrade |
| CSS custom properties (`--va-*`) | **54** (all generated, none authored) | No runtime theming capability |
| `@layer` usage | **0** | No cascade control for theme consumers |

---

## 2. Scalability Bottlenecks

### B-1. Monolithic CSS Output — No Tree-Shaking (Critical)

**Current state:** Every page loads the full 334 KB stylesheet. There is no
mechanism for a consumer to import only the components they use.

**Measured breakdown:**
- Bootstrap core (reboot, type, grid, containers): ~120 KB
- Bootstrap components (buttons, cards, forms, nav, utilities): ~100 KB
- Voice Aura custom components: ~80 KB
- Unused Bootstrap modules (modal, tooltip, dropdown, close): ~34 KB

**Why this blocks scale:** A second theme doubles the CSS. A third triples it.
Without tree-shaking, each new theme adds 300+ KB to the global bundle.

**Fix:** Restructure for per-component imports:
```scss
// Consumer can cherry-pick:
@use "voice-aura/abstracts" as va;
@use "voice-aura/components/buttons";
@use "voice-aura/components/cards";
// Skip: pricing, auth, blog — not needed for this page
```

This requires the `@use`/`@forward` migration (see B-4) and removing the
unused Bootstrap module imports from `_bootstrap.scss`.

---

### B-2. Tight Brand Coupling in Component SCSS (Critical)

**Current state:** 75 non-comment lines reference Voice Aura brand values
(`$va-primary-blue`, IBM Plex fonts, `#0478FF`) inside component files. While
colors are tokenized in `_variables.scss` (good), the **semantic meaning** is
not abstracted.

**Example bottleneck:** To create a "SoundWave Pro" theme with `$primary: #FF6B35`
and `$font-heading: 'Playfair Display'`, you'd need to:

1. Fork `_variables.scss` — easy, this is the intended customisation point
2. But then discover that `_hero.scss`, `_navbar.scss`, `_buttons.scss` etc.
   use `$va-primary-blue` directly (not `$primary`) in ~20 places
3. And `$va-near-black` is used in 40+ places for backgrounds, borders, text
4. The `$va-` prefix itself is brand-specific — "SoundWave Pro" shouldn't
   have `va-` prefixed classes

**Root cause:** The design system conflates two layers:
- **Framework layer** (reusable structure, Bootstrap integration, mixins)
- **Brand layer** (Voice Aura colors, fonts, brand-specific components)

**Fix — Token indirection:**
```scss
// _tokens.scss (framework-level, brand-agnostic)
$ds-color-primary:     $primary !default;
$ds-color-surface:     $body-bg !default;
$ds-color-on-surface:  $body-color !default;
$ds-font-display:      $headings-font-family !default;
$ds-font-body:         $font-family-base !default;
$ds-radius-default:    $border-radius !default;
$ds-shadow-elevated:   $box-shadow !default;

// _brand-voice-aura.scss (brand-specific overrides)
$ds-color-primary:    #0478FF;
$ds-color-on-surface: #1A1919;
$ds-font-display:     'IBM Plex Serif', Georgia, serif;
```

Components reference `$ds-*` tokens. Swapping brands = swapping one file.

---

### B-3. `@extend` Creates Invisible Coupling (High)

**Current state:** 42 `@extend` statements connect VA components to Bootstrap
selectors. For example:

```scss
// _buttons.scss
.va-btn { @extend .btn; }
.va-btn--primary { @extend .btn-dark; }

// _navbar.scss
.va-navbar-btn--filled { @extend .btn; @extend .btn-dark; @extend .rounded-pill; }

// _typography.scss
.va-h1 { @extend .h1; }  // × 6 heading levels + 4 display levels
```

**Why this blocks scale:**
1. **Selector explosion:** `@extend .btn` copies the `.va-btn` selector into
   every Bootstrap rule that mentions `.btn`. This is why the compiled CSS has
   multi-selector rules like `.btn, .va-btn, .va-navbar-btn--filled { ... }`.
   Each new component that extends `.btn` adds to every such rule.
2. **Load-order dependency:** `@extend` only works within the same compilation
   unit. It can't extend across files loaded with `@use` (which is mandatory
   for Sass 3.0).
3. **Debugging difficulty:** When a `.va-btn` style doesn't look right, the
   actual CSS rule could be defined anywhere `.btn` is mentioned.

**Measured impact:** The `.btn` selector group in compiled CSS has **8 selectors**
instead of 1 — every VA class that extends it gets appended.

**Fix — Use mixins or composition instead:**
```scss
// Instead of: .va-btn { @extend .btn; }
// Use:
.va-btn {
  @include button-base();  // Extract Bootstrap's .btn properties as a mixin
  // VA-specific overrides
}
```

Or adopt the simpler pattern of just documenting Bootstrap equivalences and
letting consumers use Bootstrap classes directly (`.btn .btn-dark .rounded-pill`).

---

### B-4. `@import` Prevents Module Isolation (Critical)

**Current state:** 29 `@import` statements + 449+ deprecation warnings.
Sass 3.0 will remove `@import` entirely.

**Why this blocks scale beyond one theme:**
- `@import` dumps everything into global scope. Two themes can't coexist
  because variables collide.
- No encapsulation: any file can reference any variable from any other file.
- Bootstrap 5.3 itself uses `@import` internally, so full migration is blocked
  until Bootstrap 6. But the **project's own files** can be migrated now.

**Fix (phased):**
```
Phase 1 (now):      abstracts/ → @use/@forward (no CSS output change)
Phase 2 (now):      base/, layout/, components/ → @use with namespaces
Phase 3 (Bootstrap 6): vendors/ → @use
```

```scss
// scss/abstracts/_index.scss
@forward "variables";
@forward "functions";
@forward "mixins";

// scss/components/_buttons.scss
@use "../abstracts" as *;
@use "../vendors/bootstrap" as bs;
```

---

### B-5. Hardcoded Asset Paths (High)

**Current state:** 18 `url("../../assets/patterns/*.svg")` references in
`_backgrounds.scss`. These assume a specific directory structure relative to
the compiled CSS output location.

**Why this blocks scale:**
- An npm consumer installing via `npm install voice-aura-design-system` gets
  the SCSS files in `node_modules/`, but the asset paths resolve relative to
  the **compiled** CSS location (e.g., `dist/css/`), not the SCSS source.
- A Rails app using `cssbundling-rails` has a different directory structure
  than a Next.js app using `sass` directly.
- Each new theme would need its own set of SVG patterns with its own paths.

**Fix — CSS custom property + variable-based asset paths:**
```scss
// _variables.scss
$va-asset-base-path: "../../assets" !default;

// _backgrounds.scss
background-image: url("#{$va-asset-base-path}/patterns/halftone-wide.svg");
```

Consumer overrides:
```scss
// In their project:
$va-asset-base-path: "~voice-aura-design-system/assets";
@import "voice-aura-design-system/scss/voice-aura";
```

---

### B-6. App-Specific Components Ship as Core (Medium)

**Current state:** 1,671 lines (16.5%) of the SCSS are app-specific:

| File | Lines | Reusable? |
|------|-------|-----------|
| `_voice-agent.scss` | 339 | No — Voice Aura product card |
| `_video-dubbing.scss` | 376 | No — Voice Aura product card |
| `_auth.scss` | 409 | Partially — signup form is generic, but tightly styled |
| `_trust-bar.scss` | 164 | Yes — logo bar is a common SaaS pattern |
| `_reference.scss` | 383 | No — styles for the reference documentation page |

**Why this blocks scale:** Every consumer pays the CSS cost for components
they'll never use. A second theme doesn't need Voice Agent or Video Dubbing
cards — but they're compiled in.

**Fix — Separate core from brand-specific:**
```
scss/
  core/           ← Reusable across any theme
    _buttons.scss
    _cards.scss
    _forms.scss
    _pricing.scss
    _blog-card.scss
    _trust-bar.scss
  brand/          ← Voice Aura specific
    _voice-agent.scss
    _video-dubbing.scss
    _auth.scss
  docs/           ← Documentation-only styles
    _reference.scss
```

---

### B-7. No Build Optimisation Pipeline (High)

**Current state:** Build is `sass → dist/`. No PostCSS, no autoprefixer, no
minification beyond Sass's `--compressed`, no PurgeCSS, no cssnano.

| Tool | Status | Impact |
|------|--------|--------|
| **Autoprefixer** | Missing | No `-webkit-` prefixes for Safari (backdrop-filter needs them) |
| **cssnano** | Missing | Sass `--compressed` doesn't deduplicate or optimize shorthand |
| **PurgeCSS** | Missing | Can't remove unused Bootstrap utilities per-page |
| **LightningCSS** | Missing | Modern alternative: minification + bundling + syntax lowering |
| **Source map accuracy** | Partial | No PostCSS source maps for debugging |

**Measured opportunity:**
- Current minified: 334 KB
- After removing unused Bootstrap modules (modal, tooltip, dropdown): est. ~295 KB
- After cssnano optimisation: est. ~270 KB
- After PurgeCSS per-page: est. ~80-120 KB per page

**Fix:** Add PostCSS pipeline:
```json
"build:css": "sass scss/voice-aura.scss dist/css/voice-aura.css --style=expanded --source-map",
"build:post": "postcss dist/css/voice-aura.css -o dist/css/voice-aura.min.css",
"build": "npm run build:css && npm run build:post"
```

---

### B-8. HTML Template Duplication (Medium)

**Current state:** The navbar is copy-pasted across 5 HTML pages (~46 lines
each = 230 duplicated lines). The hero section is near-identical in 2 pages.
Inline `<style>` blocks total ~594 lines across 8 pages.

**Why this blocks scale:** When creating a second theme's demo pages, every
section must be re-copied and modified. There's no partial/include system,
so a navbar change requires editing 5+ files.

**Fix:** Adopt a static site generator for demo pages:
- **11ty (Eleventy):** Zero-config, Nunjucks partials, fits perfectly
- **Vite + HTML partials plugin:** If you want HMR during development

```
site/
  _includes/
    navbar.njk
    footer.njk
    head.njk
  pixel-perfect-demo.njk   ← Uses {% include "navbar.njk" %}
  components.njk
```

---

## 3. Missing Modern Practices

### MP-1. CSS Cascade Layers (`@layer`) — Not Used

**What it is:** CSS `@layer` (supported in all modern browsers since 2022)
lets you explicitly control cascade priority without relying on source order
or specificity hacks.

**Why it matters for themes:**
```css
@layer bootstrap, theme, components, utilities;
/* Now theme styles always beat bootstrap, utilities always beat everything */
```

Without layers, a theme consumer must carefully manage import order and
specificity. With layers, they can confidently override the theme without
`!important`.

**Recommendation:** Wrap output in layers:
```scss
@layer va-reset { @import "base/reset"; }
@layer va-bootstrap { @import "vendors/bootstrap"; }
@layer va-components { @import "components/buttons"; ... }
@layer va-utilities { /* utility overrides */ }
```

---

### MP-2. Design Token Interchange Format — Not Present

**What it is:** The [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/)
defines a JSON format for design tokens that can be consumed by Figma, Style
Dictionary, iOS, Android, and CSS.

**Current state:** Tokens exist only as Sass variables in `_variables.scss`.
There is no machine-readable format.

**Why it matters for themes:**
- A designer updates colors in Figma → no automated way to sync to SCSS
- A mobile team needs the same tokens → must manually extract from SCSS
- Creating a new theme means manually editing 500+ lines of SCSS variables

**Recommendation:** Add a `tokens/` directory with DTCG-format JSON:
```json
{
  "color": {
    "primary": { "$value": "#0478FF", "$type": "color" },
    "surface": { "$value": "#FFFFFF", "$type": "color" },
    "on-surface": { "$value": "#1A1919", "$type": "color" }
  },
  "font": {
    "display": { "$value": "'IBM Plex Serif', Georgia, serif", "$type": "fontFamily" },
    "body": { "$value": "'IBM Plex Sans', sans-serif", "$type": "fontFamily" }
  }
}
```

Use **Style Dictionary** to generate `_variables.scss` from this JSON:
```
tokens/voice-aura.json → style-dictionary → scss/abstracts/_variables.scss
tokens/soundwave-pro.json → style-dictionary → scss/abstracts/_variables.scss
```

Now creating a new theme = editing a JSON file, not touching SCSS.

---

### MP-3. CSS Custom Properties for Runtime Theming — Minimal

**Current state:** 54 `--va-*` custom properties exist in the compiled CSS,
but they're all auto-generated by Bootstrap's `root` module. **Zero** are
authored intentionally by the design system for runtime theming.

**What's missing:**
- No `prefers-color-scheme: dark` support
- No way to switch themes at runtime (e.g., white-label SaaS)
- No component-level custom property API for consumer overrides

**Recommendation — Phased adoption:**

**Phase 1:** Expose foundation tokens:
```scss
:root {
  --va-color-primary: #{$va-primary-blue};
  --va-color-surface: #{$va-white};
  --va-color-on-surface: #{$va-near-black};
  --va-font-display: #{$va-font-heading};
  --va-radius: #{$va-radius};
  --va-shadow: #{$va-shadow};
}
```

**Phase 2:** Components consume them:
```scss
.va-btn--primary {
  background-color: var(--va-color-on-surface);
  color: var(--va-color-surface);
}
```

**Phase 3:** Dark mode becomes trivial:
```scss
@media (prefers-color-scheme: dark) {
  :root {
    --va-color-surface: #1A1919;
    --va-color-on-surface: #FFFFFF;
  }
}
```

---

### MP-4. Container Queries — Not Used

**What it is:** Container queries (`@container`) let components respond to
their own container's size rather than the viewport. Supported in all modern
browsers since 2023.

**Why it matters:** The current blog card grid, pricing cards, and feature
rows all use viewport-based `@media` queries. This means they break when
placed in a sidebar or a narrower container (common in real apps).

**Recommendation:** Add `container-type: inline-size` to section wrappers:
```scss
.va-blog-section__grid {
  container-type: inline-size;
}

@container (max-width: 600px) {
  .va-blog-card { /* stack layout */ }
}
```

---

### MP-5. Logical Properties — Minimal (4 instances)

**What it is:** CSS logical properties (`margin-inline`, `padding-block`,
`inset-inline-start`) support RTL layouts and vertical writing modes without
separate stylesheets.

**Current state:** Only 4 logical property usages in 10,000+ SCSS lines.
Everything else uses physical properties (`margin-left`, `padding-right`).

**Why it matters:** Any SaaS platform targeting international markets needs
RTL support. Without logical properties, you'd need a separate RTL stylesheet
or a PostCSS plugin to mirror every directional value.

**Recommendation:** Adopt logical properties for all new code:
```scss
// Before:
margin-left: 1rem;
padding-right: 0.5rem;
border-left: 2px solid blue;

// After:
margin-inline-start: 1rem;
padding-inline-end: 0.5rem;
border-inline-start: 2px solid blue;
```

---

### MP-6. No Automated Testing in CI (Critical for Scale)

**Current CI:**
- `deploy-pages.yml` — builds CSS + deploys to GitHub Pages
- `release.yml` — publishes to npm on tag push
- `screenshot-capture.yml` — captures screenshots

**What's missing:**

| Test Type | Status | Why It Matters |
|-----------|--------|----------------|
| **CSS compilation test** | ❌ | Ensures `npm run build` succeeds on every PR |
| **Stylelint** | ❌ | Enforces token-first, BEM naming, max nesting |
| **Visual regression** | ❌ | Catches unintended visual changes (Playwright already installed) |
| **Accessibility audit** | ❌ | axe-core on every HTML page |
| **CSS bundle size budget** | ❌ | Fails CI if CSS exceeds threshold |
| **Design token validation** | ❌ | Ensures token JSON schema matches expected format |

**Recommendation — CI pipeline:**
```yaml
test:
  steps:
    - npm run lint:css          # Stylelint
    - npm run build             # Compilation test
    - npm run test:size         # Bundle size budget (< 250 KB minified)
    - npm run test:visual       # Playwright visual regression
    - npm run test:a11y         # axe-core audit
```

---

### MP-7. Deprecated Sass APIs Throughout (Critical)

**Current state:**

| Deprecated API | Count | Replacement | Removed in |
|----------------|-------|-------------|------------|
| `@import` | 29 (project) + 20 (Bootstrap) | `@use` / `@forward` | Sass 3.0 |
| `darken()` / `lighten()` | 50+ | `color.adjust()` / `color.scale()` | Sass 3.0 |
| `if()` function syntax | 5+ (Bootstrap) | CSS `if()` syntax | Sass 3.0 |
| `red()` / `green()` / `blue()` | 5+ (Bootstrap) | `color.red()` etc. | Sass 3.0 |
| Global `mix()` / `unit()` | Several (Bootstrap) | `color.mix()` / `math.unit()` | Sass 3.0 |

**Total deprecation warnings:** 449+ (most suppressed by Sass).

**Build time impact:** 3.27 seconds for a single compilation — acceptable
today, but Sass deprecation processing adds overhead that will grow.

**Risk:** Upgrading to Sass 3.0 (or a new Bootstrap version that requires it)
will require **simultaneous** migration of all deprecated APIs. This is a
high-risk, multi-file change.

**Recommendation:** Migrate project-owned `darken()`/`lighten()` calls now
(50+ instances across 16 files). Bootstrap's own deprecated calls will be
fixed by Bootstrap 6.

---

### MP-8. No `prefers-contrast` or `forced-colors` Support

**Current state:** Zero support for high-contrast mode or Windows forced
colors. `prefers-reduced-motion` is handled (4 checks in `_animations.scss`).

**Why it matters:** WCAG 2.2 compliance and enterprise accessibility
requirements increasingly mandate these.

**Recommendation:**
```scss
@media (prefers-contrast: high) {
  :root {
    --va-border-color: currentColor;
    --va-shadow: none;
  }
}

@media (forced-colors: active) {
  .va-btn { border: 1px solid ButtonText; }
  .va-card { border: 1px solid CanvasText; }
}
```

---

## 4. Reference-to-Theme Workflow Analysis

### Current workflow (Voice Aura):

```
Behance/Figma reference → Manual extraction of colors/fonts/spacing
                        → Write _variables.scss overrides
                        → Build custom components in SCSS
                        → Create demo HTML pages manually
                        → Copy-paste navbar/footer across pages
                        → Inline <style> for page-specific fixes
                        → npm run build → dist/css/
```

### What breaks when you do this for "Brand B":

| Step | Effort for Brand A | Effort for Brand B | Why |
|------|------|------|-----|
| Token extraction | 4 hours | 4 hours | No Figma→token automation |
| Variable overrides | 2 hours | 2 hours | Must fork `_variables.scss`, rename all `$va-*` |
| Component customisation | 40 hours | 30 hours | Can reuse structure but must override brand-specific styles |
| App-specific components | 20 hours | 20 hours | Voice Agent / Dubbing cards are useless; must build new ones |
| Demo pages | 16 hours | 16 hours | No partials, must copy-paste and adapt |
| Asset paths | 2 hours | 4 hours | Must update all 18 hardcoded SVG paths |
| Testing | Manual | Manual | No visual regression or a11y CI |
| **Total** | **~84 hours** | **~76 hours** | **Only 10% savings** |

### Ideal workflow (with recommended changes):

```
Figma reference → Style Dictionary export → tokens/brand-b.json
               → npm run build:theme -- --brand=brand-b
               → Generates _variables.scss from tokens
               → Compiles with shared core + brand-specific overrides
               → 11ty builds demo pages from shared partials
               → CI runs visual regression + a11y + size budget
```

| Step | Effort |
|------|--------|
| Token extraction (Style Dictionary) | 1 hour |
| Brand overrides (JSON) | 2 hours |
| Component customisation | 15 hours |
| Brand-specific components | 20 hours (only new ones) |
| Demo pages (11ty partials) | 4 hours |
| Asset paths | 0 (variable-based) |
| Testing | Automated |
| **Total** | **~42 hours (50% reduction)** |

---

## 5. Recommended Architecture for Multi-Theme Scalability

### Target directory structure:

```
design-system/
  tokens/
    voice-aura.json          ← Brand A tokens (DTCG format)
    soundwave-pro.json       ← Brand B tokens
  scss/
    abstracts/
      _tokens.scss           ← Generated from tokens/*.json via Style Dictionary
      _functions.scss
      _mixins.scss
    vendors/
      _bootstrap.scss
    base/
      _reset.scss
      _typography.scss
    core/                    ← Reusable across ALL themes
      _buttons.scss
      _cards.scss
      _forms.scss
      _pricing.scss
      _blog-card.scss
      _trust-bar.scss
      _backgrounds.scss      ← Split into 3 sub-files
    brands/
      voice-aura/            ← Brand-specific components
        _voice-agent.scss
        _video-dubbing.scss
      soundwave-pro/
        _waveform-player.scss
    layout/
      _navbar.scss
      _hero.scss
      _section.scss
      _footer.scss
  site/
    _includes/               ← Shared partials (11ty/Nunjucks)
      navbar.njk
      footer.njk
    brands/
      voice-aura/
        pixel-perfect-demo.njk
      soundwave-pro/
        pixel-perfect-demo.njk
  dist/
    voice-aura/
      voice-aura.css
      voice-aura.min.css
    soundwave-pro/
      soundwave-pro.css
  tests/
    visual/                  ← Playwright visual regression baselines
    a11y/                    ← axe-core audit scripts
```

### Build pipeline:

```
tokens/*.json
    ↓ style-dictionary
scss/abstracts/_tokens.scss
    ↓ sass
dist/raw.css
    ↓ postcss (autoprefixer + cssnano + purgecss)
dist/theme.min.css
    ↓ CI
stylelint + visual regression + a11y + size budget
```

---

## 6. Implementation Priority Matrix

### Tier 1 — Unblock multi-theme capability (weeks 1-3)

| Task | Effort | Impact |
|------|--------|--------|
| Migrate 50+ `darken()`/`lighten()` to `color.adjust()` | 3 h | Eliminates 50+ deprecation warnings, prepares for Sass 3.0 |
| Add `$va-asset-base-path` variable for SVG URLs | 30 min | Fixes npm consumer asset resolution |
| Remove unused Bootstrap imports (modal, tooltip, dropdown, close) | 30 min | Saves ~34 KB from compiled CSS |
| Separate core vs brand-specific SCSS directories | 2 h | Makes reusable components identifiable |
| Fix `body { overflow-x: hidden }` → `clip` in `_reset.scss` | 5 min | Eliminates per-page sticky workarounds |

### Tier 2 — Enable runtime theming (weeks 4-6)

| Task | Effort | Impact |
|------|--------|--------|
| Author `--va-*` custom properties for foundation tokens | 4 h | Enables runtime theming + dark mode |
| Migrate components to consume custom properties | 8 h | Theme switching becomes CSS-only |
| Add `@layer` wrapper around output sections | 2 h | Consumers can safely override |
| Add `prefers-color-scheme: dark` support | 4 h | Dark mode with zero JS |

### Tier 3 — Automate the workflow (weeks 7-10)

| Task | Effort | Impact |
|------|--------|--------|
| Set up Style Dictionary with DTCG token format | 4 h | Token → SCSS generation automated |
| Migrate abstracts to `@use`/`@forward` | 4 h | Module isolation, namespace safety |
| Add PostCSS pipeline (autoprefixer + cssnano) | 2 h | Better minification + vendor prefixes |
| Adopt 11ty for demo page generation | 4 h | Eliminates HTML duplication |
| Replace `@extend` with mixin/composition patterns | 6 h | Eliminates selector explosion |

### Tier 4 — CI/CD and quality gates (weeks 11-12)

| Task | Effort | Impact |
|------|--------|--------|
| Add Stylelint with BEM + token-first rules | 2 h | Prevents regressions |
| Add CSS size budget to CI | 1 h | Prevents bloat |
| Add Playwright visual regression tests | 4 h | Catches unintended visual changes |
| Add axe-core accessibility audit to CI | 2 h | Ensures WCAG compliance |
| Add container queries for component-level responsiveness | 4 h | Components work in any layout context |
| Add logical properties for RTL readiness | 3 h | International market support |

### Tier 5 — Future-proofing (ongoing)

| Task | Effort | Impact |
|------|--------|--------|
| Complete `@use` migration (post-Bootstrap 6) | 8 h | Full Sass 3.0 readiness |
| Publish design tokens as standalone npm package | 4 h | Consumed by iOS/Android/Figma |
| Add `prefers-contrast` + `forced-colors` support | 2 h | Enterprise accessibility |
| Multi-brand CI matrix (build + test all themes in parallel) | 4 h | Confidence across brands |

---

*This analysis is a companion to `ARCHITECTURE_REVIEW.md` (issue-level detail)
and `QA_REPORT.md` (visual QA findings). Together they form the complete
assessment of the design system's current state and path forward.*
