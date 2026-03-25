# Trust Bar (`_trust-bar.scss`)

> Component · 164 lines · `scss/components/_trust-bar.scss`

## Overview

Logo bar showing partner/client logos ("The solution of choice for 300+ Forbes 2000 companies"). Grayscale logos transition to full color on hover. Includes separator variant, dark mode, and responsive handling.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-trust-bar` | Wrapper — centred flex, gap |
| `.va-trust-bar__text` | "The solution of choice…" copy |
| `.va-trust-bar__logos` | Logo grid container |
| `.va-trust-bar__logo` | Individual logo (grayscale → color hover) |
| `.va-trust-bar--separator` | Adds top border separator |
| `.va-trust-bar--dark` | Inverted colors for dark sections |

## Issues

### I-1. No `var(--va-*)` consumption (Low)
0 custom property references. 1 brand color ref. Minimal coupling.

### I-2. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documented.

### I-3. No `@extend` — fully standalone (Good)
0 extends. No selector bloat contribution.

## Improvements Made

- ✅ Grayscale → full color hover transition (commit `15c7526`)
- ✅ Dark mode variant for dark sections
- ✅ Responsive via 3 `va-media-down` rules — adjusts grid at md, sm
- ✅ Separator variant for visual separation from hero

## Reference Guide Status

- **components.html**: ✅ Has `#client-logos` section (18 references)
- **Code snippets**: ⚠️ Partial — shows logos but not separator/dark variants
- **Missing**: Dark variant demo, separator variant demo

## Maturity: **Stable**

Clean, well-isolated component. No critical issues.
