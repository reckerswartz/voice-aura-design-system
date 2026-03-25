# Footer — Gradient & Radius Audit

## Reference: behance-10 (bottom right)

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `.va-footer` | 0px | #1A1919 (near-black) | none |
| `.va-footer__bottom` | 0px | transparent | none |
| `.va-footer__brand-link` | 0px | transparent | none |
| `.va-footer__link` items | 0px | transparent | none |
| `.va-footer__bottom-link` items | 0px | transparent | none |

## Analysis

### Border Radius
- **Footer container**: 0px. ✅ **Correct** — full-width dark footer, no rounding.
- **All links and elements**: 0px. ✅ **Correct** — footer uses text links with hover transitions, no button-shaped elements that would need radius.

### Gradients
- **Footer background**: Flat `#1A1919` (near-black). ✅ **Correct** — behance-10 shows solid dark footer, no gradient.
- **No decorative gradients**: The footer is purely typographic with link columns. ✅ **Correct**.

## Issues Found
- **None**. Footer is pixel-perfect for gradients and radii.

## Recommendations
- No changes needed.
