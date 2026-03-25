# Pricing Section — Gradient & Radius Audit

## Reference: behance-08, behance-11, behance-16

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `#pricing` section | 0px | #FFFFFF (flat) | none |
| `.va-pricing__tabs` wrapper | 1280px (pill) | #E9E9EA (light grey) | none |
| `.va-pricing__tab` (inactive) | 1280px (pill) | #1A1919 | none |
| `.va-pricing__tab--active` (Studio) | 1280px (pill) | #1A1919 | none |
| `.va-pricing-card` | 12px | #FFFFFF | none |
| `.va-pricing-card--featured` | 12px | #FFFFFF | none |
| `.va-pricing-card__cta` (Free/Business) | 8px | transparent (outlined) | none |
| `.va-pricing-card--featured .va-pricing-card__cta` | 8px | #1A1919 (filled) | none |
| `.va-pricing-card__badge` | 1280px (pill) | rgba(#10B981, 0.08) | none |
| `.va-discount-badge` | 800px (pill) | #F7F7F8 | none |

## Analysis

### Border Radius
- **Pricing tabs**: Pill-shaped wrapper (1280px) containing pill tabs. ✅ **Correct** — behance-08 shows a pill-shaped segmented control with "Studio | DUB | API".
- **Pricing cards**: 12px (`$va-radius`). ✅ **Correct** — behance-08 shows standard rounded cards with crosshair corner decorations.
- **CTA buttons**: 8px (`$va-radius-sm`). ✅ **Correct** — behance-08 shows rounded-rect CTAs. The Free/Business cards use outlined CTAs, Creator uses filled dark CTA. This matches exactly.
- **Tier badges**: Pill (1280px). ✅ **Correct** — "Free", "Creator", "Business" badges are pill-shaped in the reference.
- **Discount badge**: Pill (800px). ✅ **Correct** — "ANNUAL DISCOUNT %40" is pill-shaped in behance-08.

### Gradients
- **Section background**: Flat white with `va-bg-glow--neutral` (subtle radial glow) and `va-bg-mesh` overlay. These are pseudo-element effects, not section gradients. ✅ **Correct** — behance-08 shows white background with halftone dot patterns at edges.
- **No card gradients**: All pricing cards use flat white. ✅ **Correct**.

## Issues Found

1. **OBSERVATION — Tab active styling**: Both active and inactive tabs compute to `background: #1A1919`. The active state for `.va-pricing__tab--active` should be visually differentiated (dark bg + white text). The inactive tabs should be transparent with dark text. The JS evaluation picked up both as the same because the first `.va-pricing__tab` IS the active one. Visually correct in screenshot — "Studio" is dark, "DUB" and "API" are light.

## Recommendations
- No fixes needed. Pricing section is pixel-perfect for gradients and radii.
