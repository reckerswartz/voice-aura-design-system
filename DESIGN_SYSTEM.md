# Voice Aura Design System

> A comprehensive, reusable UI design guideline built on Bootstrap 5 for premium SaaS applications. Extracted from the Voice Aura AI Voice Generator & Text-to-Speech platform design.
>
> **Live Demo:** [https://reckerswartz.github.io/voice-aura-design-system/](https://reckerswartz.github.io/voice-aura-design-system/) (deployed automatically via GitHub Actions)

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Design Principles](#design-principles)
4. [Color Palette](#color-palette)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Border Radius](#border-radius)
8. [Shadows & Elevation](#shadows--elevation)
9. [Components](#components)
10. [Page Patterns](#page-patterns)
11. [Responsive Breakpoints](#responsive-breakpoints)
12. [Icons & Visual Assets](#icons--visual-assets)
13. [File Structure](#file-structure)
14. [Rails Integration](#rails-integration)
15. [Agent Skills & GitHub Setup](#agent-skills--github-setup)

---

## Overview

Voice Aura Design System is a **CoreUI-style**, production-ready design framework built on top of **Bootstrap 5** using **Sass/SCSS**. It provides a consistent, scalable design language for building large-scale SaaS web applications with a premium, clean aesthetic.

### Key Characteristics

- **Clean & Minimal** - Generous whitespace, restrained color usage, and clarity-first design
- **Premium SaaS Aesthetic** - Professional, trustworthy appearance suitable for enterprise products
- **Serif + Sans Pairing** - IBM Plex Serif headings paired with IBM Plex Sans body text
- **Bootstrap 5 Foundation** - Full compatibility with Bootstrap's grid, utilities, and components
- **Namespace Prefixed** - All custom classes use the `va-` prefix to avoid collisions

---

## Getting Started

### Installation

```bash
npm install
```

### Building CSS

```bash
# Development build (with source maps)
npm run build:css

# Watch for changes
npm run watch:css
```

### Usage in Projects

```html
<!-- Include compiled CSS -->
<link rel="stylesheet" href="dist/css/voice-aura.css">

<!-- Or import in your Sass -->
@import 'voice-aura-design-system/scss/voice-aura';
```

---

## Design Principles

### 1. Clarity Over Decoration
Every element serves a purpose. Decorative elements (halftone patterns, sound waves) are used sparingly and never compete with content.

### 2. Content Hierarchy Through Typography
The serif/sans-serif pairing creates a natural hierarchy: large serif headlines draw attention, while sans-serif body text ensures readability.

### 3. Generous Whitespace
Sections use 80-120px vertical padding. Components breathe with ample internal spacing. White space is a design element, not wasted space.

### 4. Restrained Color
The palette is intentionally limited. Near-black and white dominate, with blue (#0478FF) used only for interactive elements and key accents.

### 5. Consistency at Scale
Every component follows the same spacing grid (8px), border-radius scale, and shadow system to maintain visual coherence across hundreds of pages.

---

## Color Palette

### Core Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$va-primary` | `#0478FF` | Interactive accents, active states, links, send buttons |
| `$va-dark` | `#1A1919` | Primary buttons, headings, high-emphasis text |
| `$va-light` | `#E9E9EA` | Subtle backgrounds, borders, dividers |
| `$va-white` | `#FFFFFF` | Card backgrounds, page background |
| `$va-body-bg-alt` | `#F7F7F8` | Alternating section backgrounds |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$va-text-primary` | `#1A1919` | Headings, bold text, high-emphasis |
| `$va-text-body` | `#4B5563` | Body paragraphs, descriptions |
| `$va-text-muted` | `#9CA3AF` | Secondary text, captions, labels |
| `$va-text-on-dark` | `#FFFFFF` | Text on dark backgrounds |

### UI Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$va-border` | `#E5E7EB` | Card borders, input borders, dividers |
| `$va-badge-bg` | `#EEF2FF` | Badge/tag backgrounds |
| `$va-focus-ring` | `rgba(4, 120, 255, 0.25)` | Focus ring for accessibility |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `$va-success` | `#10B981` | Success states, confirmations |
| `$va-warning` | `#F59E0B` | Warning states, caution |
| `$va-danger` | `#EF4444` | Error states, destructive actions |
| `$va-info` | `#0478FF` | Informational messages (same as primary) |

### Color Usage Guidelines

```
Primary (#0478FF):
  DO: Active tab indicators, send buttons, "Get API Key" buttons, links
  DON'T: Background fills on large areas, body text

Near Black (#1A1919):
  DO: Headlines, primary CTAs ("Open Studio", "Sign up"), navbar text
  DON'T: Body paragraphs (too heavy), subtle UI elements

Light Grey (#E9E9EA):
  DO: Borders, dividers, inactive states, subtle backgrounds
  DON'T: Text (insufficient contrast), primary actions
```

---

## Typography

### Font Families

```scss
// Headings - Serif
$va-font-heading: 'IBM Plex Serif', Georgia, 'Times New Roman', serif;

// Body - Sans-Serif
$va-font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Code - Monospace
$va-font-mono: 'IBM Plex Mono', 'SF Mono', 'Cascadia Code', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Font |
|---------|------|--------|-------------|------|
| Display 1 | 4.5rem (72px) | 700 | 1.1 | Serif |
| Display 2 | 3.75rem (60px) | 700 | 1.1 | Serif |
| H1 | 3.5rem (56px) | 700 | 1.2 | Serif |
| H2 | 2.5rem (40px) | 700 | 1.2 | Serif |
| H3 | 1.75rem (28px) | 600 | 1.3 | Serif |
| H4 | 1.25rem (20px) | 600 | 1.4 | Serif |
| H5 | 1.125rem (18px) | 600 | 1.4 | Sans |
| H6 | 1rem (16px) | 600 | 1.5 | Sans |
| Body | 1rem (16px) | 400 | 1.6 | Sans |
| Lead | 1.25rem (20px) | 400 | 1.6 | Sans |
| Small | 0.875rem (14px) | 400 | 1.5 | Sans |
| Caption | 0.75rem (12px) | 500 | 1.4 | Sans |

### Typography Classes

```html
<!-- Serif headings (default) -->
<h1 class="va-heading-serif">Built for unmatched speed</h1>

<!-- Display text -->
<h1 class="va-display-1">Massive headline</h1>

<!-- Lead paragraph -->
<p class="va-lead">Fastest TTS API. Customizable voice Studio.</p>

<!-- Muted text -->
<p class="va-text-muted">Trusted by 10M+ creators worldwide.</p>
```

---

## Spacing & Layout

### Spacing Scale (8px Grid)

| Token | Value | Pixels |
|-------|-------|--------|
| `$spacer-1` | 0.25rem | 4px |
| `$spacer-2` | 0.5rem | 8px |
| `$spacer-3` | 1rem | 16px |
| `$spacer-4` | 1.5rem | 24px |
| `$spacer-5` | 2rem | 32px |
| `$spacer-6` | 2.5rem | 40px |
| `$spacer-7` | 3rem | 48px |
| `$spacer-8` | 4rem | 64px |
| `$spacer-9` | 5rem | 80px |
| `$spacer-10` | 6rem | 96px |
| `$spacer-11` | 7.5rem | 120px |

### Containers

| Class | Max Width | Usage |
|-------|-----------|-------|
| `.va-container` | 1280px | Default content container |
| `.va-container--narrow` | 860px | Content-focused pages, forms |
| `.va-container--wide` | 1440px | Full-width layouts, dashboards |

### Section Spacing

```html
<!-- Standard section: 80px top/bottom padding -->
<section class="va-section">...</section>

<!-- Large section: 120px top/bottom padding -->
<section class="va-section va-section--lg">...</section>

<!-- Alternating background -->
<section class="va-section va-section--alt">...</section>
```

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `$va-radius-sm` | 0.5rem (8px) | Buttons, inputs, small elements |
| `$va-radius` | 0.75rem (12px) | Standard cards, dropdowns |
| `$va-radius-lg` | 1rem (16px) | Large cards, modals |
| `$va-radius-xl` | 1.5rem (24px) | Hero cards, featured elements |
| `$va-radius-pill` | 50rem | Badges, pills, fully rounded |

---

## Shadows & Elevation

| Level | Shadow | Usage |
|-------|--------|-------|
| Level 0 | none | Flat elements, bordered cards |
| Level 1 | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation, buttons |
| Level 2 | `0 4px 6px -1px rgba(0,0,0,0.07)` | Default card elevation |
| Level 3 | `0 10px 15px -3px rgba(0,0,0,0.08)` | Dropdowns, popovers |
| Level 4 | `0 20px 25px -5px rgba(0,0,0,0.08)` | Modals, floating elements |
| Level 5 | `0 25px 50px -12px rgba(0,0,0,0.15)` | Hero cards, prominent CTAs |

---

## Components

### Buttons

| Variant | Class | Appearance |
|---------|-------|------------|
| Primary | `.va-btn--primary` | Dark filled (#1A1919), white text |
| Secondary | `.va-btn--secondary` | Outlined, transparent bg |
| Accent | `.va-btn--accent` | Blue filled (#0478FF), white text |
| Ghost | `.va-btn--ghost` | No border, subtle hover |

```html
<!-- Primary CTA with icon -->
<button class="va-btn va-btn--primary va-btn--icon">
  <span class="va-btn__icon">🎤</span>
  Open Studio
</button>

<!-- Secondary -->
<button class="va-btn va-btn--secondary">
  <> API Docs
</button>

<!-- Ghost with arrow -->
<a class="va-btn va-btn--ghost" href="#">
  Log in →
</a>
```

### Cards

```html
<!-- Standard bordered card -->
<div class="va-card va-card--bordered">
  <div class="va-card__body">
    <h3 class="va-card__title">Card Title</h3>
    <p class="va-card__text">Card content</p>
  </div>
</div>

<!-- Elevated card with hover -->
<div class="va-card va-card--elevated va-card--interactive">
  ...
</div>
```

### Pricing Cards

```html
<div class="va-pricing">
  <div class="va-pricing__tabs">
    <button class="va-pricing__tab va-pricing__tab--active">Studio</button>
    <button class="va-pricing__tab">DUB</button>
    <button class="va-pricing__tab">API</button>
  </div>

  <div class="va-pricing__grid">
    <!-- Free tier -->
    <div class="va-pricing-card">
      <span class="va-pricing-card__badge">Free</span>
      <div class="va-pricing-card__price">
        $0 <span>/Month</span>
      </div>
      <p class="va-pricing-card__description">Get started with essential link tracking...</p>
      <button class="va-btn va-btn--secondary va-btn--block">Get Started Free</button>
      <ul class="va-pricing-card__features">
        <li class="va-pricing-card__feature">Access to core Text-to-Speech</li>
        <li class="va-pricing-card__feature">Limited monthly characters</li>
      </ul>
    </div>

    <!-- Featured/Creator tier -->
    <div class="va-pricing-card va-pricing-card--featured">
      <span class="va-pricing-card__badge">Creator</span>
      <div class="va-pricing-card__price">
        $29 <span>/Month</span>
      </div>
      <p class="va-pricing-card__description">For content creators & professionals.</p>
      <button class="va-btn va-btn--primary va-btn--block">Upgrade to Creator</button>
      <ul class="va-pricing-card__features">
        <li class="va-pricing-card__feature">Everything in Free</li>
        <li class="va-pricing-card__feature">HD audio exports</li>
      </ul>
    </div>
  </div>
</div>
```

### TTS Input Card

```html
<div class="va-input-card">
  <div class="va-input-card__tabs">
    <button class="va-input-card__tab va-input-card__tab--active">
      ✏️ Text to Speech
    </button>
    <button class="va-input-card__tab">
      📤 Upload File
    </button>
  </div>
  <div class="va-input-card__body">
    <textarea placeholder="Type or paste your text here..."></textarea>
  </div>
  <div class="va-input-card__footer">
    <div class="va-input-card__pills">
      <button class="va-category-pill va-category-pill--active">▶ YouTube</button>
      <button class="va-category-pill">📝 Narration</button>
      <button class="va-category-pill">📢 Advertisement</button>
      <button class="va-category-pill">🎙 Podcast</button>
    </div>
    <div class="va-input-card__meta">
      <span>400/1000</span>
      <button class="va-input-card__send">➤</button>
    </div>
  </div>
</div>
```

### Badges & Tags

```html
<!-- Hero badge -->
<span class="va-badge va-badge--dark va-badge--pill">
  <span class="va-badge__icon">💬</span>
  DON'T SPEAK JUST TYPE
</span>

<!-- Section badge -->
<span class="va-section-badge">FOR DEVELOPERS</span>

<!-- Discount tag -->
<span class="va-tag">ANNUAL DISCOUNT <strong>%40</strong></span>
```

### Auth Forms

```html
<div class="va-auth">
  <h2 class="va-auth__header">Create an Account</h2>
  <p class="va-auth__subtitle">You are few moments away from getting started!</p>

  <form class="va-auth__form">
    <div class="va-form-group">
      <label class="va-form-label">Email</label>
      <input class="va-form-input" type="email" placeholder="Email Address">
    </div>
    <div class="va-form-group">
      <label class="va-form-label">Password</label>
      <input class="va-form-input" type="password">
    </div>
    <button class="va-btn va-btn--primary va-btn--block va-auth__submit">Sign up</button>

    <div class="va-auth__divider">or</div>

    <button class="va-auth__social-btn">G Continue with Google</button>
    <button class="va-auth__social-btn">⊞ Continue with Microsoft</button>

    <p class="va-auth__footer">Already have an account? <a href="#">Log In</a></p>
  </form>
</div>
```

---

## Page Patterns

### Landing Page Structure

```
┌─────────────────────────────────────┐
│ Navbar                              │
├─────────────────────────────────────┤
│ Hero Section                        │
│   Badge → Headline → Subtitle      │
│   CTA Buttons                       │
│   TTS Input Card                    │
│   Client Logo Bar                   │
├─────────────────────────────────────┤
│ Feature Section (2-col)             │
│   Text Left  │  Visual Right        │
├─────────────────────────────────────┤
│ Feature Section (2-col, reversed)   │
│   Visual Left │  Text Right         │
├─────────────────────────────────────┤
│ Pricing Section                     │
│   Tabs → 3-Column Cards             │
├─────────────────────────────────────┤
│ Blog/Insights Section               │
│   4-Column Card Grid                │
├─────────────────────────────────────┤
│ Footer                              │
│   Multi-column Links + Copyright    │
└─────────────────────────────────────┘
```

### Feature Section Pattern

```html
<section class="va-section">
  <div class="va-container">
    <div class="va-feature-row">
      <div class="va-feature-row__content">
        <span class="va-section-badge">FOR DEVELOPERS</span>
        <h2>Experience the Fastest, Most Powerful Text-to-Speech API</h2>
        <p>Delivering natural, high-quality voice with low latency...</p>
        <div class="va-feature-row__actions">
          <button class="va-btn va-btn--accent">Get API Key</button>
          <a class="va-btn va-btn--ghost">Learn more →</a>
        </div>
      </div>
      <div class="va-feature-row__visual">
        <!-- Voice agent card or visual goes here -->
      </div>
    </div>
  </div>
</section>
```

---

## Responsive Breakpoints

| Name | Min Width | Container | Usage |
|------|-----------|-----------|-------|
| `xs` | 0 | 100% | Mobile phones |
| `sm` | 576px | 540px | Large phones |
| `md` | 768px | 720px | Tablets |
| `lg` | 992px | 960px | Small desktops |
| `xl` | 1200px | 1140px | Standard desktops |
| `xxl` | 1400px | 1320px | Large screens |

### Mobile Adaptations

- **Navbar**: Collapses to hamburger menu
- **Hero**: Font sizes reduce, single-column layout
- **Pricing Cards**: Stack vertically
- **Feature Rows**: Stack vertically (content then visual)
- **Blog Cards**: 2-column on tablet, 1-column on mobile
- **Footer**: Single-column stacked links

---

## Icons & Visual Assets

The design system includes a curated set of icons, brand assets, decorative patterns, and illustration mockups. See **[ASSET_GUIDELINES.md](./ASSET_GUIDELINES.md)** for the full reference, and **[site/asset-gallery.html](./site/asset-gallery.html)** for a visual showcase.

### Icon Library: Lucide

[Lucide Icons](https://lucide.dev/) (MIT license) is the primary icon library — 1,900+ clean, stroke-based icons. 54 curated icons are pre-selected in `assets/icons/lucide/`.

```html
<!-- Inline SVG -->
<svg class="va-icon" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- path data from Lucide -->
</svg>

<!-- CDN auto-replace -->
<i data-lucide="mic" class="va-icon"></i>
```

### Brand Assets

| Asset | File | Description |
|-------|------|-------------|
| Logo Mark | `assets/brand/logo-icon.svg` | Sound-wave arcs icon |
| Logo Mark (White) | `assets/brand/logo-icon-white.svg` | White variant for dark backgrounds |
| Full Logo | `assets/brand/logo-full.svg` | Icon + "Voice Aura" wordmark |

### Decorative Patterns

| Pattern | Method | File / Mixin |
|---------|--------|--------------|
| Halftone Dots | CSS mixin | `@include va-halftone-overlay()` |
| Halftone Dots | SVG tile | `assets/patterns/halftone-dots.svg` |
| Sound Wave Bars | CSS | `.va-hero__wave` + `.va-hero__wave-bar` |
| Sound Wave | SVG | `assets/patterns/sound-wave-hero.svg` |
| Wave Divider | SVG | `assets/patterns/wave-divider.svg` |
| Grid Dots | SVG tile | `assets/patterns/grid-dots.svg` |

### Typography

Fonts: **IBM Plex Serif**, **IBM Plex Sans**, **IBM Plex Mono** — all from [Google Fonts](https://fonts.google.com/) under the SIL Open Font License.

### Open-Source Asset Sources

| Platform | License | Best For | Attribution |
|----------|---------|----------|-------------|
| [Lucide](https://lucide.dev/) | ISC/MIT | UI icons (primary) | No |
| [Phosphor](https://phosphoricons.com/) | MIT | Extended icon needs | No |
| [Heroicons](https://heroicons.com/) | MIT | Alternative UI icons | No |
| [Tabler Icons](https://tabler.io/icons) | MIT | Rare/specific icons (5,800+) | No |
| [unDraw](https://undraw.co/) | CC0 | Feature illustrations | No |
| [OpenPeeps](https://www.openpeeps.com/) | CC0 | People illustrations | No |
| [Freepik](https://www.freepik.com/) | Free+attribution | Polished vectors, marketing art | **Yes (free tier)** |
| [Flaticon](https://www.flaticon.com/) | Free+attribution | Specialized/decorative icons | **Yes (free tier)** |
| [Storyset](https://storyset.com/) | Free+attribution | Animated illustrations | **Yes** |
| [SVG Repo](https://svgrepo.com/) | Varies | SVG assets | Check per asset |
| [Hero Patterns](https://heropatterns.com/) | Free | Background patterns | No |
| [Unsplash](https://unsplash.com/) | Free | Hero/stock photos | No (appreciated) |
| [Pexels](https://www.pexels.com/) | Free | Alternative stock photos | No (appreciated) |

> See [ASSET_GUIDELINES.md](./ASSET_GUIDELINES.md) for detailed sourcing workflows, file format guidelines, naming conventions, and platform-specific usage instructions.

---

## File Structure

```
voice-aura-design-system/
├── scss/
│   ├── abstracts/
│   │   ├── _variables.scss      # Design tokens, Bootstrap overrides
│   │   ├── _mixins.scss         # Reusable mixins
│   │   └── _functions.scss      # Sass utility functions
│   ├── base/
│   │   ├── _reset.scss          # CSS reset/normalize
│   │   └── _typography.scss     # Type system, font imports
│   ├── components/
│   │   ├── _buttons.scss        # Button variants
│   │   ├── _cards.scss          # Card variants
│   │   ├── _pricing.scss        # Pricing cards
│   │   ├── _forms.scss          # Form elements & TTS input
│   │   ├── _badges.scss         # Badges, pills, tags
│   │   ├── _blog-card.scss      # Blog/article cards
│   │   ├── _voice-agent.scss    # Voice agent card
│   │   └── _auth.scss           # Auth forms
│   ├── layout/
│   │   ├── _navbar.scss         # Navigation bar
│   │   ├── _hero.scss           # Hero section
│   │   ├── _section.scss        # Section layouts
│   │   ├── _footer.scss         # Footer
│   │   └── _grid.scss           # Grid extensions
│   ├── vendors/
│   │   └── _bootstrap.scss      # Bootstrap imports
│   └── voice-aura.scss          # Main entry point
├── assets/
│   ├── brand/                   # Logo SVGs
│   ├── icons/                   # Custom + Lucide icons
│   ├── patterns/                # SVG pattern tiles & decorations
│   └── illustrations/           # Mockups & illustrations
├── dist/
│   └── css/
│       └── voice-aura.css       # Compiled CSS
├── site/
│   ├── components.html          # Component visual reference
│   └── asset-gallery.html       # Asset showcase page
├── package.json
├── DESIGN_SYSTEM.md             # Design system specification
└── ASSET_GUIDELINES.md          # Asset & resource guidelines
```

---

## Extending the System

### Adding New Components

1. Create a new file in `scss/components/` with `_` prefix
2. Use the `va-` namespace for all classes
3. Reference existing variables from `_variables.scss`
4. Import in `voice-aura.scss`
5. Document in this file

### Customizing for Your Brand

Override variables before importing Voice Aura:

```scss
// Your project's main.scss
$va-primary: #YOUR_BRAND_COLOR;
$va-dark: #YOUR_DARK_COLOR;
$va-font-heading: 'Your Heading Font', serif;

@import 'voice-aura-design-system/scss/voice-aura';
```

---

## Rails Integration

For detailed instructions on integrating this design system into a **Ruby on Rails** application with Bootstrap, Sass, and modern asset bundling (esbuild, Webpack 5, or Dart Sass), see:

**[RAILS_INTEGRATION.md](./RAILS_INTEGRATION.md)**

The guide covers:

- **Three installation options:** esbuild (jsbundling-rails), Webpack 5 (jsbundling-rails), and Dart Sass + Propshaft
- **SCSS integration** with proper load paths and import order
- **Font setup** (Google Fonts CDN, self-hosted, or npm)
- **Icon helpers** (a `va_icon` Ruby helper for inline SVG rendering)
- **SVG asset management** (patterns, brand logos, illustrations)
- **View partials** (navbar, footer, hero, cards, pricing, auth forms)
- **Customizing variables** through your app's SCSS files
- **Using mixins** in your own components
- **Troubleshooting** common path, font, and build issues
- **Quick-reference cheat sheet** with file paths and class prefixes

### Quick Start (esbuild + cssbundling-rails)

```bash
# 1. Copy the design system
cp -r /path/to/voice-aura-design-system vendor/voice-aura-design-system

# 2. Install dependencies
yarn add bootstrap@^5.3 lucide

# 3. Add load paths to the build:css script in package.json
#    --load-path=node_modules --load-path=vendor/voice-aura-design-system/scss

# 4. Import in your SCSS entry point
#    @import "voice-aura";
```

See an example Rails SCSS entry point at: `examples/rails_application.scss`

---

## Agent Skills & GitHub Setup

This design system ships with built-in configuration for AI coding agents (Devin for Terminal, Windsurf, Cursor, and others).

### What's Included

| File | Purpose |
|------|---------|
| `AGENTS.md` | Always-on project rules (build commands, conventions, asset rules) |
| `.devin/config.json` | Pre-approved permissions for Devin for Terminal |
| `.devin/skills/voice-aura-design-system/SKILL.md` | Interactive skill with 5 task-specific commands |
| `SKILLS.md` | Full agent skills documentation + GitHub CLI push instructions |

### Devin Skill Commands

```
/voice-aura-design-system setup        # Initial project integration
/voice-aura-design-system component    # Look up component styles
/voice-aura-design-system icon         # Find and use icons
/voice-aura-design-system rails        # Full Rails integration
/voice-aura-design-system troubleshoot # Debug build issues
```

### Setup for Other Agents

- **Windsurf:** Copy `.devin/skills/` to `.windsurf/skills/` (same format)
- **Cursor:** Create `.cursor/rules/voice-aura.md` with project conventions
- **Generic:** All agents can read `AGENTS.md` automatically

### GitHub Push (Quick Reference)

```bash
git init && git add . && git commit -m "Initial commit"
gh repo create voice-aura-design-system --public --source=. --push
```

### GitHub Pages (Live Demo)

A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) automatically builds the CSS and deploys a static demo site on every push to `main`:

- **Landing page** — `https://reckerswartz.github.io/voice-aura-design-system/`
- **Component Reference** — `/site/components.html`
- **Asset Showcase** — `/site/asset-gallery.html`

To enable: go to **Settings > Pages > Source > GitHub Actions**, then push to `main`.

See `SKILLS.md` for the complete GitHub CLI walkthrough, `.gitignore` template, GitHub Pages setup, and release instructions.

---

*Design system extracted from the Voice Aura AI Voice Generator & Text-to-Speech Website Design by Rah Man, UI Farid Hossain, UXify Studio, Murad Hossain, and Design Dynamix.*
