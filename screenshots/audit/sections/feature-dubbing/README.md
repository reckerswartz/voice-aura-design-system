# Feature Dubbing Section — Gradient & Radius Audit

## Reference: behance-10 (right column), behance-15 (top)

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `#features-dubbing` section | 0px | #F7F7F8 (alt bg) | none |
| `.va-btn--primary` (Try Dubbing) | 8px | #1A1919 (near-black) | none |
| `.va-feature-visual--dark` | 16px | — | `linear-gradient(145deg, #1A1919, #000)` |
| `.va-dubbing-card` | 12px | #1A1919 | none |
| `.va-dubbing-card__lang` (inactive) | 800px (pill) | rgba(255,255,255,0.15) | none |
| `.va-dubbing-card__lang--active` | 800px (pill) | rgba(255,255,255,0.15) | none |
| `.va-dubbing-card__control-btn--cc` | 2px | transparent | none |
| `.va-link-arrow` (Learn more) | 0px | transparent | none |

## Analysis

### Border Radius
- **"Try Dubbing" button**: 8px. ✅ **Correct** — consistent with the feature-section CTA pattern (rounded rect, not pill).
- **Dark panel**: 16px. ✅ **Correct** — same as feature-api panel.
- **Dubbing card**: 12px (`$va-radius`). ✅ **Correct** — standard card radius.
- **Language pills**: Pill (800px). ✅ **Correct** — matches reference tab pills.
- **CC button**: 2px. ✅ **Correct** — tiny radius for the captions toggle.

### Gradients
- **Section background**: Flat `#F7F7F8` (`va-section-alt`). ✅ **Correct** — reference shows this as the alternate-colored section with a light grey background. No gradient needed.
- **Dark panel**: Same `linear-gradient(145deg, #1A1919, #000)` as feature-api. ✅ **Correct** and **consistent**.
- **Pattern overlays**: `va-pattern-noise` + `va-pattern-rings--small` add texture. These are pseudo-element patterns, not gradients. ✅ **Correct**.

## Issues Found

1. **MINOR — Active lang pill not visually differentiated enough**: Both active and inactive dubbing lang pills compute to `rgba(255,255,255,0.15)`. The active state differentiation comes from text color/weight, but the background is identical. In the reference (behance-10), the active "English" tab appears slightly more prominent. This may need a brighter active background or underline.

## Recommendations
- Consider adding `background: rgba(255,255,255,0.25)` or a bottom border for `.va-dubbing-card__lang--active` to improve visual distinction.
