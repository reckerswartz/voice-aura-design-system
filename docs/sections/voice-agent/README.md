# Voice Agent Card (`_voice-agent.scss`)

> Component · 353 lines · `scss/brands/voice-aura/_voice-agent.scss` · **App-specific**

## Overview

Product showcase card for the Voice Agent feature. Contains language tabs, agent avatar, call button, and crosshair corner decorations. Tightly branded to Voice Aura — not reusable across themes.

## Key Classes

| Class | Purpose |
|-------|---------|
| `.va-agent-card` | Wrapper with dark background |
| `.va-agent-card__header` | Brand logo + language tabs |
| `.va-agent-card__tabs` | Language tab switcher |
| `.va-agent-card__avatar` | Agent photo + name |
| `.va-agent-card__call-btn` | "Call" CTA button |
| `.va-agent-card__corners` | Crosshair corner decoration |

## Issues

### I-1. App-specific — not reusable (High)
339 lines of Voice Aura product-specific styling. Should move to `brands/voice-aura/`.

### I-2. No BOOTSTRAP ALIGNMENT block (Medium)
Missing. Should state "No Bootstrap equivalences — fully custom component."

### I-3. No `var(--va-*)` consumption (Low)
3 brand color refs. Compile-time only.

### I-4. No `@extend` (Good)
Fully standalone. No selector bloat.

## Reference Guide Status

- **components.html**: ✅ Has `#agent` section
- **Code snippets**: ❌ No copyable code block

## Maturity: **Draft**

App-specific, not reusable. Needs extraction to brand-specific directory.
