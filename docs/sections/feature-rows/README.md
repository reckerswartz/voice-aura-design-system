# Feature Rows (`_feature-section.scss` + `_section.scss`)

> Layout sections · 188 + 416 lines · `scss/layout/_feature-section.scss`, `scss/layout/_section.scss`

## Overview

Two-column feature rows with text + visual panel. Used for product showcases (Voice Agent API, Video Dubbing). `_feature-section.scss` is the canonical owner of `.va-feature-row`; `_section.scss` provides general section wrappers (`.va-section`, `.va-section-header`) and utility classes.

## Key Classes

| Class | File | Purpose |
|-------|------|---------|
| `.va-section` | `_section.scss` | Generic section wrapper with padding |
| `.va-section--dark` | `_section.scss` | Dark background variant |
| `.va-section-header` | `_section.scss` | Centred heading + subtitle group |
| `.va-feature-row` | `_feature-section.scss` | 2-column grid (text + visual) |
| `.va-feature-row--reverse` | `_feature-section.scss` | Flips column order |
| `.va-feature-row__text` | `_feature-section.scss` | Text content column |
| `.va-feature-row__badge` | `_feature-section.scss` | "FOR DEVELOPERS" pill |
| `.va-feature-row__title` | `_feature-section.scss` | Section heading |
| `.va-feature-row__desc` | `_feature-section.scss` | Description paragraph |
| `.va-feature-row__actions` | `_feature-section.scss` | CTA button group |
| `.va-feature-visual` | `_feature-section.scss` | Visual panel container |
| `.va-feature-visual--light/--dark` | `_feature-section.scss` | Background variants |
| `.va-icon-inline` | `_section.scss` | Inline SVG icon helper |

## Issues

### I-1. Dead code removed — `.feature-visual` duplicate (Fixed)
Previously `_section.scss` had an unprefixed `.feature-visual` that duplicated `.va-feature-visual` in `_feature-section.scss`. Removed in commit `6f92369`.

### I-2. No BOOTSTRAP ALIGNMENT comment block (Medium)
Neither file documents Bootstrap equivalences.

### I-3. No `var(--va-*)` consumption (Medium)
0 custom property references in either file. Brand colors (`$va-near-black`, `$va-primary-blue`) used directly — 14 refs in `_section.scss`, 8 in `_feature-section.scss`.

### I-4. `_section.scss` is large (416 lines) (Low)
Contains section wrappers, discount badges, icon helpers, and responsive utilities. Could benefit from further decomposition if it grows.

### I-5. Feature row buttons duplicate va-btn (Medium)
`.va-feature-row__actions` uses buttons that match `va-btn` styling but are defined inline in the HTML as `va-btn--accent` / `va-btn--secondary`. The SCSS for the actions container is fine, but there's no documented pattern.

## Improvements Made

- ✅ Dead `.feature-visual` duplicate removed (commit `6f92369`)
- ✅ Responsive via `va-media-down("md")` — stacks to single column
- ✅ Feature visual dark/light variants with gradient backgrounds
- ✅ Uses `$va-grid-unit` and `$va-breakpoints` tokens

## Reference Guide Status

- **components.html**: ✅ Has `#features` section with rendered demo
- **Code snippets**: ⚠️ Limited — shows structure but not all variants
- **Missing**: Reverse variant demo, dark visual panel demo

## Maturity: **Beta**

Blockers to Stable: missing BOOTSTRAP ALIGNMENT, no `var(--va-*)`, limited reference snippets.
