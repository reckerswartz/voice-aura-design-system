# Navbar — Gradient & Radius Audit

## Reference: behance-04, behance-08, behance-10

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `.va-navbar` | 0px | #FFFFFF (flat) | none |
| `.va-navbar-btn--outlined` (Log in) | 800px (pill) | transparent | none |
| `.va-navbar-btn--filled` (Sign up) | 800px (pill) | #1A1919 (near-black) | none |

## Analysis

### Border Radius
- **Log in / Sign up buttons**: Pill-shaped (800px). ✅ **Correct** — matches behance-04 and behance-08 exactly. Reference shows pill-shaped nav buttons with arrow icons.
- **Navbar itself**: 0px. ✅ **Correct** — full-width bar, no rounding needed.

### Gradients
- **None used**. ✅ **Correct** — reference shows flat white navbar, no gradients. The scrolled state adds `backdrop-filter: blur(12px)` with semi-transparent bg, not a gradient.

## Issues Found
- **None**. Navbar is pixel-perfect for gradients and radii.

## Recommendations
- No changes needed for the navbar section.
