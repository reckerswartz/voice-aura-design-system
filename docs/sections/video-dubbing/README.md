# Video Dubbing Card (`_video-dubbing.scss`)

> Component · 391 lines · `scss/brands/voice-aura/_video-dubbing.scss` · **App-specific**

## Overview

Product showcase card for the Video Dubbing feature. Contains language tabs, video player with progress bar, captions toggle, and video title bar. Tightly branded to Voice Aura — not reusable across themes.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-dubbing-card` | Wrapper with dark background |
| `.va-dubbing-card__tabs` | Language tab switcher |
| `.va-dubbing-card__player` | Video player area |
| `.va-dubbing-card__controls` | Playback controls (play/pause, volume, progress) |
| `.va-dubbing-card__caption-toggle` | CC button |
| `.va-dubbing-card__title-bar` | Video title + thumbnail |

## Issues

### I-1. App-specific — not reusable (High)
376 lines of Voice Aura product-specific styling. Should move to `brands/voice-aura/`.

### I-2. No BOOTSTRAP ALIGNMENT block (Medium)
Missing. Should state "No Bootstrap equivalences — fully custom component."

### I-3. No `var(--va-*)` consumption (Low)
7 brand color refs. Compile-time only.

### I-4. No `@extend` (Good)
Fully standalone. No selector bloat.

## Reference Guide Status

- **components.html**: ✅ Has `#dubbing` section
- **Code snippets**: ❌ No copyable code block

## Maturity: **Draft**

App-specific, not reusable. Needs extraction to brand-specific directory.
