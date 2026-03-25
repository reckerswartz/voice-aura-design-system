# Voice Aura Design System — Architecture Review & Continuous Improvement Plan

> Generated from a full-codebase audit of 9,185 lines of SCSS, 7 HTML pages,
> 1 JS module, CI/CD pipeline, and documentation. All findings are
> cross-referenced against the compiled CSS output (17,664 lines / ~3,963
> selectors). Responsive behaviour verified via Playwright at 375px, 768px,
> and 1440px viewports.
>
> Last updated: 2026-03-25

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
| SCSS source lines | 11,341 (+2,156 since initial review) |
| Compiled CSS (expanded) | 424 KB |
| Compiled CSS (minified) | 354 KB |
| `!important` usages | 48 (35 in utility generators — acceptable) |
| Hardcoded hex colors outside `_variables.scss` | 6 (down from 42; remaining are in `color-mix` functions) |
| Hardcoded `rgba()` with literal color values | 42 (shadows, borders — should use tokens) |
| Deprecated `darken()`/`lighten()` calls | **0** in VA code (all migrated to `va-darken()`/`va-lighten()`) |
| `z-index` declarations | 107 in compiled CSS (only 1 raw value remains in SCSS) |
| `@import` statements (deprecated in Dart Sass 3.0) | 59 (increased due to file splits) |
| `@use` statements | 10 (only in abstracts) |
| `@forward` statements | 0 |
| `@extend` usages | 55 (was 52; hero/navbar now extend `.va-btn` instead of duplicating) |
| `--va-*` CSS custom properties | 38 authored on `:root`; **consumed by 15/18 sections** |
| Max nesting depth ≥ 4 | 6 files |
| `@keyframes` definitions | 14 |
| `transition` declarations | 101 |
| `prefers-reduced-motion` checks | 4 (all in `_animations.scss`) |
| Inline `style=` attributes in `components.html` | 292 |
| Inline `style=` attributes across all HTML pages | 796 total |
| Largest single SCSS file | `_bg-patterns.scss` — **644 lines** (was `_backgrounds.scss` 1,545 — split) |
| SCSS partials | 33 |

---

## 1b. Progress Tracker (as of 2026-03-25)

Issues resolved or partially addressed since the initial review:

