# Voice Aura Design System — Architecture Review & Continuous Improvement Plan

> Generated from a full-codebase audit of 9,240 lines of SCSS, 7 HTML pages,
> 1 JS module, CI/CD pipeline, and documentation. All findings are
> cross-referenced against the compiled CSS output (17,752 lines / 3,963
> selectors).

---

## Table of Contents

1. [Current Architecture Overview](#1-current-architecture-overview)
2. [Identified Issues (by severity)](#2-identified-issues)
3. [Continuous Improvement Roadmap](#3-continuous-improvement-roadmap)
4. [Governance & Process](#4-governance--process)

---

## 1. Current Architecture Overview

### What works well

| Area | Assessment | Detail |
|------|-----------|--------|
| **SMACSS import order** | Excellent | `abstracts → vendors → base → layout → components` is textbook-correct. |
| **Bootstrap integration** | Excellent | Variables overridden *before* Bootstrap import; selective module loading keeps output lean. |
| **Design token strategy** | Good | Primitive tokens (`$va-primary-blue`) feed semantic tokens (`$va-primary`) and a `$va-colors` map. |
| **BEM naming** | Good | Consistent `.va-block__element--modifier` across components. |
| **Utility API extensions** | Good | `tracking-*`, `lh-*`, `max-w-*`, `transition-*` utilities generated via Bootstrap's API. |
| **Accessibility baseline** | Good | Skip link, `aria-label` on nav toggles, `role="tab"` + `aria-selected` on tabs, `prefers-reduced-motion` handled in animations. |
| **Responsive design** | Good | Breakpoints centralised in `$va-breakpoints` map; `va-media-up` / `va-media-down` mixins exist. |
| **JavaScript** | Excellent | `va-scroll.js` uses IntersectionObserver with a clean public API (`.add`, `.remove`, `.refresh`). |

### Quantitative snapshot

| Metric | Value |
|--------|-------|
| SCSS source lines | 9,240 |
| Compiled CSS lines | 17,752 |
| Compiled CSS selectors | ~3,963 |
| `!important` usages | 48 (35 in utility generators — acceptable) |
| Hardcoded hex colors outside `_variables.scss` | 2 (`#000` / `#fff` in color-mix functions — acceptable) |
| Hardcoded `rgba()` with literal color values | 20+ (shadows, borders — should use tokens) |
| `z-index` declarations | 30+ (only 1 uses a variable) |
| `@import` statements (deprecated in Dart Sass 3.0) | 52 |
| `@use` statements | 10 (only in abstracts) |
| Max nesting depth ≥ 4 | 6 files |
| `@keyframes` definitions | 14 |
| `transition` declarations | 177 |
| `prefers-reduced-motion` checks | 1 (in `_animations.scss`) |

---

## 2. Identified Issues

### 2.1 CRITICAL — Must fix before next release

#### C-1. Duplicate `.va-feature-row` component

**Files:** `scss/layout/_section.scss` (line 123) AND `scss/layout/_feature-section.scss` (line 26)

Both files define `.va-feature-row` independently. In the compiled CSS the second
definition wins, silently overriding the first. They also use different naming
for the reversed variant (`--reversed` vs `--reverse`), different spacing
approaches (`$va-grid-unit * 8` vs `map-get($spacers, 6)`), and different
sub-element class names (`__content` vs `__text`).

**Impact:** Whichever file is imported last owns the class. If a page uses the
sub-elements from the other file, those styles silently disappear.

**Fix:**
- Consolidate into `_feature-section.scss` as the canonical owner.
- Remove the duplicate block from `_section.scss`.
- Standardise on one modifier name (`--reverse`) and one spacing approach
  (`$va-grid-unit * 8`).
- Grep both HTML files and update any element class that no longer exists.

---

#### C-2. Dart Sass `@import` deprecation

**Files:** `voice-aura.scss` (52 `@import` statements), all partials

Dart Sass prints deprecation warnings today and **will remove `@import`
entirely in Sass 3.0**. The project currently uses Sass 1.98.x.

**Impact:** The build will break the day you upgrade to Sass 3.x.

**Fix (phased):**
1. **Immediate:** Pin Sass in `package.json`: `"sass": ">=1.98.0 <2.0.0"`.
2. **Short-term:** Migrate abstracts to `@use` / `@forward`:
   ```scss
   // scss/abstracts/_index.scss
   @forward "variables";
   @forward "functions";
   @forward "mixins";

   // voice-aura.scss
   @use "abstracts" as *;
   ```
3. **Medium-term:** Migrate remaining partials once Bootstrap 6 ships with
   `@use` support (track https://github.com/twbs/bootstrap/pull/39600).

---

#### C-3. Button `border-radius` bug

**File:** `scss/abstracts/_variables.scss` line 236

```scss
$btn-border-radius-lg: $va-radius-sm;   // BUG — should be $va-radius-lg
```

Large buttons get `8px` radius (same as small), breaking visual hierarchy.

**Fix:** Change to `$btn-border-radius-lg: $va-radius-lg;`

---

#### C-4. `va-focus-ring` mixin ignores its `$color` parameter

**File:** `scss/abstracts/_mixins.scss` line 157

```scss
border-color: $va-primary-blue;   // should be: border-color: $color;
```

The mixin accepts a `$color` argument but hardcodes the border colour,
making customisation impossible.

**Fix:** Replace with `border-color: $color;`

---

### 2.2 HIGH — Should fix this sprint

#### H-1. Hardcoded breakpoints in `_section.scss`

**File:** `scss/layout/_section.scss` lines 432-440

Three `@media` queries use raw pixel values (`1199.98px`, `991.98px`,
`575.98px`) instead of the centralised `$va-breakpoints` map or the
`va-media-down` mixin.

**Fix:** Replace with `@include va-media-down("lg")`, etc.

---

#### H-2. Scattered `z-index` values

29 of 30 `z-index` declarations are hardcoded magic numbers (`1`, `2`, `9999`).
Only the navbar references the `$va-z-navbar` variable.

**Fix:**
- Extend `_variables.scss` with a complete z-index scale:
  ```scss
  $va-z-base:       0;
  $va-z-raised:     1;
  $va-z-decoration:  2;
  $va-z-skip-link:  9999;
  ```
- Replace every raw `z-index` value with the appropriate token.

---

#### H-3. `rgba()` shadows use literal `0, 0, 0` instead of tokens

20+ box-shadow declarations across `_cards.scss`, `_navbar.scss`, `_auth.scss`,
`_pricing.scss`, `_blog-card.scss`, `_reset.scss` use `rgba(0, 0, 0, N)`
instead of the shadow variables defined in `_variables.scss`.

**Fix:**
- Use the existing `$va-shadow-*` variable hierarchy wherever possible.
- For one-off values, at minimum use `rgba($va-near-black, 0.06)` so the
  base colour is tied to the token system.

---

#### H-4. Cross-component pattern duplication

Three distinct components duplicate a "crosshair / plus-sign corner"
decoration pattern independently:

| File | Lines |
|------|-------|
| `_pricing.scss` | 176-239 |
| `_voice-agent.scss` | 310-372 |
| `_video-dubbing.scss` | 397-469 |

Two components duplicate a "language pill / tab carousel" pattern:

| File | Lines |
|------|-------|
| `_voice-agent.scss` | 51-84 |
| `_video-dubbing.scss` | 66-114 |

**Fix:** Extract into mixins in `_mixins.scss`:

```scss
@mixin va-crosshair-corners($color: $va-border-color) { ... }
@mixin va-pill-tabs($active-bg: $va-primary-blue)       { ... }
```

---

#### H-5. Missing mixin extractions for repeated micro-patterns

The audit found 6 micro-patterns each repeated 5+ times across files:

| Pattern | Occurrences |
|---------|-------------|
| Flex centre (`display:flex; align-items:center; justify-content:center`) | 10+ |
| Focus ring (`outline: 2px solid $va-primary; outline-offset: 2px`) | 15+ |
| Disabled state (`opacity:0.5; pointer-events:none`) | 8+ |
| Button hover darken (`darken($color, 8%)`) | 12+ |
| Card hover lift (`transform: translateY(-2px); box-shadow: $va-shadow-lg`) | 5+ |
| Visually-hidden / screen-reader-only | 0 (missing entirely) |

**Fix:** Add to `_mixins.scss`:

```scss
@mixin va-flex-center      { ... }
@mixin va-disabled-state   { ... }
@mixin va-hover-darken($bg, $amount: 8%) { ... }
@mixin va-card-hover-lift($distance: 2px) { ... }
@mixin va-sr-only          { ... }
```

---

#### H-6. `!important` misuse in `_pattern-data.scss`

11 declarations use `!important` to force inline-modifier styles over
base component styles. This is a symptom of specificity conflict, not a
solution.

**Fix:** Restructure selectors using double-class specificity:
```scss
// Before (bad)
.va-pattern-noise--inline::after { background-image: ... !important; }

// After (good)
.va-pattern-noise.va-pattern-noise--inline::after { background-image: ...; }
```

---

#### H-7. Accessibility gaps in HTML

| Issue | File(s) | Impact |
|-------|---------|--------|
| Form inputs missing `id` attributes (labels can't associate) | `reference.html` lines 378-398 | Screen readers can't announce input purpose |
| Decorative SVG patterns missing `aria-hidden="true"` | `backgrounds-reference.html` | Screen readers read decorative content |
| `va-scroll.js` does not check `prefers-reduced-motion` | `js/va-scroll.js` | Scroll animations play even when user requests reduced motion |
| `index.html` missing `<header>`, `<main>`, `<footer>` landmarks | `docs/index.html` | Poor screen-reader navigation |

---

### 2.3 MEDIUM — Address within the next quarter

#### M-1. Incomplete design-token function coverage

`_functions.scss` defines 5 functions (`va-color`, `va-space`, `va-shade`,
`va-tint`, `va-str-replace`), but the variable file defines maps for
font-sizes, breakpoints, shadows, radii, transitions, z-indexes, and
gradients — none of which have a retrieval function.

**Fix:** Add accessor functions with validation:

```scss
@function va-font-size($name)   { ... }
@function va-breakpoint($name)  { ... }
@function va-shadow($level)     { ... }
@function va-radius($size)      { ... }
@function va-z($layer)          { ... }
```

---

#### M-2. Missing token maps

Several categories of values appear repeatedly as hardcoded literals but
have no corresponding variable or map:

| Category | Example values found | Proposed map |
|----------|---------------------|-------------|
| Icon sizes | `16px`, `18px`, `20px`, `24px`, `36px`, `48px` | `$va-icon-sizes` |
| Letter-spacing | `-0.03em`, `-0.02em`, `-0.01em`, `0.08em` | `$va-letter-spacing` |
| Line-height | `1.1`, `1.15`, `1.2`, `1.6`, `1.7` | `$va-line-heights` |
| Hover darken amounts | `8%`, `10%`, `12%`, `14%` | `$va-hover-darken: 8%` etc. |
| Animation distances | `24px`, `32px`, `48px` | `$va-animation-distances` |
| Animation durations | `0.25s`, `0.5s`, `1s`, `3s` | `$va-animation-durations` |

---

#### M-3. Missing Bootstrap utility extensions

The Bootstrap utility API is used to generate 5 custom utilities, but
several common needs are missing:

| Utility | Property | Priority |
|---------|----------|----------|
| `opacity-*` | `opacity` | High |
| `z-*` | `z-index` | High |
| `aspect-*` | `aspect-ratio` | Medium |
| `gap-*` (verify Bootstrap provides) | `gap` | Medium |
| `cursor-*` | `cursor` | Low |

---

#### M-4. HTML template duplication

The navbar block is copy-pasted identically across `sample.html`,
`pixel-perfect.html`, and `signup.html` (~46 lines each). The hero
section is near-identical in `sample.html` and `pixel-perfect.html`.

**Fix:** Introduce a lightweight build-time include system. Options:
- **Eleventy (11ty):** Zero-config static site generator, nunjucks partials.
- **Simple bash/Make:** `cat partials/navbar.html` into a sed template.
- If scope is docs only, even a `postbuild` npm script that assembles
  pages from partials would eliminate drift.

---

#### M-5. Inline `<style>` blocks in documentation pages

| Page | Inline CSS lines |
|------|-----------------|
| `assets.html` | ~245 |
| `reference.html` | ~150 |
| `backgrounds-reference.html` | ~100 |
| `signup.html` | ~71 |

These styles are not part of the compiled design-system CSS, creating a
shadow stylesheet that is easy to forget.

**Fix:**
- Create `scss/pages/_reference.scss`, `scss/pages/_assets.scss`, etc.
- Import them in `voice-aura.scss` under a new `// 6. PAGES` section.
- Strip the inline `<style>` blocks from the HTML files.

---

#### M-6. No CSS linting or formatting

There is no Stylelint or Prettier configuration. Code style is
consistent today because one person wrote it, but will diverge with
multiple contributors.

**Fix:** Add `.stylelintrc.json`:
```json
{
  "extends": ["stylelint-config-standard-scss"],
  "rules": {
    "selector-class-pattern": "^(va-|ref-)[a-z][a-z0-9-]*(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
    "max-nesting-depth": 3,
    "no-descending-specificity": true
  }
}
```

---

#### M-7. No automated tests

There are no visual-regression, snapshot, or unit tests. Breaking
changes to the compiled CSS can only be caught manually.

**Fix (incremental):**
1. **Snapshot test:** Compile CSS and compare hash against a committed
   baseline. Any unexpected diff fails CI.
2. **Visual regression:** Use Playwright (already a devDependency) to
   screenshot each reference page and compare against baselines.
3. **a11y audit:** Run `axe-core` in CI against every HTML page.

---

### 2.4 LOW — Nice-to-have / polish

| ID | Issue | Detail |
|----|-------|--------|
| L-1 | Unused Sass import | `_mixins.scss` line 10: `@use "sass:meta"` is never used. |
| L-2 | Unused function | `va-str-replace()` in `_functions.scss` appears unused. |
| L-3 | Missing font-size in `$va-font-sizes` map | `0.9375rem` (15px) is used in `_feature-section.scss:91` but not in the map. |
| L-4 | `$va-colors` map missing entries | `$va-white` and `$va-section-bg` are omitted. |
| L-5 | No version header in compiled CSS | Add a `/*! Voice Aura v#{$version} */` banner. |
| L-6 | Halftone overlay mixin uses hardcoded `8px 8px` | Should reference `$va-halftone-pattern-size` variable. |
| L-7 | Redundant variable aliases | `$va-primary`, `$va-border`, `$va-bg-alt` duplicate other tokens. Document which is canonical or remove. |

---

## 3. Continuous Improvement Roadmap

### Phase 1 — Stability & correctness (weeks 1-2)

| Task | Issue(s) | Effort |
|------|----------|--------|
| Fix `$btn-border-radius-lg` bug | C-3 | 5 min |
| Fix `va-focus-ring` mixin | C-4 | 5 min |
| Consolidate `.va-feature-row` into one file | C-1 | 2 h |
| Replace hardcoded breakpoints in `_section.scss` | H-1 | 30 min |
| Add `id` attributes to `reference.html` form inputs | H-7 | 15 min |
| Add `aria-hidden="true"` to decorative SVGs | H-7 | 15 min |
| Add `prefers-reduced-motion` check to `va-scroll.js` | H-7 | 30 min |
| Pin Sass version in `package.json` | C-2 phase 1 | 5 min |

### Phase 2 — Token hardening (weeks 3-4)

| Task | Issue(s) | Effort |
|------|----------|--------|
| Centralise z-index values into token map | H-2 | 2 h |
| Replace `rgba(0,0,0,N)` with token-based shadows | H-3 | 3 h |
| Add `$va-icon-sizes`, `$va-letter-spacing`, `$va-line-heights` maps | M-2 | 2 h |
| Add accessor functions (`va-font-size`, `va-breakpoint`, etc.) | M-1 | 1.5 h |
| Extract crosshair-corners & pill-tabs mixins | H-4 | 3 h |
| Extract flex-centre, disabled, hover-darken, sr-only mixins | H-5 | 2 h |
| Restructure `_pattern-data.scss` to remove `!important` | H-6 | 1 h |
| Add missing utility extensions (opacity, z-index) | M-3 | 1 h |

### Phase 3 — Tooling & automation (weeks 5-8)

| Task | Issue(s) | Effort |
|------|----------|--------|
| Add Stylelint + Prettier config | M-6 | 2 h |
| Add CSS snapshot test to CI | M-7 | 3 h |
| Add Playwright visual-regression tests | M-7 | 4 h |
| Add axe-core a11y audit to CI | M-7 | 2 h |
| Introduce 11ty (or similar) for HTML partials | M-4 | 4 h |
| Move inline `<style>` blocks into SCSS page partials | M-5 | 3 h |
| Begin `@import` → `@use` migration for abstracts | C-2 phase 2 | 4 h |

### Phase 4 — Maturity & scale (ongoing)

| Task | Issue(s) | Effort |
|------|----------|--------|
| Complete `@import` → `@use` migration (post-Bootstrap 6) | C-2 phase 3 | 8 h |
| Add conditional component imports for tree-shaking | — | 3 h |
| Publish design-token JSON (for Figma sync / multi-platform) | — | 4 h |
| CSS custom-property layer for runtime theming | — | 8 h |
| Add CHANGELOG.md and semver releases | — | 2 h |
| Create component accessibility checklist in DESIGN_SYSTEM.md | — | 2 h |

---

## 4. Governance & Process

### Definition of "design-system ready"

Every change to the design system should satisfy:

1. **Token-first**: No hardcoded colour, spacing, radius, shadow, or
   z-index values. All values must trace back to `_variables.scss`.
2. **Mixin-first**: Any pattern used in ≥2 components must be extracted
   into a mixin.
3. **BEM-compliant**: Class names follow `.va-block__element--modifier`.
4. **Responsive**: Every layout component handles at least the `md`
   breakpoint via `va-media-down` / `va-media-up`.
5. **Accessible**: Interactive elements have focus indicators; decorative
   elements have `aria-hidden`; form inputs have labels.
6. **Tested**: CSS compiles without error; Stylelint passes; visual
   snapshot matches baseline (once CI is set up).
7. **Documented**: New classes are reflected in `DESIGN_SYSTEM.md` and
   the relevant reference page.

### Review checklist (for PRs)

```
- [ ] No new hardcoded colours, spacing, or z-index values
- [ ] No new `!important` outside utility generators
- [ ] Max nesting depth ≤ 3
- [ ] New/changed components use existing mixins where applicable
- [ ] Responsive behaviour verified at 375px, 768px, 1280px
- [ ] `npm run build` succeeds with no new Sass warnings (excluding Bootstrap deprecations)
- [ ] DESIGN_SYSTEM.md updated if public API changed
```

### Metrics to track over time

| Metric | Current | Target |
|--------|---------|--------|
| Compiled CSS size (gzip) | ~35 KB* | < 30 KB |
| `!important` outside utilities | 13 | 0 |
| Hardcoded `rgba()` with literal colours | 20+ | 0 |
| Raw `z-index` (non-variable) | 29 | 0 |
| Max nesting depth | 4 | ≤ 3 |
| `@import` statements | 52 | 0 (post-migration) |
| a11y violations (axe-core) | Unknown | 0 |
| Visual regression failures (unintentional) | N/A | 0 |

*Estimated; actual gzip size not yet measured.

---

*This document is a living artefact. Update it as issues are resolved and
new concerns surface. Track progress by checking items off in each phase
of the roadmap.*
