# Pricing (`_pricing.scss`)

> Component · 418 lines · `scss/components/_pricing.scss`

## Overview

Three-tier pricing card layout with tab switcher (Studio / DUB / API), tier badges, feature lists with checkmark icons, and CTA buttons. Featured card has elevated shadow and scale. Mobile: horizontal scroll carousel with snap.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-pricing` | Section wrapper |
| `.va-pricing__header` | Centred title + subtitle |
| `.va-pricing__tabs` | Pill-shaped tab switcher |
| `.va-pricing__tab` | Individual tab |
| `.va-pricing__tab--active` | Active tab state |
| `.va-pricing__grid` | 3-column card grid |
| `.va-pricing-card` | Individual pricing tier |
| `.va-pricing-card--featured` | Elevated card (scale 1.02, shadow-lg) |
| `.va-pricing-card__tier` | Tier badge (Free / Creator / Business) |
| `.va-pricing-card__tier--free/--creator/--business` | Color variants |
| `.va-pricing-card__price` | Price display |
| `.va-pricing-card__desc` | Tier description |
| `.va-pricing-card__cta` | CTA button (`@extend .btn`) |
| `.va-pricing-card__features` | Feature list |
| `.va-pricing-card__feature` | Individual feature with checkmark |

## Issues

### I-1. No `var(--va-*)` consumption (Medium)
0 custom property references. 16 brand color refs (`$va-primary-blue`, `$va-near-black`). Runtime theming impossible.

### I-2. No `:focus-visible` on pricing card CTA (High — a11y)
`.va-pricing-card__cta` has `@extend .btn` (which provides Bootstrap's focus ring) but the pricing tabs (`.va-pricing__tab`) have **no `:focus-visible`** styles. Keyboard users can't see which tab is focused.

### I-3. 2 `@extend` usages (Low)
`.va-pricing-card__cta` extends `.btn` — acceptable for the delta-only pattern. Contributes to the `.btn` selector group (8 selectors).

### I-4. No dark mode variant (Medium)
Dark section patterns exist (`va-bg-dark-grid`) but pricing cards have no dark-background variant for colors, borders, or text.

### I-5. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents equivalence between `.va-pricing-card__cta` and `.btn`.

## Improvements Made

- ✅ Featured card: `box-shadow: $va-shadow-lg` + `transform: scale(1.02)` (commit `15c7526`)
- ✅ Tier badge color variants (--free green, --creator blue, --business blue) (commit `c993707`)
- ✅ Mobile horizontal scroll carousel with snap
- ✅ Responsive via `va-media-down("md")`
- ✅ Floating decorative icons with `va-hero__float`
- ✅ Discount badge positioned above title

## Reference Guide Status

- **components.html**: ✅ Has `#pricing` section with rendered demo
- **Code snippets**: ✅ Has copyable code block
- **Missing**: Tab switching JS demo, dark variant

## Maturity: **Beta**

Blockers to Stable: no `:focus-visible` on tabs, no `var(--va-*)`, no dark variant.
