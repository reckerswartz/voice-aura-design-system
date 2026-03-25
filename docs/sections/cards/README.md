# Cards (`_cards.scss`)

> Component · 220 lines · `scss/components/_cards.scss`

## Overview

Generic card component using delta-only pattern. Extends Bootstrap's `.card` and adds VA-specific padding, overflow handling, hover lift effect, and dark variant.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-card` | Base — `@extend .card`, 2 deltas (padding, overflow:hidden) |
| `.va-card--hover` | Hover lift + shadow transition |
| `.va-card--dark` | Dark background variant |
| `.va-card--bordered` | Emphasized border |
| `.va-card--flat` | No shadow, no border |
| `.va-card__header` | Card header region |
| `.va-card__body` | Card body content |
| `.va-card__footer` | Card footer region |
| `.va-card__title` | Card title (inherits heading font) |
| `.va-card__subtitle` | Card subtitle |
| `.va-card__text` | Card body text |
| `.va-card__image` | Responsive card image |

## Issues

### I-1. 5 `@extend` usages (Medium)
Extends `.card`, `.card-header`, `.card-body`, `.card-footer`, `.card-title`. Contributes to selector bloat in compiled CSS.

### I-2. No `var(--va-*)` consumption (Medium)
0 custom property references. Uses Sass variables only.

### I-3. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents 2 delta properties (padding, overflow:hidden).

### I-4. No `:focus-visible` for interactive card variants (Low)
`.va-card--hover` has hover styles but no focus indicator if the card itself is a link/button.

## Improvements Made

- ✅ Delta-only refactor — reduced to 2 declarations (commit `a1a82bc`)
- ✅ BOOTSTRAP ALIGNMENT documented
- ✅ Hover lift with `va-card-hover-lift` mixin
- ✅ Dark variant for dark sections

## Reference Guide Status

- **components.html**: ✅ Has `#cards` section with rendered demos
- **Code snippets**: ✅ Has copyable code block
- **Coverage**: Good — shows base, hover, dark, bordered variants

## Maturity: **Stable**

Clean delta-only pattern. Promote to Mature with `var(--va-*)` consumption.
