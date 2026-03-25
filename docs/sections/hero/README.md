# Hero (`_hero.scss`)

> Layout section · 588 lines · `scss/layout/_hero.scss`

## Overview

Large hero banner for landing and product pages. Centred headline, supporting copy, dual CTA buttons, and the signature TTS input card with decorative sound-wave and halftone-dot motifs. Fluid typography via `clamp()`.

## Classes

| Class | Purpose |
|-------|---------|
| `.va-hero` | Wrapper — centred flex column, overflow hidden |
| `.va-hero--compact` | Reduced padding variant |
| `.va-hero__badge` | Top pill ("DON'T SPEAK JUST TYPE") |
| `.va-hero__title` | H1 — fluid `clamp(2.5rem, 5vw + 1rem, 4.5rem)` |
| `.va-hero__subtitle` | Supporting paragraph (18px, max-width 640px) |
| `.va-hero__actions` | CTA button row |
| `.va-hero__btn--primary` | Dark filled pill CTA |
| `.va-hero__btn--secondary` | Outlined pill CTA |
| `.va-hero__input-card` | TTS demo card (tabs, textarea, pills) |
| `.va-hero__input-card-tabs` | Tab bar inside input card |
| `.va-hero__input-card-tab` | Individual tab |
| `.va-hero__input-card-textarea` | Textarea with focus ring |
| `.va-hero__input-card-pills` | Category pill row |
| `.va-hero__input-card-pill` | Individual category pill |
| `.va-hero__input-card-footer` | Footer with char count + Generate button |
| `.va-hero__float` | Absolutely-positioned floating icon |
| `.va-hero__float--left/--right/--sm/--letter` | Position and size variants |

## Issues

### I-1. Parallel button system (High)
`va-hero__btn--primary` and `va-hero__btn--secondary` duplicate ~60 lines of button logic already in `_buttons.scss`. They define their own font-family, font-size, font-weight, padding, border-radius, cursor, transition — all identical to `va-btn` equivalents.

**Fix:** `@extend .va-btn, .va-btn--primary` + hero-specific size overrides only.

### I-2. No BOOTSTRAP ALIGNMENT comment block (Medium)
Required by project rules. Hero buttons should document equivalence to `.btn .btn-dark .rounded-pill`.

### I-3. No `var(--va-*)` consumption (Medium)
0 custom property references. All 30 brand color refs (`$va-primary-blue`, `$va-near-black`) are compile-time only. Runtime theming of hero section is impossible.

### I-4. Hardcoded border width (Low)
Line 157: `border: 1.5px solid $va-border-color` — uses a non-standard `1.5px` not from any token. Should use `$border-width` or a defined token.

### I-5. Large file size (Medium)
588 lines is the largest layout file. The TTS input card (lines 182–350) and floating decorations (lines 360–550) could be extracted into sub-components (`_hero-input-card.scss`, `_hero-floats.scss`).

### I-6. 0 `@extend` usages — good (Info)
Hero does not extend Bootstrap classes, which means no selector explosion from this file. However, the hero buttons duplicate what `@extend .va-btn` would provide.

## Improvements Made

- ✅ Fluid typography with `clamp()` (responsive without media queries)
- ✅ Focus-visible on 3 interactive elements
- ✅ Responsive handling via `va-media-down("md")`
- ✅ Float positioning variants (`--left`, `--right`, `--sm`, `--letter`)
- ✅ `id="hero"` added for anchor navigation (commit `9b02e58`)
- ✅ Uses `$va-z-raised` token for input card z-index

## Reference Guide Status

- **components.html**: ✅ Has `#hero` section with rendered demo
- **Code snippets**: ⚠️ Basic markup only — missing input card variant, compact variant
- **Missing**: Float positioning demo, compact hero demo

## Maturity: **Beta**

Blockers to Stable: parallel button system, no BOOTSTRAP ALIGNMENT, no `var(--va-*)`.
