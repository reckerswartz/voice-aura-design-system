# Navbar (`_navbar.scss`)

> Layout section · 458 lines · `scss/layout/_navbar.scss`

## Overview

Primary navigation bar with white background, centred nav links, and right-aligned auth actions. Collapses to hamburger on mobile. Height: 72px desktop.

## Classes

| Class | Purpose |
|-------|---------|
| `.va-navbar` | Wrapper — flex, border-bottom, z-index |
| `.va-navbar--fixed` / `--sticky` | Positioning variants |
| `.va-navbar--scrolled` | Frosted glass on scroll (backdrop-filter + shadow) |
| `.va-navbar--transparent` | For use over hero images |
| `.va-navbar-inner` | Optional max-width container |
| `.va-navbar-brand` | Logo + brand text group |
| `.va-navbar-brand__logo` / `__icon` | Logo image (32×32) |
| `.va-navbar-brand__text` | "VOICE AURA" text |
| `.va-navbar-nav` | Centre-aligned link list |
| `.va-navbar-link` | Individual link with underline hover |
| `.va-navbar-link--active` | Active state (bold + full underline) |
| `.va-navbar-actions` | Right-side button group |
| `.va-navbar-btn--ghost` | Ghost "Log in" button |
| `.va-navbar-btn--outlined` | Outlined pill "Log in →" |
| `.va-navbar-btn--filled` | Filled dark pill "Sign up →" |
| `.va-navbar-toggle` | Mobile hamburger (3-line → ✕ morph) |
| `.va-navbar-collapse` | Mobile collapsible container |

## Issues

### I-1. Parallel button system (High)
`va-navbar-btn--ghost/--outlined/--filled` duplicate ~100 lines of button logic that already exists in `_buttons.scss` (`va-btn`, `va-btn--primary`, `va-btn--secondary`). These use 8 `@extend` statements (`.btn`, `.btn-link`, `.btn-dark`, `.btn-outline-secondary`, `.rounded-pill`), contributing to **8 selectors per `.btn` rule** in compiled CSS.

**Fix:** Replace with `@extend .va-btn` + navbar-specific size/shape modifiers.

### I-2. No BOOTSTRAP ALIGNMENT comment block (Medium)
Required by project rules but missing. Navbar buttons should document their equivalence to `.btn .btn-dark .rounded-pill` etc.

### I-3. No `var(--va-*)` consumption (Medium)
0 custom property references. Colors (`$va-near-black`, `$va-primary-blue`, `$va-white`) are all compile-time Sass variables. No runtime theming possible.

### I-4. Brand coupling — 8 direct `$va-near-black`/`$va-primary-blue` refs (Low)
Most are in focus-visible outlines and text colors that could use `var(--va-color-primary)` and `var(--va-color-secondary)`.

### I-5. `-webkit-backdrop-filter` manually prefixed (Low)
Line 57 manually adds `-webkit-backdrop-filter`. Should be handled by autoprefixer in a PostCSS pipeline.

### I-6. HTML duplicated across 4 pages (High)
The navbar markup (~50 lines) is copy-pasted in `pixel-perfect-demo.html`, `signup-demo.html`, `login-demo.html`, and `components.html`. Requires a partial/include system.

## Improvements Made

- ✅ Frosted glass scrolled state with `backdrop-filter: blur(12px)` (commit `15c7526`)
- ✅ Focus-visible on all interactive elements (6 occurrences)
- ✅ Responsive mobile collapse with hamburger → ✕ morph
- ✅ Uses `$va-z-navbar` token (not hardcoded z-index)
- ✅ Uses `va-media-down("lg")` mixin (not hardcoded breakpoint)

## Reference Guide Status

- **components.html**: ✅ Has `#navbar` section with rendered demo
- **Code snippets**: ⚠️ Has copy button but limited variants shown
- **Missing**: Scrolled state demo, transparent variant demo, mobile collapse demo

## Maturity: **Beta**

Blockers to Stable: parallel button system, missing BOOTSTRAP ALIGNMENT, no `var(--va-*)` consumption.