| ID | Issue | Status | Commit |
|----|-------|--------|--------|
| C-1 | Duplicate `.feature-visual` in `_section.scss` | ✅ Done | Removed dead code; canonical is `.va-feature-visual` in `_feature-section.scss` |
| C-2 | Dart Sass `@import` — phase 1 (pin version) | ✅ Done | `package.json`: `"sass": ">=1.98.0 <2.0.0"` |
| C-3 | `$btn-border-radius-lg` bug | ✅ Done | Changed to `$va-radius-lg` in `_variables.scss` |
| C-4 | `va-focus-ring` hardcoded color | ✅ Done | Fixed to use `$color` param via `box-shadow` in `_mixins.scss` |
| C-5 | `body { overflow-x: hidden }` breaks sticky | ✅ Done | Root cause fixed — changed to `overflow-x: clip` in `_reset.scss` |
| C-6 | 50+ deprecated `darken()`/`lighten()` | ✅ Done | Migrated to `va-darken()`/`va-lighten()` wrappers (`43ca9ce`) |
| C-7 | Blog card `__tag` vs `__category` | ✅ Done | Aliased both names in `_blog-card.scss` |
| H-2 | Scattered z-index values | ✅ Nearly done | `$va-z-*` scale added; only 1 raw z-index remains in SCSS |
| H-4 | Cross-component pattern duplication | ⚠️ Partial | `va-crosshair-corners` and `va-pill-tabs` mixins added. Not yet consumed by all components. |
| H-5 | Missing mixin extractions | ✅ Done | `va-flex-center`, `va-disabled-state`, `va-hover-darken`, `va-card-hover-lift`, `va-sr-only` added. |
| H-6 | `!important` in `_pattern-data.scss` | ✅ Done | Restructured selectors — 0 `!important` now |
| H-7 | Accessibility gaps | ✅ Mostly done | Skip links, `autocomplete`, `aria-label` added. **Muted text contrast fixed**: `#9CA3AF` → `#6B7280` (4.6:1 WCAG AA). |
| H-8 | 796 inline `style=` across HTML pages | ❌ Open | Not yet addressed (grew from 291 due to new pages). |
| H-9 | Missing code blocks in reference | ⚠️ Partial | 8 sections now have copyable code snippets (`8fdea19`). 13+ sections still lack them. |
| H-10 | No scroll-spy | ✅ Done | JS scroll-spy added to `components.html` and `backgrounds.html` (`8fdea19`). |
| — | `_backgrounds.scss` split | ✅ Done | Index + 3 sub-modules (`43ca9ce`) |
| — | `_animations.scss` split | ✅ Done | Index + 3 sub-modules (`43ca9ce`) |
| — | CSS custom properties authored | ✅ Done | 38 `--va-*` tokens on `:root` (`d6eceeb`) |
| F-6 | Components consume `var(--va-*)` tokens | ✅ Done | 15/18 sections migrated — colors, borders, shadows, transitions, focus states |
| — | Stylelint | ✅ Done | BEM-aware config, 0 errors (`d6eceeb`) |
| — | Gradient angle inconsistency | ✅ Done | Unified 6 instances → 135deg (`d6eceeb`) |
| — | Delta-only component refactor | ✅ Done | Buttons, cards, forms, badges slimmed (`a1a82bc`) |
| — | Blog SVG `stop-color="transparent"` | ✅ Done | Fixed all 4 SVGs to use `stop-opacity="0"` |
| — | Pixel-perfect QA fixes | ✅ Done | Hero id, accent button, dubbing icon, footer font size |
| F-1 | No `:focus-visible` on `.va-pricing__tab` | ✅ Done | Added `:focus-visible` outline (`18fa927`) |
| F-2 | 26 hardcoded SVG `url()` paths in backgrounds | ✅ Done | All use `#{$va-asset-base-path}` (`18fa927`) |
| F-3 | Google Fonts `@import` render-blocking + brand-coupled | ✅ Done | `$va-google-fonts-url` variable with `@if` guard (`18fa927`) |
| F-4 | 3 parallel button systems | ✅ Done | Hero/navbar buttons `@extend .va-btn` + deltas (`18fa927`) |
| F-5 | 7 files missing BOOTSTRAP ALIGNMENT blocks | ✅ Done | Added to navbar, hero, footer, feature-section, section, voice-agent, video-dubbing (`18fa927`) |
| F-7 | 1,147 lines app-specific SCSS in `components/` | ✅ Done | Moved auth, voice-agent, video-dubbing to `scss/brands/voice-aura/` with index |
| F-8 | Grid section missing from components.html | ✅ Done | Added with auto-fit, 2/3/4-col, spacing demos + code snippet (`18fa927`) |

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

#### C-5. `body { overflow-x: hidden }` breaks `position: sticky` globally

**File:** `scss/base/_reset.scss` lines 183–189

```scss
html { overflow-x: clip; }     // ← This is fine
body { overflow-x: hidden; }   // ← THIS is the problem
```

**Current state:** The `html` rule was already changed to `clip` (which doesn't
create a scroll container), but `body { overflow-x: hidden }` **still creates
a new scroll container** that breaks `position: sticky` for any descendant.

**Current workaround:** Two reference pages (`components.html`,
`backgrounds.html`) use `<style>body { overflow-x: visible !important; }</style>`
to override. This is fragile — every new page with sticky elements must
remember to add the override.

**Root fix:** Change `_reset.scss` line 188:
```scss
// Before:
body { overflow-x: hidden; }

// After:
body { overflow-x: clip; }
```

`overflow-x: clip` prevents horizontal scrollbar without creating a scroll
container, preserving `position: sticky` everywhere. Then remove the
per-page `!important` overrides.

---

