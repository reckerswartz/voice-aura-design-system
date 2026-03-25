# Forms (`_forms.scss`)

> Component · 587 lines · `scss/components/_forms.scss`

## Overview

Form elements extending Bootstrap's form system. Includes text inputs, textareas, selects, checkboxes, radio buttons, toggle switches, input groups, and validation states. Uses delta-only pattern with 6 `@extend` usages.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-form-label` | Label — 1 delta (line-height) |
| `.va-form-control` | Text input — `@extend .form-control` |
| `.va-form-select` | Dropdown select — `@extend .form-select` |
| `.va-form-text` | Help text — `@extend .form-text` |
| `.va-form-check` | Checkbox / radio wrapper |
| `.va-form-switch` | Toggle switch |
| `.va-input-group` | Input + addon group |
| `.va-input-card` | Styled card-like input container |
| `.va-form-feedback` | Validation feedback (`@extend .invalid-feedback`) |
| `.va-form-floating` | Floating label pattern |

## Issues

### I-1. 6 `@extend` usages (Medium)
Extends `.form-control`, `.form-select`, `.form-text`, `.invalid-feedback`, etc. Each adds to compiled selector groups.

### I-2. No `var(--va-*)` consumption (Medium)
0 custom property references. 7 brand color refs. Focus ring uses `$va-primary-blue` directly.

### I-3. BOOTSTRAP ALIGNMENT comment block present (Good)
✅ Documents delta properties for form-label, form-control.

### I-4. Focus-visible coverage good (Good)
5 `:focus-visible` declarations covering inputs, selects, and interactive elements.

### I-5. Large file (587 lines) (Low)
Covers many form variants. Not critical — each variant is distinct.

## Improvements Made

- ✅ Delta-only refactor — form-label reduced to 1 delta (commit `a1a82bc`)
- ✅ Disabled input styling via Bootstrap variables (`$input-disabled-bg`)
- ✅ `autocomplete` attributes added to HTML form inputs (commit `aafb2a2`)
- ✅ Comprehensive validation states (valid, invalid, feedback)

## Reference Guide Status

- **components.html**: ✅ Has `#forms` section with demos
- **Code snippets**: ✅ Has copyable code block
- **Missing**: Toggle switch demo, floating label demo, validation state demo

## Maturity: **Beta**

Blockers to Stable: incomplete reference demos for all variants, no `var(--va-*)`.
