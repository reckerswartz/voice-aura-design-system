# Voice Aura — Asset & Resource Guidelines

> A complete reference for icons, illustrations, patterns, fonts, and visual assets used in the Voice Aura design system.

---

## Table of Contents

1. [Asset Directory Structure](#asset-directory-structure)
2. [Icons](#icons)
3. [Brand Assets](#brand-assets)
4. [Patterns & Decorative Elements](#patterns--decorative-elements)
5. [Illustrations & Mockups](#illustrations--mockups)
6. [Typography & Fonts](#typography--fonts)
7. [Open-Source Platforms & Sources](#open-source-platforms--sources)
8. [Color Application for Assets](#color-application-for-assets)
9. [Sizing & Spacing Guidelines](#sizing--spacing-guidelines)
10. [Accessibility](#accessibility)
11. [Licensing Summary](#licensing-summary)

---

## Asset Directory Structure

```
assets/
├── brand/
│   ├── logo-icon.svg           # Logo mark (sound-wave icon)
│   ├── logo-icon-white.svg     # Logo mark (white, for dark backgrounds)
│   └── logo-full.svg           # Full logo (icon + "Voice Aura" text)
├── icons/
│   ├── lucide/                 # Lucide icon set (MIT license)
│   │   ├── mic.svg
│   │   ├── headphones.svg
│   │   ├── play.svg
│   │   └── ... (54 curated icons)
│   ├── play-circle.svg         # Custom play button
│   ├── pause-circle.svg        # Custom pause button
│   ├── waveform.svg            # Custom waveform icon
│   ├── microphone.svg          # Custom mic icon
│   └── volume-high.svg         # Custom volume icon
├── patterns/
│   ├── halftone-dots.svg       # Repeating halftone tile (16x16)
│   ├── grid-dots.svg           # Repeating dot grid tile (24x24)
│   ├── sound-wave-hero.svg     # Decorative hero waveform
│   └── wave-divider.svg        # Horizontal section divider
└── illustrations/
    ├── voice-studio-mockup.svg # Browser/laptop frame mockup
    └── phone-mockup.svg        # Phone frame mockup
```

---

## Icons

### Primary Library: Lucide Icons

Lucide is the recommended icon library for Voice Aura. It provides clean, minimal, stroke-based icons that perfectly match the design system aesthetic.

| Property | Detail |
|----------|--------|
| **Library** | [Lucide Icons](https://lucide.dev/) |
| **License** | MIT (free for commercial use, no attribution required) |
| **Style** | Outline / stroke-based |
| **Default Size** | 24x24 viewBox |
| **Stroke Width** | 2px (default), adjustable |
| **Icon Count** | 1,900+ |
| **Installed via** | `npm install lucide-static` (already in devDependencies) |

### Installation & Usage

#### Option A: Direct SVG (Recommended for Static Sites)

Copy SVGs from `assets/icons/lucide/` or from `node_modules/lucide-static/icons/`:

```html
<!-- Inline SVG (best for styling control) -->
<svg class="va-icon" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
  <line x1="12" y1="19" x2="12" y2="22"/>
</svg>
```

#### Option B: CDN (Quick Prototyping)

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>

<!-- Then use data attributes -->
<i data-lucide="mic" class="va-icon"></i>
<i data-lucide="headphones" class="va-icon"></i>
<i data-lucide="send" class="va-icon"></i>
```

#### Option C: React / Vue / Svelte

```bash
npm install lucide-react    # React
npm install lucide-vue-next # Vue 3
npm install lucide-svelte   # Svelte
```

```jsx
import { Mic, Headphones, Send, Settings } from 'lucide-react';

<Mic size={24} color="#1A1919" strokeWidth={1.5} />
<Send size={24} color="#0478FF" strokeWidth={1.5} />
```

### Icon Styling Classes

```scss
// Standard icon
.va-icon {
  width: 24px;
  height: 24px;
  stroke: $va-near-black;
  stroke-width: 1.5;
  fill: none;
  flex-shrink: 0;
}

// Size variants
.va-icon--sm { width: 16px; height: 16px; }
.va-icon--lg { width: 32px; height: 32px; }
.va-icon--xl { width: 48px; height: 48px; }

// Color variants
.va-icon--primary { stroke: $va-primary-blue; }
.va-icon--muted   { stroke: $va-muted-text; }
.va-icon--white   { stroke: $va-white; }

// Filled variant (for solid icons)
.va-icon--filled {
  fill: currentColor;
  stroke: none;
}
```

### Curated Icon Map

These 54 Lucide icons are pre-selected for Voice Aura and saved in `assets/icons/lucide/`:

| Category | Icons |
|----------|-------|
| **Audio/Voice** | `mic`, `mic-off`, `headphones`, `volume-2`, `volume-x`, `audio-waveform`, `podcast`, `radio`, `speaker`, `waves` |
| **Playback** | `play`, `pause`, `square` (stop), `circle-play`, `circle-pause` |
| **Navigation** | `menu`, `x`, `search`, `arrow-right`, `chevron-down`, `chevron-right`, `chevron-up`, `external-link` |
| **Actions** | `send`, `upload`, `download`, `copy`, `share-2`, `bookmark`, `log-in`, `log-out` |
| **Content** | `file-text`, `code`, `globe`, `languages`, `video`, `message-square` |
| **Feedback** | `heart`, `star`, `thumbs-up`, `check`, `bell`, `eye`, `eye-off` |
| **Utility** | `settings`, `user`, `lock`, `mail`, `phone`, `clock`, `zap`, `sparkles` |
| **Commerce** | `credit-card`, `shield-check` |
| **Social** | `github`, `twitter` |

### Secondary Library: Phosphor Icons (Optional)

Use Phosphor only when Lucide lacks a specific icon. Phosphor's "Thin" weight best matches Voice Aura.

```bash
npm install @phosphor-icons/web
```

```html
<i class="ph-thin ph-waveform"></i>
```

| Property | Detail |
|----------|--------|
| **Library** | [Phosphor Icons](https://phosphoricons.com/) |
| **License** | MIT |
| **Recommended Weight** | Thin (1px) or Light (1.5px) |
| **Icon Count** | 8,000+ |

---

## Brand Assets

### Logo Mark (`logo-icon.svg`)

The Voice Aura logo mark consists of a circle with concentric sound-wave arcs emanating to the right. It symbolizes voice generation and audio output.

| Property | Value |
|----------|-------|
| **File** | `assets/brand/logo-icon.svg` |
| **ViewBox** | `0 0 48 48` |
| **Primary Color** | `#0478FF` (circle) |
| **Arc Color** | `#1A1919` (arcs with decreasing opacity) |
| **Min Display Size** | 24x24 px |

#### Usage Rules

- **Do** use the logo mark in the navbar at 32x32 or 40x40 px.
- **Do** use the white variant (`logo-icon-white.svg`) on dark backgrounds.
- **Do** maintain at least 8px clear space around the logo mark.
- **Don't** stretch, rotate, or apply effects to the logo.
- **Don't** recolor the logo outside the defined brand colors.

### Full Logo (`logo-full.svg`)

The full logo combines the icon with "Voice Aura" text set in IBM Plex Serif SemiBold. "Voice" is in near-black, "Aura" is in primary blue.

| Property | Value |
|----------|-------|
| **File** | `assets/brand/logo-full.svg` |
| **ViewBox** | `0 0 200 48` |
| **Min Display Width** | 140px |
| **Font** | IBM Plex Serif, 600 weight |

---

## Patterns & Decorative Elements

### Built-In CSS Patterns (No External Files Needed)

The design system includes two SCSS-based decorative patterns. These are generated with pure CSS and require no image assets.

#### 1. Halftone Dot Overlay

Subtle dot pattern that adds texture to sections and hero areas.

```scss
// Apply to any container element
.my-section {
  @include va-halftone-overlay($opacity: 0.06, $color: $va-near-black);
}
```

| Property | Value |
|----------|-------|
| **Mixin** | `va-halftone-overlay()` |
| **Default Opacity** | `0.06` |
| **Dot Size** | 1px radius |
| **Grid Spacing** | 8px |
| **Location** | `scss/abstracts/_mixins.scss` |

#### 2. Animated Sound Wave Bars

Vertical bars that pulse with staggered timing, used in the hero section flanks.

```html
<div class="va-hero__wave va-hero__wave--left">
  <span class="va-hero__wave-bar"></span>
  <span class="va-hero__wave-bar"></span>
  <!-- 8 bars total -->
</div>
```

| Property | Value |
|----------|-------|
| **Bar Width** | 3px |
| **Bar Color** | `#0478FF` |
| **Bar Count** | 8 per side |
| **Animation** | `va-wave-pulse`, 1.4s alternate |
| **Location** | `scss/layout/_hero.scss` |

### SVG Pattern Tiles

For non-CSS contexts (email, static images, exports), use the SVG pattern tiles:

| Pattern | File | Tile Size | Usage |
|---------|------|-----------|-------|
| Halftone Dots | `assets/patterns/halftone-dots.svg` | 16x16 | `background-image` repeat |
| Grid Dots | `assets/patterns/grid-dots.svg` | 24x24 | `background-image` repeat |
| Sound Wave | `assets/patterns/sound-wave-hero.svg` | 120x300 | Hero flanking decoration |
| Wave Divider | `assets/patterns/wave-divider.svg` | 1440x60 | Horizontal section separator |

#### Using SVG Pattern Tiles

```css
/* Repeating halftone background */
.section-textured {
  background-image: url('../assets/patterns/halftone-dots.svg');
  background-repeat: repeat;
  background-size: 16px 16px;
}

/* Section divider */
.section-divider {
  width: 100%;
  height: 60px;
  background-image: url('../assets/patterns/wave-divider.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
```

---

## Illustrations & Mockups

### Custom Mockups

| Asset | File | ViewBox | Usage |
|-------|------|---------|-------|
| Browser/Laptop Frame | `assets/illustrations/voice-studio-mockup.svg` | `600x400` | Feature sections, demos |
| Phone Frame | `assets/illustrations/phone-mockup.svg` | `280x560` | Mobile app showcase |

#### Usage

```html
<div class="va-feature-row__visual">
  <img src="assets/illustrations/voice-studio-mockup.svg"
       alt="Voice Aura Studio interface"
       class="va-illustration"
       width="600" height="400"
       loading="lazy">
</div>
```

### Open-Source Illustration Sources

For additional illustrations (feature pages, empty states, onboarding, error pages), use these platforms:

#### 1. unDraw (Recommended)

| Property | Detail |
|----------|--------|
| **URL** | [undraw.co](https://undraw.co/) |
| **License** | CC0 1.0 (Public Domain) |
| **Attribution** | Not required |
| **Commercial Use** | Yes |
| **Format** | SVG, PNG |
| **Color Customization** | Set accent color to `#0478FF` before downloading |

**Best search terms:** `sound`, `audio`, `voice`, `music`, `recording`, `podcast`, `wave`, `broadcast`

**How to use:**
1. Visit undraw.co
2. Set the accent color to `#0478FF` using the color picker
3. Search for the illustration you need
4. Download as SVG
5. Save to `assets/illustrations/`
6. Edit the SVG to replace any remaining off-brand colors

#### 2. SVG Repo

| Property | Detail |
|----------|--------|
| **URL** | [svgrepo.com](https://www.svgrepo.com/) |
| **License** | Varies per asset (CC0, MIT, custom) — check each |
| **Attribution** | Usually not required (verify per asset) |
| **Commercial Use** | Most are free for commercial use |
| **Format** | SVG |

**Best search terms:** `waveform`, `audio`, `microphone`, `equalizer`, `monochrome`, `minimal`

**How to use:**
1. Search and filter by "Monochrome" style
2. Download SVG
3. Recolor paths to use Voice Aura brand colors
4. Save to `assets/illustrations/` or `assets/icons/`

#### 3. Hero Patterns (Background Patterns)

| Property | Detail |
|----------|--------|
| **URL** | [heropatterns.com](https://heropatterns.com/) |
| **License** | Free for personal and commercial use |
| **Attribution** | Not required |
| **Format** | CSS / inline SVG |

**Recommended patterns:** Topography, Wiggle, I Like Food (dot grid), Charlie Brown (diagonal lines)

**How to use:**
1. Choose a pattern on heropatterns.com
2. Set the foreground color to `#1A1919` and opacity to 0.03-0.06
3. Copy the CSS
4. Apply as a background to your section element

---

## Typography & Fonts

### Font Family: IBM Plex

Voice Aura uses the IBM Plex superfamily exclusively. All weights are available from Google Fonts under the **SIL Open Font License (OFL)**.

| Font | Usage | Weights | Source |
|------|-------|---------|--------|
| **IBM Plex Serif** | Headings, display text | 400, 500, 600, 700 | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Serif) |
| **IBM Plex Sans** | Body text, UI labels | 300, 400, 500, 600, 700 | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans) |
| **IBM Plex Mono** | Code blocks, API keys | 400, 500 | [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono) |

### Loading Fonts

#### Option A: Google Fonts CDN (Easiest)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### Option B: Self-Hosted (Best Performance)

1. Download fonts from [Google Fonts](https://fonts.google.com/) or [github.com/IBM/plex](https://github.com/IBM/plex)
2. Place in `assets/fonts/`
3. Use `@font-face` declarations:

```scss
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('../assets/fonts/IBMPlexSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

#### Option C: npm Package

```bash
npm install @ibm/plex
```

```scss
@import '@ibm/plex/scss/ibm-plex';
```

### Font Files Source

| Source | URL | License |
|--------|-----|---------|
| Google Fonts | `fonts.google.com` | SIL Open Font License 1.1 |
| IBM GitHub Repo | `github.com/IBM/plex` | SIL Open Font License 1.1 |
| npm | `@ibm/plex` | SIL Open Font License 1.1 |

### Font Usage Rules

- **Headings (h1–h4):** IBM Plex Serif, SemiBold (600) or Bold (700)
- **Subheadings (h5–h6):** IBM Plex Sans, SemiBold (600)
- **Body text:** IBM Plex Sans, Regular (400)
- **Buttons & labels:** IBM Plex Sans, Medium (500) or SemiBold (600)
- **Code snippets:** IBM Plex Mono, Regular (400)
- **Never** mix other typefaces into the Voice Aura design system.

---

## Color Application for Assets

### Recoloring Downloaded SVGs

When downloading SVGs from external sources, recolor them to match the Voice Aura palette:

```
Primary accent:     #0478FF  (interactive elements, highlights)
Primary dark:       #1A1919  (outlines, primary fills)
Secondary grey:     #E9E9EA  (subtle fills, borders)
Background alt:     #F7F7F8  (light fills)
Body text:          #4B5563  (secondary text in illustrations)
Muted:              #9CA3AF  (tertiary elements)
White:              #FFFFFF  (backgrounds, negative space)
```

### CSS Recoloring Techniques

```scss
// Method 1: currentColor (best for inline SVGs)
.va-icon {
  color: $va-near-black;
  // SVG uses stroke="currentColor" or fill="currentColor"
}

// Method 2: CSS filter (for <img> tags)
.va-illustration--monochrome {
  filter: grayscale(100%) brightness(0.1);
}

.va-illustration--blue {
  filter: grayscale(100%) brightness(0.5) sepia(1) hue-rotate(190deg) saturate(5);
}

// Method 3: Direct SVG path editing
// Open the SVG file and replace fill/stroke values:
//   fill="#6c63ff" → fill="#0478FF"
//   fill="#3f3d56" → fill="#1A1919"
```

---

## Sizing & Spacing Guidelines

### Icon Sizes

| Context | Size | Class |
|---------|------|-------|
| Inline with text | 16px | `.va-icon--sm` |
| Buttons, nav items | 20px | `.va-icon` (adjusted) |
| Standard UI | 24px | `.va-icon` (default) |
| Feature highlights | 32px | `.va-icon--lg` |
| Hero / marketing | 48px | `.va-icon--xl` |
| Large decorative | 64px+ | Custom sizing |

### Icon Spacing

- **Inside buttons:** 8px gap between icon and text
- **In lists:** 12px gap between icon and label
- **In nav items:** 8px gap
- **Standalone:** Centered in their container with min 8px padding

### Illustration Sizes

| Context | Max Width | Aspect Ratio |
|---------|-----------|--------------|
| Hero section | 600px | Flexible |
| Feature row visual | 500px | ~3:2 |
| Card illustration | 280px | ~1:1 or ~4:3 |
| Empty state | 240px | ~1:1 |
| Inline decorative | 120px | Flexible |

### Pattern Tile Sizes

| Pattern | Tile Size | Recommended Scale |
|---------|-----------|-------------------|
| Halftone dots | 16x16 | 1x (16px repeat) |
| Grid dots | 24x24 | 1x (24px repeat) |
| Sound wave hero | 120x300 | 1x |
| Wave divider | 1440x60 | `width: 100%` |

---

## Accessibility

### Icon Accessibility

```html
<!-- Decorative icon (hidden from screen readers) -->
<svg class="va-icon" aria-hidden="true" focusable="false">...</svg>

<!-- Meaningful icon (with accessible label) -->
<svg class="va-icon" role="img" aria-label="Microphone">
  <title>Microphone</title>
  ...
</svg>

<!-- Icon button -->
<button class="va-btn" aria-label="Play audio">
  <svg class="va-icon" aria-hidden="true">...</svg>
</button>
```

### Illustration Accessibility

```html
<!-- Decorative illustration -->
<img src="illustration.svg" alt="" role="presentation">

<!-- Meaningful illustration -->
<img src="voice-studio-mockup.svg"
     alt="Voice Aura Studio showing the text-to-speech interface with waveform visualization">
```

### Color Contrast

- All icon strokes meet **WCAG AA** contrast ratio (4.5:1 min) against their backgrounds.
- `#1A1919` on `#FFFFFF` = 17.4:1 contrast ratio (AAA)
- `#0478FF` on `#FFFFFF` = 4.6:1 contrast ratio (AA)
- `#9CA3AF` on `#FFFFFF` = 2.9:1 — use only for decorative, non-essential elements.

---

## Licensing Summary

All assets in the Voice Aura design system are open-source or custom-created.

| Asset | License | Attribution Required | Commercial Use |
|-------|---------|---------------------|----------------|
| **Lucide Icons** | MIT | No | Yes |
| **Phosphor Icons** | MIT | No | Yes |
| **IBM Plex Fonts** | SIL OFL 1.1 | No (for use); Yes (for redistribution) | Yes |
| **unDraw Illustrations** | CC0 1.0 | No | Yes |
| **Hero Patterns** | Free (custom) | No | Yes |
| **SVG Repo** | Varies (CC0/MIT) | Check per asset | Most yes |
| **Custom Brand SVGs** | Part of design system (ISC) | N/A | Yes |

### License Files

When redistributing the design system, include:
- `LICENSE` — ISC license for the design system code
- Credit Lucide in your project's acknowledgments (appreciated but not required)
- IBM Plex OFL license if self-hosting fonts

---

## Quick Reference: Finding the Right Asset

| I need... | Where to look |
|-----------|---------------|
| A UI icon (mic, play, settings) | `assets/icons/lucide/` or [lucide.dev](https://lucide.dev/) |
| The Voice Aura logo | `assets/brand/logo-*.svg` |
| A background texture | `@include va-halftone-overlay()` or `assets/patterns/` |
| A section separator | `assets/patterns/wave-divider.svg` |
| An illustration for a feature | [undraw.co](https://undraw.co/) → save to `assets/illustrations/` |
| A device mockup | `assets/illustrations/*-mockup.svg` |
| Custom audio/voice icon | `assets/icons/waveform.svg`, `microphone.svg`, etc. |
| Font files | Google Fonts CDN or `npm install @ibm/plex` |
| A background pattern | [heropatterns.com](https://heropatterns.com/) |

---

*Part of the Voice Aura Design System. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the full design specification.*