#### C-6. 50+ deprecated `darken()` / `lighten()` global function calls

**Files:** 16 SCSS files across components, layout, base, and abstracts

Dart Sass has deprecated the global `darken()`, `lighten()`, `saturate()`,
`desaturate()` functions. They will be **removed in Dart Sass 3.0**.

**Top offenders:**
| File | Calls |
|------|-------|
| `_buttons.scss` | 14 |
| `_pricing.scss` | 8 |
| `_hero.scss` | 5 |
| `_auth.scss` | 4 |
| `_blog-card.scss` | 4 |
| Other files | 15+ |

**Fix:** Migrate all calls to the `color` module:
```scss
// Before (deprecated):
background-color: darken($va-near-black, 5%);

// After:
@use "sass:color";
background-color: color.adjust($va-near-black, $lightness: -5%);

// Or use color.scale() for proportional adjustments:
background-color: color.scale($va-near-black, $lightness: -20%);
```

The `_variables.scss` already uses `@use "sass:color"` and `color.adjust()`
(line 408, 502-504), proving the pattern works. Apply it project-wide.

---

#### C-7. Class naming split between sample page and reference

**Problem:** The pixel-perfect demo (`pixel-perfect-demo.html`) and the
reference guide (`components.html`) use **different class names** for the
same visual elements. A developer copying from the reference will get
non-matching HTML.

| Element | pixel-perfect-demo.html | components.html | SCSS definition |
|---------|------------------------|-----------------|----------------|
| Blog category | `va-blog-card__tag` | `va-blog-card__category` | `&__tag` (line 107 of `_blog-card.scss`) |
| Navbar buttons | `va-navbar-btn--outlined`, `va-navbar-btn--filled` | `va-btn va-btn--ghost`, `va-btn va-btn--primary` | Both exist in `_navbar.scss` / `_buttons.scss` |
| Hero buttons | `va-hero__btn--primary`, `va-hero__btn--secondary` | `va-btn va-btn--primary va-btn--icon` | Both exist in `_hero.scss` / `_buttons.scss` |

**Impact:** Developers will copy code from the reference, paste it into their
app, and discover the classes don't match the sample page they're trying to
replicate.

**Fix:**
1. Standardise blog tag class: add `&__category` as an alias for `&__tag`
   in `_blog-card.scss`, or pick one name and update all HTML.
2. Document the relationship between hero/navbar-specific button classes and
   the generic `va-btn` system in the reference guide. Add a "Navbar Buttons"
   and "Hero Buttons" section explaining when to use which.

---

### 2.2 HIGH — Should fix this sprint

#### H-0. Pricing section floating elements have wrong positioning

**File:** `site/pixel-perfect-demo.html` lines 429-432

The pricing section reuses `.va-hero__float` for decorative microphone/letter
elements, but their computed `position` is `relative` instead of `absolute`.
They appear inline above the pricing header instead of floating over section
edges.

**Root cause:** The pricing section has `overflow: hidden` (via inline style)
and the float elements have inline `style="top:12%;left:8%"` but no
`position: absolute`. The `.va-hero__float` class sets `position: absolute`
in the hero context, but the pricing section's parent structure doesn't
provide the same positioning context.

**Fix:** Add `position: absolute` to the inline styles on the pricing floats,
or better — create a `.va-section-float` class that works in any section
context (not just hero).

---

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
| `index.html` missing `<header>`, `<main>`, `<footer>` landmarks | `site/index.html` | Poor screen-reader navigation |
| Muted text `#9CA3AF` on white has ~3.0:1 contrast (fails WCAG AA) | `_variables.scss` | Inaccessible to low-vision users |
| No `:focus-visible` on auth form inputs | `_auth.scss` | Keyboard users can't see focus state |
| Skip-link class exists but not used in most HTML files | All docs pages | Screen-reader users can't skip to main content |

---

#### H-8. Reference page — 291 inline `style=` attributes

**File:** `site/components.html`

