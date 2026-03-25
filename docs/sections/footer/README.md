# Footer (`_footer.scss`)

> Layout section · 294 lines · `scss/layout/_footer.scss`

## Overview

Dark full-width footer with brand logo, tagline, 3 link columns, and a bottom bar with copyright + legal links. Uses `$va-near-black` background with white/muted text.

## Classes

| Class | Purpose |
|-------|---------|
| `.va-footer` | Wrapper — dark bg, white text |
| `.va-footer__inner` | Max-width container |
| `.va-footer__top` | Grid layout: brand + 3 link columns |
| `.va-footer__brand` | Logo + tagline group |
| `.va-footer__brand-link` | Clickable logo with hover opacity |
| `.va-footer__brand-logo` | Logo icon (32×32) |
| `.va-footer__brand-text` | "VOICE AURA" text |
| `.va-footer__tagline` | Tagline paragraph |
| `.va-footer__col` | Link column |
| `.va-footer__heading` / `__col-title` | Column heading (16px, uppercase) |
| `.va-footer__list` | Link list (unstyled) |
| `.va-footer__link` | Individual link (white 55% opacity → 100% hover) |
| `.va-footer__bottom` | Bottom bar with border-top |
| `.va-footer__copyright` | Copyright text |
| `.va-footer__legal` | Legal links row |
| `.va-footer__legal-link` | Privacy / Terms links |

## Issues

### I-1. No BOOTSTRAP ALIGNMENT comment block (Medium)
Required by project rules but missing. Footer has no Bootstrap class equivalences to document (it's fully custom), but should state this explicitly.

### I-2. No `var(--va-*)` consumption (Medium)
0 custom property references. Background (`$va-near-black`), text colors, and link colors are all compile-time. Dark mode or theme switching would require editing this file.

### I-3. Brand coupling — 8 direct `$va-near-black`/`$va-primary-blue` refs (Low)
Mostly background-color and hover states. Relatively contained.

### I-4. Focus-visible coverage adequate (Info)
2 `:focus-visible` declarations covering brand link and footer links. Adequate for the interactive elements present.

### I-5. Footer heading font-size fixed (Info)
Was 14px (`$_font-size-sm`), increased to `1rem` (16px) to match Behance reference (commit `9b02e58`). This is now correct.

## Improvements Made

- ✅ Column heading font-size fixed to 16px (commit `9b02e58`)
- ✅ Focus-visible on interactive elements
- ✅ Responsive via `va-media-down("md")` — stacks to single column
- ✅ Uses `$va-grid-unit` tokens throughout
- ✅ Print styles hide decorative elements via `_reset.scss`

## Reference Guide Status

- **components.html**: ✅ Has `#footer` section
- **Code snippets**: ❌ No copyable code block for footer markup
- **Missing**: Code snippet with full footer HTML structure

## Maturity: **Stable**

No critical blockers. Would benefit from `var(--va-*)` consumption for dark mode flexibility and a code snippet in the reference.
