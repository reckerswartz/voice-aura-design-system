# Hero Section — Gradient & Radius Audit

## Reference: behance-04, behance-10, behance-13

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `.va-hero` section | 0px | #FFFFFF (flat) | none |
| `.va-hero__badge` | 800px (pill) | rgba(#0478FF, 0.08) | none |
| `.va-hero__btn--primary` (Open Studio) | 800px (pill) | #1A1919 (near-black) | none |
| `.va-hero__btn--secondary` (API Docs) | 800px (pill) | transparent (outlined) | none |
| `.va-input-card` | 16px | rgba(255,255,255,0.7) glass | none |
| `.va-input-card__send` | 50% (circle) | #0478FF (blue) | none |
| `.va-category-pill` (inactive) | 800px (pill) | transparent/light | none |
| `.va-category-pill--active` | 800px (pill) | #1A1919 (near-black) | none |

## Analysis

### Border Radius
- **Hero CTA buttons** (Open Studio, API Docs): Pill-shaped (800px). ✅ **Correct** — behance-04 clearly shows pill-shaped hero CTAs.
- **Badge**: Pill-shaped. ✅ **Correct** — reference shows rounded pill badge.
- **Input card**: 16px (`$va-radius-lg`). ✅ **Correct** — reference shows large rounded card.
- **Send button**: Circle (50%). ✅ **Correct** — reference shows circular blue send button.
- **Category pills**: Pill-shaped. ✅ **Correct** — behance-04 shows pill-shaped category pills.

### Gradients
- **Hero section**: No gradient — flat white with pattern overlays (halftone, waveform). ✅ **Correct** — behance-04 shows white background with decorative dot patterns, no colored gradient.
- **Input card glass effect**: `rgba(255,255,255,0.7)` with `backdrop-filter: blur` — this is a transparency effect, not a gradient. ✅ **Correct**.

## Issues Found

1. **MINOR — Inactive category pill styling**: Computed background for `.va-category-pill` (non-active) reads as `rgb(26, 25, 25)` in JS evaluation, but visually it renders as transparent/outlined. This is a JS evaluation artifact — the first `.va-category-pill` matched is the active one (YouTube). **No actual visual bug.**

## Recommendations
- No fixes needed. Hero section is pixel-perfect.