The reference page uses 291 inline `style=` attributes for layout
(flex containers, grid gaps, padding, max-widths, color swatches, etc.).
This makes the design system's own reference page a poor example of its
CSS classes. By comparison, `sample.html` and `pixel-perfect.html` have
only 1 inline style each.

**Fix:**
- Map inline styles to existing utility classes where possible
  (e.g., `style="margin-bottom: 1rem"` → `class="va-mb-3"`)
- Add remaining styles to `_reference.scss` as semantic classes
  (e.g., `.ref-demo-grid`, `.ref-color-swatch`)
- Target: reduce from 291 to <20 (demo-specific overrides only)

---

#### H-9. Reference page — Missing code blocks & copy buttons

Seven component sections (Buttons, Badges, Cards, Forms, Blog Cards,
Voice Agent, Video Dubbing) show rendered demos but have **no
`<pre><code>` blocks** showing the HTML markup. The 24 existing code
blocks (in Foundations sections) lack copy-to-clipboard buttons.

**Fix:**
- Add collapsible `<details><summary>View Code</summary>` blocks
  after each demo with copy-paste-ready HTML markup
- Add a small JS copy-to-clipboard handler on all code blocks

---

#### H-10. Reference page — No scroll-spy active link highlighting

The sidebar TOC links don't highlight the currently visible section as
the user scrolls. Implement an `IntersectionObserver` that adds an
`.active` class to the corresponding sidebar link.

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

| Task | Issue(s) | Effort | Status |
|------|----------|--------|--------|
| Fix `$btn-border-radius-lg` bug | C-3 | 5 min | ❌ Open |
| Fix `va-focus-ring` mixin | C-4 | 5 min | ❌ Open |
| Fix `body { overflow-x }` root cause in `_reset.scss` | C-5 | 15 min | ❌ Open (workaround in place) |
| Migrate 50+ `darken()`/`lighten()` to `color.adjust()` | C-6 | 3 h | ❌ Open |
| Fix pricing section float positioning | H-0 | 30 min | ❌ Open |
| Standardise class names across sample and reference | C-7 | 2 h | ❌ Open |
| Consolidate `.va-feature-row` into one file | C-1 | 2 h | ❌ Open |
| Replace hardcoded breakpoints in `_section.scss` | H-1 | 30 min | ❌ Open |
| Pin Sass version in `package.json` | C-2 phase 1 | 5 min | ✅ Done |

### Phase 2 — Token hardening (weeks 3-4)

| Task | Issue(s) | Effort | Status |
|------|----------|--------|--------|
| Migrate remaining z-index values to `$va-z-*` tokens | H-2 | 2 h | ⚠️ Scale defined, migration pending |
| Replace `rgba(0,0,0,N)` with token-based shadows | H-3 | 3 h | ❌ Open |
| Add `$va-icon-sizes`, `$va-letter-spacing`, `$va-line-heights` maps | M-2 | 2 h | ❌ Open |
| Add accessor functions (`va-font-size`, `va-breakpoint`, etc.) | M-1 | 1.5 h | ❌ Open |
| Have components consume `va-crosshair-corners`/`va-pill-tabs` mixins | H-4 | 1 h | ⚠️ Mixins exist, not consumed |
| Restructure `_pattern-data.scss` to remove `!important` | H-6 | 1 h | ❌ Open |
| Add missing utility extensions (opacity, z-index) | M-3 | 1 h | ❌ Open |

### Phase 3 — Tooling & automation (weeks 5-8)

| Task | Issue(s) | Effort | Status |
|------|----------|--------|--------|
| Add Stylelint + Prettier config | M-6 | 2 h | ❌ Open |
| Add CSS snapshot test to CI | M-7 | 3 h | ❌ Open |
| Add Playwright visual-regression tests | M-7 | 4 h | ❌ Open |
| Add axe-core a11y audit to CI | M-7 | 2 h | ❌ Open |
| Introduce 11ty (or similar) for HTML partials | M-4 | 4 h | ❌ Open |
| Move inline `<style>` blocks into SCSS page partials | M-5 | 3 h | ❌ Open |
| Move 291 inline `style=` attrs to `_reference.scss` | H-8 | 4 h | ❌ Open |
| Add code blocks to remaining 13 reference sections | H-9 | 3 h | ⚠️ 8 of 21 done |
| Begin `@import` → `@use` migration for abstracts | C-2 phase 2 | 4 h | ❌ Open |
| Split `_backgrounds.scss` (1303 lines) into sub-modules | NEW | 3 h | ❌ Open |

