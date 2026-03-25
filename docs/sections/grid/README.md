# Grid (`_grid.scss`)

> Layout · 292 lines · `scss/layout/_grid.scss`

## Overview

Custom grid system built on CSS Grid. Provides auto-fit responsive grids with configurable min column width via `--va-grid-min` custom property. Also includes flex-based layout utilities and gap helpers on the VA 8px grid.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-grid` | CSS Grid container with `auto-fit` and `minmax()` |
| `.va-grid--2col` / `--3col` / `--4col` | Fixed column count variants |
| `.va-flex-center` | Flex centre utility |
| `.va-gap-1` – `.va-gap-8` | Gap utilities (8px increments) |
| `.va-mt-1` – `.va-mt-8` | Margin-top utilities (8px increments) |
| `.va-container` | Max-width container |

## Issues

### I-1. `var(--va-grid-min)` consumed — good (Good)
Line 129: `minmax(var(--va-grid-min, 280px), 1fr)` — one of the few components consuming a custom property. Per-instance grid column minimum is configurable.

### I-2. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents relationship to Bootstrap's grid system.

### I-3. No `@extend` usages (Good)
Fully standalone — no Bootstrap class extensions.

### I-4. VA spacing utilities overlap with Bootstrap (Low)
`.va-mt-4` etc. exist alongside Bootstrap's `.mt-4`. The VA versions use the 8px grid; Bootstrap uses its own spacing scale. This is intentional but could confuse consumers.

## Improvements Made

- ✅ CSS Grid with `auto-fit` for intrinsic responsiveness
- ✅ Custom property `--va-grid-min` for per-instance configuration
- ✅ BOOTSTRAP ALIGNMENT documented

## Reference Guide Status

- **components.html**: ❌ No `#grid` section
- **Code snippets**: ❌ No grid demos or code blocks
- **Missing**: Grid system reference with all variants, gap utilities demo

## Maturity: **Beta**

Blockers to Stable: no reference page documentation, overlap with Bootstrap grid not clearly explained.
