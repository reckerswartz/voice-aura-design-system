# Auth (`_auth.scss`)

> Component · 432 lines · `scss/components/_auth.scss` · **App-specific**

## Overview

Authentication forms for signup and login pages. Split-screen layout with a showcase panel (left) and form panel (right). Includes social login buttons, divider, form fields, and submit button. Tightly styled to the Voice Aura brand.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-auth` | Full-height split-screen wrapper |
| `.va-auth__showcase` | Left panel (decorative, brand-heavy) |
| `.va-auth__form-panel` | Right panel (form content) |
| `.va-auth__header` | Title + subtitle group |
| `.va-auth__social-btn` | Social login button (`@extend .btn .btn-outline-secondary`) |
| `.va-auth__divider` | "or" horizontal divider |
| `.va-auth__field` | Form field group |
| `.va-auth__submit` | Submit button (`@extend .btn .btn-dark`) |
| `.va-auth__footer` | Footer links ("Already have an account?") |

## Issues

### I-1. App-specific — not reusable across brands (High)
432 lines ship to all consumers. A "SoundWave Pro" theme would not use Voice Aura's auth layout. Should be in a `brands/voice-aura/` directory.

### I-2. 4 `@extend` usages (Medium)
`__submit` extends `.btn .btn-dark`; `__social-btn` extends `.btn .btn-outline-secondary`. Contributes to selector bloat.

### I-3. No `var(--va-*)` consumption (Medium)
0 custom property references. 5 brand color refs.

### I-4. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents equivalences for submit and social buttons.

## Improvements Made

- ✅ Refactored `__submit` and `__social-btn` to use `@extend` instead of duplicated button logic (commit `a1a82bc`)
- ✅ `autocomplete` attributes added to form inputs (commit `aafb2a2`)
- ✅ Focus-visible on interactive elements

## Reference Guide Status

- **components.html**: ✅ Has `#auth` section
- **Code snippets**: ❌ No copyable code block for auth forms
- **Missing**: Code snippet, login vs signup variant docs

## Maturity: **Beta**

Blockers to Stable: app-specific (should move to `brands/`), missing code snippets.