### Phase 4 — Maturity & scale (ongoing)

| Task | Issue(s) | Effort | Status |
|------|----------|--------|--------|
| Complete `@import` → `@use` migration (post-Bootstrap 6) | C-2 phase 3 | 8 h | ❌ Blocked on Bootstrap 6 |
| Add conditional component imports for tree-shaking | — | 3 h | ❌ Open |
| Publish design-token JSON (for Figma sync / multi-platform) | — | 4 h | ❌ Open |
| CSS custom-property layer for runtime theming | — | 8 h | ❌ Open |
| Create component accessibility checklist in DESIGN_SYSTEM.md | — | 2 h | ❌ Open |
| Reduce compiled CSS size from 334 KB to < 250 KB | — | 4 h | ❌ Open |

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

| Metric | Initial (03-23) | Current (03-25) | Target |
|--------|-----------------|------------------|--------|
| Compiled CSS (minified) | ~295 KB | 334 KB | < 250 KB |
| `!important` outside utilities | 13 | 13 | 0 |
| Hardcoded `rgba()` with literal colours | 42 | 42 | 0 |
| Deprecated `darken()`/`lighten()` calls | 50+ | 50+ | 0 |
| Raw `z-index` (non-variable) | 41 | ~30 | 0 |
| `@import` statements | 52 | 52 | 0 (post-migration) |
| a11y violations (axe-core) | Unknown | Unknown | 0 |
| Visual regression failures | N/A | N/A | 0 |
| Inline `style=` in reference page | 291 | 291 | < 20 |
| Reference sections with code snippets | 0 | 8 | All |
| Scroll-spy / sticky nav | Missing | ✅ Working | ✅ |
| QA issues (pixel-perfect demo) | Not audited | 14 (1 high, 5 med) | 0 |

---

## 5. Responsive Design Testing Results

Verified via Playwright at three viewports (2026-03-23):

| Viewport | Result |
|---|---|
| **1440px desktop** | All sections render correctly, no overflow, no console errors |
| **768px tablet** | Navbar collapses to hamburger, feature rows 2-col, blog grid 2-col, pricing 2-col (orphans 1 of 3 cards) |
| **375px mobile** | No horizontal overflow, hero buttons stack, single columns, h1 scales to 32px via `clamp()`, no console errors |

### Notable responsive issue: Pricing card orphan

