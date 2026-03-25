# Typography (`_typography.scss`)

> Base · 289 lines · `scss/base/_typography.scss`

## Overview

Global typography rules: Google Fonts import (IBM Plex Sans + Serif), heading styles (`.va-h1`–`.va-h6`, `.va-display-*`), body text utilities, and font-family override classes. Uses `@extend` on Bootstrap heading classes for delta-only pattern.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-h1` – `.va-h6` | Heading styles (`@extend .h1` – `.h6`) |
| `.va-display-1` – `.va-display-4` | Display headings (`@extend .display-*`) |
| `.va-lead` | Lead paragraph (`@extend .lead`) |
| `.va-text-serif` | IBM Plex Serif override |
| `.va-text-sans` | IBM Plex Sans override |
| `.va-text-mono` | Monospace override |

## Issues

### I-1. Google Fonts `@import` is render-blocking and brand-coupled (High)
Line 49: `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:...&family=IBM+Plex+Serif:...')` is hardcoded to Voice Aura's brand fonts. A second theme requires editing this line. CSS `@import` for fonts blocks first paint.

**Fix:** Move to HTML `<link>` tags or make the URL a configurable Sass variable.

### I-2. 13 `@extend` usages — second highest (High)
Extends `.h1`–`.h6`, `.display-1`–`.display-4`, `.lead`. Each adds VA selectors into every Bootstrap rule mentioning these classes.

### I-3. No `var(--va-*)` consumption (Medium)
0 custom property references. Font families reference `$headings-font-family` and `$font-family-base` (Bootstrap vars).

### I-4. Deprecated VA text utilities documented (Info)
`.va-text-primary` → `.text-primary`, `.va-text-muted` → `.text-body-tertiary`, etc. These are kept for backwards compatibility but documented as deprecated.

## Improvements Made

- ✅ Font variables aligned to Bootstrap (`$font-family-base`, `$headings-font-family`) in commit `a1a82bc`
- ✅ Duplicate `.va-text-muted` selector fixed (commit `d6eceeb`)
- ✅ Deprecated text utilities documented with Bootstrap equivalences

## Reference Guide Status

- **components.html**: ✅ Has `#typography` section with font scale demos
- **Code snippets**: ⚠️ Shows type scale but not all utility classes
- **Missing**: Font-family override demos, deprecated utility migration guide

## Maturity: **Beta**

Blockers to Stable: render-blocking font import, high `@extend` count, missing reference coverage for all utilities.
