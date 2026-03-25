# Feature API Section — Gradient & Radius Audit

## Reference: behance-05, behance-10

## Computed Styles

| Element | border-radius | background | gradient |
|---------|--------------|------------|----------|
| `#features-api` section | 0px | #FFFFFF (flat) | none (section bg) |
| `.va-btn--primary` (Get API Key) | 8px | #1A1919 (near-black) | none |
| `.va-feature-visual--light` | 16px | — | `linear-gradient(145deg, #F7F7F8, #ECECEE)` |
| `.va-feature-visual--dark` | 16px | — | `linear-gradient(145deg, #1A1919, #000)` |
| App icon container (inline) | 24px | #FFFFFF | none |
| `.va-agent-card` | 12px | #1A1919 | none |
| `.va-agent-card__cta` (Call Wang lu) | 8px | rgba(255,255,255,0.12) | none |
| `.va-agent-card__lang` (pill) | 800px (pill) | rgba(255,255,255,0.15) | none |
| `.va-link-arrow` (Learn more) | 0px | transparent | none |

## Analysis

### Border Radius
- **"Get API Key" button**: 8px (`$va-radius-sm` = `$btn-border-radius`). ✅ **Correct** — behance-10 shows a compact rounded-rect button with icon, NOT a pill. This is the standard `.va-btn--primary--sm` pattern.
- **Feature visual panels**: 16px (`$va-radius-lg`). ✅ **Correct** — behance-05 shows large rounded panels.
- **App icon container**: 24px (inline style `border-radius: 24px`). ✅ **Correct** — behance-05 shows a squircle app icon.
- **Agent card**: 12px (`$va-radius` / `$border-radius`). ✅ **Correct** — inner card within dark panel.
- **Agent CTA**: 8px. ✅ **Correct** — small rounded button inside card context.
- **Language pills**: Pill (800px). ✅ **Correct** — small rounded tab pills.

### Gradients
- **Light panel**: `linear-gradient(145deg, #F7F7F8 0%, #ECECEE 100%)`. ✅ **Correct** — subtle warm-to-cool gradient gives depth. Matches the reference's light panel appearance.
- **Dark panel**: `linear-gradient(145deg, #1A1919 0%, #000 100%)`. ✅ **Correct** — subtle dark gradient. Reference shows near-black panel with crosshair decorations.
- **Section background**: White with `va-bg-glow` (radial glow) and `va-pattern-circuit` overlay. These are pseudo-element patterns, not section gradients. ✅ **Correct**.

## Issues Found

1. **OBSERVATION — Button shape inconsistency is INTENTIONAL**: Hero buttons use pill (800px), feature CTA uses 8px rounded rect. This is a deliberate design pattern:
   - **Pill** = navigation-level / hero prominence CTAs (navbar, hero, blog action)
   - **Rounded rect (8px)** = content-level / section CTAs (feature rows, pricing, cards)
   - **Not a bug**, but this pattern is **NOT documented** in the reference guide.

2. **MINOR — Inline style for app icon**: The app icon uses `style="border-radius: 24px"` as inline HTML rather than a dedicated CSS class. This is fine for a one-off element but inconsistent with the design system approach.

## Recommendations
- **Document the pill vs. rounded-rect button pattern** in the reference guide (components.html, DESIGN_SYSTEM.md).
- Consider adding a `.va-app-icon` class with `border-radius: $va-radius-xl` to replace the inline style.