At 768px, the 3-card pricing grid becomes 2 columns, leaving the third
card alone on a second row. Consider using
`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for more
natural flow, or explicitly switching to single column at tablet.

---

---

## 6. Architectural Improvements — Design for Continuous Refinement

### 6.1 File size management

The codebase has grown from 9,185 to 10,102 SCSS lines. Two files are
disproportionately large:

| File | Lines | Recommendation |
|------|-------|----------------|
| `_backgrounds.scss` | 1,303 | Split into `_bg-patterns.scss`, `_bg-utilities.scss`, `_bg-presets.scss` |
| `_animations.scss` | 1,053 | Split into `_entrance-animations.scss`, `_scroll-animations.scss`, `_hover-effects.scss` |
| `_hero.scss` | 588 | Acceptable — single component |
| `_forms.scss` | 597 | Acceptable — covers forms + TTS input card |

Keep individual files under **~400 lines**. When a file exceeds this,
evaluate whether it contains multiple distinct concerns.

### 6.2 Parallel button systems

The codebase currently has **three parallel button systems**:

1. **`va-btn--*`** (in `_buttons.scss`) — Generic, documented in reference
2. **`va-hero__btn--*`** (in `_hero.scss`) — Hero-specific, larger sizing
3. **`va-navbar-btn--*`** (in `_navbar.scss`) — Navbar-specific, pill shape

All three define padding, font-size, border-radius, hover states, and
transitions independently. This creates **~150 lines of duplicated logic**.

**Recommended refactor:**
```scss
// Hero buttons should extend the generic system:
.va-hero__btn--primary {
  @extend .va-btn;
  @extend .va-btn--primary;
  @extend .va-btn--lg;
  // Only hero-specific overrides below
  font-size: 1.0625rem;
  padding: 1rem 2rem;
}
```

This keeps the generic system as the single source of truth.

### 6.3 CSS custom properties strategy

Currently, design tokens exist only as Sass variables. This means:
- No runtime theming (dark mode, user preferences)
- No JavaScript access to design tokens
- No per-component overrides via CSS

**Recommended approach (phased):**

**Phase A — Expose foundation tokens as custom properties:**
```scss
:root {
  --va-color-primary: #{$va-primary-blue};
  --va-color-near-black: #{$va-near-black};
  --va-radius: #{$va-radius};
  --va-shadow: #{$va-shadow};
  --va-font-heading: #{$va-font-heading};
  --va-font-body: #{$va-font-body};
}
```

**Phase B — Components reference custom properties:**
```scss
.va-btn--primary {
  background-color: var(--va-color-near-black);
  border-radius: var(--va-radius-sm);
}
```

**Phase C — Dark mode via custom property overrides:**
```scss
@media (prefers-color-scheme: dark) {
  :root {
    --va-color-near-black: #FFFFFF;
    --va-body-bg: #1A1919;
  }
}
```

This is non-breaking — Sass variables compile the initial values, custom
properties enable runtime overrides.

### 6.4 Build pipeline improvements

Current build: `sass → dist/css/`. No linting, no testing, no optimization.

**Recommended pipeline:**
```
sass compile → stylelint → postcss (autoprefixer, cssnano) → dist/
                                                            ↓
                                           playwright visual regression
                                                            ↓
                                                    axe-core a11y
