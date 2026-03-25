# Badges (`_badges.scss`)

> Component · 275 lines · `scss/components/_badges.scss`

## Overview

Badge/tag components for labels, status indicators, and category markers. Uses delta-only pattern with 1 `@extend` usage. Includes color variants, size variants, and pill shapes.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-badge` | Base — `@extend .badge` with VA deltas |
| `.va-badge--primary` | Blue filled |
| `.va-badge--dark` | Dark filled |
| `.va-badge--light` | Light grey filled |
| `.va-badge--outline` | Bordered, transparent bg |
| `.va-badge--success/--warning/--danger` | Semantic color variants |
| `.va-badge--sm` / `--lg` | Size variants |
| `.va-badge--pill` | Pill-shaped border-radius |
| `.va-badge--dot` | Small dot indicator |

## Issues

### I-1. No `var(--va-*)` consumption (Low)
0 custom property references. 3 brand color refs. Minimal coupling.

### I-2. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents delta properties — mostly intentional deltas.

### I-3. 1 `@extend` usage — minimal (Good)
Only extends `.badge`. Low selector bloat contribution.

## Improvements Made

- ✅ BOOTSTRAP ALIGNMENT documented
- ✅ Comprehensive variants (color, size, shape)
- ✅ Semantic color variants using `$va-success`, `$va-warning`, `$va-danger`

## Reference Guide Status

- **components.html**: ✅ Has `#badges` section with all variants
- **Code snippets**: ✅ Has copyable code block
- **Coverage**: Good — shows all color and size variants

## Maturity: **Stable**

Well-documented, minimal coupling. Clean component.
