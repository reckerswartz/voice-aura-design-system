# Backgrounds (`_backgrounds.scss` → 3 sub-modules)

> Component · 26-line index + 878 + 605 + 324 = **1,833 lines** total
> `scss/components/_bg-patterns.scss`, `_bg-effects.scss`, `_bg-presets.scss`

## Overview

23+ background utility classes for decorative patterns, gradient effects, glass morphism, and section presets. Split from a monolithic 1,545-line file into 3 focused sub-modules (commit `43ca9ce`).

## Sub-modules

| File | Lines | Purpose |
|------|-------|---------|
| `_bg-patterns.scss` | 878 | Halftone dots, voice ripple, spotlight, grid, mesh, circuit |
| `_bg-effects.scss` | 605 | Glass morphism, gradient blends, watermark, dark grid |
| `_bg-presets.scss` | 324 | Composable section presets (hero, features, pricing, blog, signup) |

## Key Classes

| Class | Category | Purpose |
|-------|----------|---------|
| `.va-pattern-halftone` | Pattern | Halftone dot overlay (+--dense, --band, --dark) |
| `.va-pattern-voice-ripple` | Pattern | Organic sound rings (+--left, --right, --small) |
| `.va-bg-spotlight` | Pattern | Directional ambient light (+--top-right, --center) |
| `.va-bg-glass` | Effect | Frosted glass (`backdrop-filter: blur`) |
| `.va-section-blend--top/--bottom` | Effect | Gradient edge fades |
| `.va-bg-brand-watermark` | Effect | Brand text watermark |
| `.va-bg-dark-grid` | Effect | Dark overlay grid |
| `.va-bg-showcase` | Effect | Signup showcase panel |
| `.va-bg-preset--hero` | Preset | Composable hero background |
| `.va-bg-preset--features-dark` | Preset | Dark feature section background |

## Issues

### I-1. 26 hardcoded SVG `url()` paths (High)
All in `_bg-patterns.scss` (14) and `_bg-presets.scss` (12). `$va-asset-base-path` is defined in `_variables.scss` but **never used** — all paths are hardcoded as `url("../../assets/patterns/...")`.

**Fix:** Replace all 26 occurrences with `url("#{$va-asset-base-path}/patterns/...")`.

### I-2. Largest component in the system (Medium)
Combined 1,833 lines across 3 files. Well-organized after the split, but each sub-module is still large. Consider extracting pattern-data classes into their own module.

### I-3. `var(--va-pattern-opacity)` used extensively — good (Good)
28 references to `--va-pattern-opacity` and 4 to `--va-ring-size`. These are component-internal custom properties that allow per-instance control. However, **no foundation tokens** (`--va-color-*`, `--va-radius`, etc.) are consumed.

### I-4. 3 `@extend` usages (Low)
In `_bg-effects.scss` (2) and `_bg-presets.scss` (1). Minimal impact.

## Improvements Made

- ✅ Split from 1,545-line monolith into 3 sub-modules (commit `43ca9ce`)
- ✅ Gradient angles unified to 135deg (commit `d6eceeb`)
- ✅ Component-internal custom properties (`--va-pattern-opacity`, `--va-ring-size`)
- ✅ 16 SVG pattern assets in `assets/patterns/`

## Reference Guide Status

- **backgrounds.html**: ✅ Dedicated reference page with 20+ sections
- **Code snippets**: ✅ Interactive demos with scroll-spy navigation
- **Custom property docs**: ✅ Has `#custom-props` section
- **Coverage**: Good — most patterns demonstrated

## Maturity: **Beta**

Blockers to Stable: hardcoded asset paths, no foundation token consumption, visual regression baselines needed.