```

Add to `package.json`:
```json
"scripts": {
  "lint:css": "stylelint 'scss/**/*.scss'",
  "test:visual": "playwright test --config=tests/visual.config.ts",
  "test:a11y": "node tests/a11y-audit.mjs",
  "test": "npm run lint:css && npm run build && npm run test:visual && npm run test:a11y"
}
```

### 6.5 Versioning and changelog discipline

`CHANGELOG.md` exists but isn't updated systematically. Adopt:

1. **Semantic versioning**: `MAJOR.MINOR.PATCH`
   - MAJOR: Breaking class name changes, removed components
   - MINOR: New components, new utilities, new tokens
   - PATCH: Bug fixes, pixel adjustments, documentation
2. **Every PR** must include a CHANGELOG entry
3. Use `npm version patch/minor/major` (already configured in `package.json`)

### 6.6 Component maturity model

Rate every component on a 4-level scale:

| Level | Criteria | Action |
|-------|----------|--------|
| **Draft** | SCSS exists, basic styles | Not for production |
| **Beta** | Responsive, accessible, documented in reference | Can be used with caution |
| **Stable** | Visual regression tested, code snippets in reference, Bootstrap-aligned | Production-ready |
| **Mature** | Custom properties, dark mode, multiple variants, Figma-synced | Long-term stable |

Current assessment:

| Component | Level | Blockers to next level |
|-----------|-------|------------------------|
| Buttons (`va-btn`) | **Stable** | Needs dark mode, custom properties |
| Cards (`va-card`) | **Beta** | Missing visual regression test |
| Navbar | **Beta** | Button system overlap with `va-btn` |
| Hero | **Beta** | Button system overlap, float positioning |
| Pricing | **Beta** | Float positioning bug, no dark mode |
| Blog cards | **Beta** | Class naming inconsistency (`__tag` vs `__category`) |
| Auth forms | **Beta** | Missing code snippets in reference |
| Trust bar | **Stable** | — |
| Backgrounds | **Beta** | File too large (1303 lines), needs split |
| Animations | **Beta** | File too large (1053 lines), needs split |
| Voice Agent card | **Draft** | App-specific, not reusable |
| Video Dubbing card | **Draft** | App-specific, not reusable |

---

## 7. Continuous Refinement Process

### Weekly cadence

1. **Monday**: Run `npm run build` — check for new Sass deprecation warnings
2. **Wednesday**: Review any new QA issues against the pixel-perfect demo
3. **Friday**: Update this document's progress tracker if any issues were resolved

### Per-release checklist

```
- [ ] All CRITICAL issues resolved
- [ ] No new deprecated function calls introduced
- [ ] No new hardcoded values (colors, z-index, breakpoints)
- [ ] Component maturity levels reviewed and updated
- [ ] CHANGELOG.md updated with all changes
- [ ] Reference pages updated with code snippets for new/changed components
- [ ] Visual regression tests pass
- [ ] axe-core reports 0 violations
- [ ] Compiled CSS size tracked (target: < 250 KB minified)
```

### Quarterly review

1. Re-run the full quantitative audit (SCSS lines, CSS size, metric counts)
2. Update the metrics table in this document
3. Evaluate whether to promote components to the next maturity level
4. Re-assess the roadmap priorities based on consumer feedback
5. Review Dart Sass and Bootstrap release notes for migration needs

---

## 5. Post-Consolidation Re-evaluation (2026-03-25)

### Changes made this session

| Change | Impact |
|--------|--------|
| **Removed `app-demo.html`** (665 lines) | Eliminated duplicate landing page with outdated brand logo |
| **Removed `navbar-demo.html`** (134 lines) | Eliminated partial subset page |
| **Created `login-demo.html`** (352 lines) | Dedicated sign-in page — was missing entirely |
| **Fixed all cross-page links** | All 8 pages now interlink correctly |
| **Updated `index.html` hub** | Now links to all 8 pages (was only 3) |
| **Unified brand logo** | All pages use waveform-bars SVG (matching behance-04) |

### Updated quantitative snapshot

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| HTML pages | 9 | 8 | -1 (net: removed 2, added 1) |
| Total HTML lines | ~8,085 | ~7,285 | -800 |
| Duplicated navbar markup | ~5 copies | 4 copies | -1 copy |
| Broken/incorrect cross-page links | 12 | 0 | -12 |
| SCSS source lines | 10,733 | 10,733 | 0 (no SCSS changes) |
| Compiled CSS (expanded) | 408 KB | 408 KB | 0 |
| Compiled CSS (minified) | 340 KB | 340 KB | 0 |
| Sass deprecation warnings | 451 | 451 | 0 (unchanged) |

### Current page map

```
index.html (hub)
├── pixel-perfect-demo.html   ← Landing page demo (canonical)
│   ├── login-demo.html       ← Log in (navbar "Log in")
│   ├── signup-demo.html      ← Sign up (navbar "Sign up")
│   └── components.html       ← API reference (navbar "API")
├── backgrounds.html          ← Background/pattern reference
├── transitions-showcase.html ← Animation/interaction reference
└── asset-gallery.html        ← SVG asset gallery
```

### Areas still needing improvement

#### P0 — Critical (blocks Dart Sass 3.0 migration)

1. **451 `@import` deprecation warnings** — All 29 `@import` statements in `voice-aura.scss` and `_bootstrap.scss` must migrate to `@use`/`@forward`. This is the single largest technical debt item. Dart Sass 3.0 will remove `@import` entirely. *(Blocked by Bootstrap 5.3 using `@import` internally.)*

2. ~~**50+ deprecated `darken()`/`lighten()` calls**~~ — ✅ **DONE** (commit 43ca9ce). Migrated to `va-darken()`/`va-lighten()` wrapper functions using `color.adjust()`. 0 deprecated calls remain in VA code. Warnings reduced 451 → 343 (remaining are Bootstrap-internal).

#### P1 — High (improves maintainability)

3. **Navbar duplication across 4 pages** — `pixel-perfect-demo.html`, `signup-demo.html`, `login-demo.html`, and the pixel-perfect footer all duplicate ~50 lines of navbar HTML. A partial/include system (e.g., 11ty, simple JS includes, or Web Components) would eliminate ~150 lines of duplication.

4. ~~**`_backgrounds.scss` is 1,545 lines**~~ — ✅ **DONE** (commit 43ca9ce). Split into 27-line index + 3 sub-modules: `_bg-patterns.scss` (644), `_bg-effects.scss` (605), `_bg-presets.scss` (308).

5. ~~**`_animations.scss` is 1,314 lines**~~ — ✅ **DONE** (commit 43ca9ce). Split into 20-line index + 3 sub-modules: `_anim-core.scss` (423), `_anim-components.scss` (482), `_anim-presets.scss` (422).

6. **Monolithic CSS output (348 KB min)** — No tree-shaking. Unused Bootstrap modules (modal, tooltip, dropdown, carousel, offcanvas) ship ~34 KB of dead CSS. A PostCSS pipeline with PurgeCSS would cut this significantly.

7. ~~**No authored CSS custom properties**~~ — ✅ **DONE**. Added 38 hand-authored `--va-*` custom properties on `:root` in `_reset.scss` covering colors, typography, spacing, radius, shadows, transitions, z-index, and glass tokens. Enables runtime theming and JS access.

#### P2 — Medium (improves developer experience)

8. ~~**No linting or CI**~~ — ✅ **PARTIALLY DONE**. Added `stylelint` + `stylelint-config-standard-scss` with BEM-aware config (`.stylelintrc.json`). `npm run lint` passes with 0 errors. CI workflow and size budget enforcement still needed.

9. **Inline styles in demo pages** — `pixel-perfect-demo.html` has ~15 inline `style=` attributes (floating elements, app icon). These should use CSS classes from the design system.

10. **No dark mode support** — `prefers-color-scheme` is not handled. Dark section patterns exist (`va-bg-dark-grid`) but there's no system-wide dark theme toggle.

11. ~~**Gradient token inconsistency**~~ — ✅ **DONE**. Unified all gradient angles to 135deg across `_feature-section.scss`, `_section.scss`, and `_reference.scss` (6 instances changed from 145deg). All gradients now use 135deg matching `$va-gradient-*` tokens.

#### P3 — Low (nice-to-have)

12. **No container queries** — Components break in non-viewport contexts (e.g., CMS sidebars, iframe embeds).

13. **Limited RTL support** — Only 4 logical property instances. No `dir="rtl"` testing.

14. **Button shape pattern undocumented** — Pill vs. rounded-rect button distinction is intentional but not explained in the reference guide (see audit findings).

### Recommended next actions (priority order)

1. ~~**Replace `darken()`/`lighten()` → `color.adjust()`**~~ — ✅ DONE
2. ~~**Split `_backgrounds.scss` and `_animations.scss`**~~ — ✅ DONE
3. ~~**Author CSS custom properties**~~ — ✅ DONE (38 tokens on `:root`)
4. ~~**Add stylelint**~~ — ✅ DONE (0 errors, BEM-aware config)
5. ~~**Fix gradient angle inconsistency**~~ — ✅ DONE (unified to 135deg)
6. **Migrate `@import` → `@use`/`@forward`** — Blocked by Bootstrap 5.3 internals
7. **Add PostCSS pipeline** (autoprefixer + cssnano + PurgeCSS) — Reduces CSS size by ~40%
8. **Add CI workflow** (GitHub Actions: lint + build + size budget) — Prevents regression
9. **Extract navbar into a reusable include** — Reduces HTML duplication
10. **Move inline styles to CSS classes** — Improves demo page maintainability

---

*This document is a living artefact. Update it as issues are resolved and
new concerns surface. Track progress by checking items off in each phase
of the roadmap.*
