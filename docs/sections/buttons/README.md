# Buttons (`_buttons.scss`)

> Component · 388 lines · `scss/components/_buttons.scss`

## Overview

Primary button system for the design system. Uses delta-only pattern — `@extend .btn` from Bootstrap and declares only differing properties. Six variants: primary (dark), accent (blue), secondary (outline), ghost (text), link, and sizes (sm, lg).

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-btn` | Base — `@extend .btn`, inline-flex, 15px font, 1.4 lh |
| `.va-btn--primary` | Dark filled (`@extend .btn-dark`, white text) |
| `.va-btn--accent` | Blue filled (`@extend .btn-primary`, white text) |
| `.va-btn--secondary` | Outlined (`@extend .btn-outline-secondary`) |
| `.va-btn--ghost` | Text-only / transparent |
| `.va-btn--link` | Underline-on-hover link style |
| `.va-btn--sm` / `--lg` | Size variants |
| `.va-btn--pill` | Pill-shaped (border-radius-pill) |
| `.va-btn--icon` | Square icon-only button |

## Issues

### I-1. 10 `@extend` usages — highest of any component (High)
Creates 8-selector `.btn` rule in compiled CSS. Each variant extends Bootstrap button classes. This is architecturally correct for the delta-only pattern but produces selector bloat.

**Mitigation:** Accept for now; migrate to mixins when `@use` migration happens.

### I-2. No `var(--va-*)` consumption (Medium)
0 custom property references. 11 brand color refs (`$va-primary-blue`, `$va-near-black`, `$va-white`). All compile-time.

### I-3. Text color regression risk documented (Info)
`.va-btn` sets `color: $va-near-black` which overrides inherited white text from `@extend .btn-dark`. Primary/accent variants explicitly set `color: $va-white` to fix this. Documented in BOOTSTRAP ALIGNMENT comment.

### I-4. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Comprehensive — documents 5 delta properties and the color override requirement.

## Improvements Made

- ✅ Delta-only refactor — reduced from ~30 to ~15 declarations (commit `a1a82bc`)
- ✅ Text color regression fixed — explicit `color: $va-white` on dark variants (commit `d750581`)
- ✅ BOOTSTRAP ALIGNMENT comment documenting the override requirement
- ✅ Hover lift effect (`translateY(-1px)` + shadow) on primary/accent
- ✅ Focus-visible on 2 elements

## Reference Guide Status

- **components.html**: ✅ Has `#buttons` section with all variants
- **Code snippets**: ✅ Has copyable code block
- **Coverage**: Good — shows primary, accent, secondary, ghost, sizes

## Maturity: **Stable**

Well-documented, delta-only, responsive. Promote to Mature when `var(--va-*)` consumption is added.
