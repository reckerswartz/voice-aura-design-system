# Voice Aura Design System

A premium SaaS design system built on **Bootstrap 5** and **Dart Sass**, extracted from the Voice Aura AI Voice Generator & Text-to-Speech platform design.

**[Live Demo](https://reckerswartz.github.io/voice-aura-design-system/)** | **[Component Reference](https://reckerswartz.github.io/voice-aura-design-system/site/components.html)** | **[Asset Showcase](https://reckerswartz.github.io/voice-aura-design-system/site/asset-gallery.html)**

---

## Features

- **20 SCSS partials** organized in 7-1 architecture (abstracts, base, components, layout, pages, vendors)
- **68 SVG assets** — 54 curated Lucide icons (MIT) + 14 custom (brand, patterns, illustrations)
- **IBM Plex typography** — Serif headings + Sans body + Mono code
- **Full component library** — buttons, cards, forms, pricing, auth, navbar, hero, footer, blog cards, voice agent cards, badges
- **Rails integration guide** — esbuild, Webpack 5, and Dart Sass + Propshaft options
- **AI agent skills** — built-in configs for Devin, Windsurf, Cursor, and generic agents
- **GitHub Pages CI/CD** — automatic build and deploy on every push to `main`
- **`va-` namespace** — all custom classes are prefixed to avoid collisions with your existing styles

## Quick Start

```bash
# Clone the repository
git clone https://github.com/reckerswartz/voice-aura-design-system.git
cd voice-aura-design-system

# Install dependencies
npm install

# Build CSS
npm run build

# Watch for changes during development
npm run watch:css
```

## Usage

### Include the compiled CSS

```html
<link rel="stylesheet" href="dist/css/voice-aura.css">
```

### Import in your Sass

```scss
@import "voice-aura-design-system/scss/voice-aura";
```

### Install from GitHub

```bash
npm install github:reckerswartz/voice-aura-design-system
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0478FF` | Interactive elements, CTAs, links |
| Near Black | `#1A1919` | Headings, primary text, dark backgrounds |
| Light Grey | `#E9E9EA` | Borders, dividers |
| Section BG | `#F7F7F8` | Alternating section backgrounds |
| Body Text | `#4B5563` | Paragraph text |
| Muted | `#9CA3AF` | Secondary text, captions |
| White | `#FFFFFF` | Card backgrounds, primary surfaces |

## Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | IBM Plex Serif | 400, 500, 600, 700 |
| Body | IBM Plex Sans | 300, 400, 500, 600, 700 |
| Code | IBM Plex Mono | 400, 500 |

## Project Structure

```
voice-aura-design-system/
├── scss/
│   ├── abstracts/          # Variables, functions, mixins
│   ├── base/               # Reset, typography
│   ├── components/         # Buttons, cards, forms, pricing, auth, badges, etc.
│   ├── layout/             # Navbar, hero, sections, footer, grid
│   ├── vendors/            # Bootstrap 5 selective import
│   └── voice-aura.scss     # Main entry point
├── assets/
│   ├── brand/              # Logo SVGs (3)
│   ├── icons/lucide/       # Curated Lucide icons (54)
│   ├── icons/              # Custom feature icons (5)
│   ├── patterns/           # Decorative SVG patterns (4)
│   └── illustrations/      # Hero & mockup illustrations (2)
├── site/
│   ├── index.html          # Landing page (GitHub Pages)
│   ├── components.html     # Live component reference
│   └── asset-gallery.html  # Visual asset gallery
├── examples/
│   ├── rails_application.scss  # Drop-in Rails SCSS entry point
│   └── icon_helper.rb         # Ruby helper for inline SVG rendering
├── bin/
│   └── setup.js            # Automated setup script
├── .devin/                 # AI agent skills & config
├── .github/workflows/      # CI/CD for GitHub Pages
├── DESIGN_SYSTEM.md        # Full design system specification
├── RAILS_INTEGRATION.md    # Rails integration guide
├── ASSET_GUIDELINES.md     # Icon & asset usage rules
├── SKILLS.md               # Agent skills docs & GitHub setup
└── AGENTS.md               # Project rules for AI agents
```

## Components

| Component | File | Description |
|-----------|------|-------------|
| Buttons | `_buttons.scss` | Primary, accent, secondary, ghost variants; 3 sizes; pill & icon modifiers |
| Cards | `_cards.scss` | Bordered, elevated, interactive; with headers/footers |
| Forms | `_forms.scss` | Inputs, selects, textareas, checkboxes; TTS input card |
| Pricing | `_pricing.scss` | Three-tier pricing with tab selector and featured tier |
| Auth | `_auth.scss` | Sign up & login forms with social OAuth |
| Badges | `_badges.scss` | Status indicators, section badges, tags |
| Blog Cards | `_blog-card.scss` | Article cards with image, metadata, read-more |
| Voice Agent | `_voice-agent.scss` | Dark card with language selector and avatar |
| Navbar | `_navbar.scss` | Clean horizontal navigation |
| Hero | `_hero.scss` | Landing hero with badge, headline, dual CTAs |
| Footer | `_footer.scss` | Multi-column footer with brand and link groups |

## Rails Integration

Three modern installation paths are documented in [`RAILS_INTEGRATION.md`](./RAILS_INTEGRATION.md):

- **Option A:** esbuild (jsbundling-rails + cssbundling-rails)
- **Option B:** Webpack 5 (jsbundling-rails + cssbundling-rails)
- **Option C:** Dart Sass + Propshaft (no Node bundler)

Includes a drop-in SCSS entry point and a Ruby icon helper (`va_icon`, `va_logo`).

## AI Agent Support

This project ships with built-in configuration for AI coding agents:

| File | Agent |
|------|-------|
| `AGENTS.md` | Devin, Claude Code, Aider, generic |
| `.devin/skills/voice-aura-design-system/SKILL.md` | Devin for Terminal |
| `.devin/config.json` | Devin for Terminal |

Invoke the skill in Devin: `/voice-aura-design-system setup`

See [`SKILLS.md`](./SKILLS.md) for Windsurf, Cursor, and generic agent setup instructions.

## GitHub Pages

The live demo site is deployed automatically via GitHub Actions on every push to `main`:

- **Landing page:** [reckerswartz.github.io/voice-aura-design-system](https://reckerswartz.github.io/voice-aura-design-system/)
- **Component Reference:** [/site/components.html](https://reckerswartz.github.io/voice-aura-design-system/site/components.html)
- **Asset Showcase:** [/site/asset-gallery.html](https://reckerswartz.github.io/voice-aura-design-system/site/asset-gallery.html)

## Documentation

| Document | Description |
|----------|-------------|
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Full specification — colors, typography, spacing, components, patterns |
| [`RAILS_INTEGRATION.md`](./RAILS_INTEGRATION.md) | Step-by-step Rails integration guide |
| [`ASSET_GUIDELINES.md`](./ASSET_GUIDELINES.md) | Icon & asset usage rules, licensing, recommended platforms |
| [`SKILLS.md`](./SKILLS.md) | AI agent skills, npm setup, GitHub CLI & Pages instructions |

## License

ISC

## Credits

Design extracted from the Voice Aura AI Voice Generator & Text-to-Speech Website Design by Rah Man, UI Farid Hossain, UXify Studio, Murad Hossain, and Design Dynamix.
