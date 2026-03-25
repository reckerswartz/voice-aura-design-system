# Animations (`_animations.scss` → 3 sub-modules)

> Component · 20-line index + 569 + 482 + 422 = **1,493 lines** total
> `scss/components/_anim-core.scss`, `_anim-components.scss`, `_anim-presets.scss`

## Overview

Animation system with entrance effects, scroll-reveal, hover interactions, responsive transitions, and preset compositions. 14 `@keyframes` definitions and 181 transition declarations system-wide. Split from a 1,314-line monolith (commit `43ca9ce`).

## Sub-modules

| File | Lines | Purpose |
|------|-------|---------|
| `_anim-core.scss` | 569 | Entrance animations, responsive stack/order, `prefers-reduced-motion` |
| `_anim-components.scss` | 482 | Component-specific animations (cards, buttons, navbar scroll) |
| `_anim-presets.scss` | 422 | Composable animation presets, scroll-reveal, pattern animations |

## Key Classes

| Class | Category | Purpose |
|-------|----------|---------|
| `.va-entrance-fade-up/--in/--left/--right` | Entrance | Fade + translate entrance |
| `.va-entrance-scale-in` | Entrance | Scale-up entrance |
| `.va-scroll-fade-left/--right` | Scroll | Scroll-triggered directional fades |
| `.va-reveal` | Scroll | IntersectionObserver scroll-reveal system |
| `.va-hover-lift` | Hover | translateY(-4px) + shadow |
| `.va-responsive-stack` | Responsive | Smooth flex-row → flex-column transition |
| `.va-responsive-order` | Responsive | Reorder children on mobile |
| `.va-hero-secondary-adapt` | Responsive | Secondary CTA → text-link on mobile |

## Issues

### I-1. No `var(--va-*)` foundation token consumption (Medium)
`_anim-presets.scss` uses `--va-pattern-opacity` (component-internal), but no foundation tokens are consumed.

### I-2. `prefers-reduced-motion` handled — good (Good)
4 checks in `_anim-core.scss`. All entrance and scroll animations are disabled when reduced motion is preferred.

### I-3. No BOOTSTRAP ALIGNMENT block needed (Info)
Animations are fully custom — no Bootstrap equivalents exist.

### I-4. Second largest component group (Medium)
1,493 combined lines. Well-organized after split. Each sub-module is focused.

## Improvements Made

- ✅ Split from 1,314-line monolith (commit `43ca9ce`)
- ✅ `prefers-reduced-motion` support (4 checks)
- ✅ Responsive transition utilities (stack, order, hero-adapt)
- ✅ IntersectionObserver-based scroll-reveal system

## Reference Guide Status

- **transitions-showcase.html**: ✅ Dedicated page with 13 sections
- **interactions-demo.html**: ✅ Dedicated interactive demo page
- **backgrounds.html**: ✅ Entrance and scroll sections
- **Coverage**: Good — most animations demonstrated across 3 pages

## Maturity: **Beta**

Blockers to Stable: visual regression baselines needed, no foundation token consumption.
