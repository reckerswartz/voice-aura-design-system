# Voice Aura Design System — Rails Integration Guide

> Step-by-step instructions for integrating the Voice Aura design system into a Ruby on Rails application that uses **Bootstrap**, **Sass**, and modern asset bundling (**esbuild**, **Webpack 5**, or **Dart Sass**).

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Directory Reference Map](#directory-reference-map)
3. [Installation](#installation)
   - [Option A: esbuild (jsbundling-rails + cssbundling-rails)](#option-a-esbuild-jsbundling-rails--cssbundling-rails)
   - [Option B: Webpack 5 (jsbundling-rails + cssbundling-rails)](#option-b-webpack-5-jsbundling-rails--cssbundling-rails)
   - [Option C: Dart Sass + Propshaft (No Node Bundler)](#option-c-dart-sass--propshaft-no-node-bundler)
4. [SCSS Integration — Layer by Layer](#scss-integration--layer-by-layer)
5. [Fonts Setup](#fonts-setup)
6. [Icons Setup (Lucide)](#icons-setup-lucide)
7. [SVG Assets (Patterns, Brand, Illustrations)](#svg-assets-patterns-brand-illustrations)
8. [View Helpers & Partials](#view-helpers--partials)
9. [Customizing the Design System in Your App](#customizing-the-design-system-in-your-app)
10. [Common Patterns in ERB Templates](#common-patterns-in-erb-templates)
11. [Troubleshooting](#troubleshooting)
12. [Quick-Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|-------------|-----------------|-------|
| Ruby | 3.1+ | |
| Rails | 7.0+ | Rails 7.x or 8.x with modern asset bundling |
| Node.js | 18+ | Required for esbuild / Webpack / Sass CLI |
| Yarn or npm | Yarn 1.22+ or npm 9+ | |
| Bootstrap | 5.3+ | Already included in the design system |

### Recommended Gem Stack

```ruby
# Gemfile — choose ONE JS bundler + ONE CSS bundler

# JavaScript bundling (pick one)
gem "jsbundling-rails"     # provides esbuild, Webpack 5, or Rollup

# CSS bundling (pick one)
gem "cssbundling-rails"    # Sass CLI build with --load-path support
# OR
gem "dartsass-rails"       # Dart Sass via Rails, no Node required for CSS

# Asset pipeline
gem "propshaft"            # Modern replacement for Sprockets (Rails 7+ default)
```

> **Deprecated tools not used:** This guide does not reference Webpacker, Sprockets, sassc-rails, or Turbolinks. Those tools are deprecated and should be replaced with the stack above.

---

## Directory Reference Map

Before you begin, familiarize yourself with the design system source. Everything lives under a single directory:

```
voice-aura-design-system/            <── ROOT (the guideline you are integrating)
│
├── DESIGN_SYSTEM.md                 # Full design specification
├── ASSET_GUIDELINES.md              # Icons, fonts, patterns, licensing
├── RAILS_INTEGRATION.md             # THIS FILE
│
├── scss/                            # All SCSS source files
│   ├── voice-aura.scss              # Main entry point (imports everything)
│   ├── abstracts/
│   │   ├── _variables.scss          # Design tokens & Bootstrap overrides
│   │   ├── _functions.scss          # Sass utility functions
│   │   └── _mixins.scss             # Reusable mixins
│   ├── vendors/
│   │   └── _bootstrap.scss          # Selective Bootstrap 5 module imports
│   ├── base/
│   │   ├── _reset.scss              # CSS reset / normalize
│   │   └── _typography.scss         # Type system, Google Fonts imports
│   ├── layout/
│   │   ├── _grid.scss               # Grid extensions
│   │   ├── _navbar.scss             # Navigation bar
│   │   ├── _hero.scss               # Hero section + wave & halftone
│   │   ├── _section.scss            # Section layouts
│   │   └── _footer.scss             # Footer
│   └── components/
│       ├── _buttons.scss            # .va-btn variants
│       ├── _cards.scss              # .va-card variants
│       ├── _badges.scss             # Badges, pills, tags
│       ├── _forms.scss              # Form elements & TTS input card
│       ├── _pricing.scss            # Pricing cards
│       ├── _blog-card.scss          # Blog / article cards
│       ├── _voice-agent.scss        # Voice agent card
│       └── _auth.scss               # Auth forms (sign-up / log-in)
│
├── assets/
│   ├── brand/                       # logo-icon.svg, logo-full.svg, logo-icon-white.svg
│   ├── icons/                       # Custom SVGs + lucide/ (54 curated icons)
│   ├── patterns/                    # halftone-dots, grid-dots, sound-wave-hero, wave-divider
│   └── illustrations/              # voice-studio-mockup.svg, phone-mockup.svg
│
├── dist/css/                        # Pre-compiled CSS (voice-aura.css, voice-aura.min.css)
│
└── docs/
    ├── reference.html               # Visual component reference
    └── assets.html                  # Asset showcase page
```

**Guideline documents to read first:**

| Document | What it covers |
|----------|----------------|
| `DESIGN_SYSTEM.md` | Colors, typography, spacing, border-radius, shadows, components, page patterns, breakpoints |
| `ASSET_GUIDELINES.md` | Icons (Lucide), brand SVGs, patterns, fonts (IBM Plex), open-source sources, accessibility, licensing |
| `docs/reference.html` | Open in a browser to see every component rendered |
| `docs/assets.html` | Open in a browser to see all icons, patterns, and mockups |

---

## Installation

### Option A: esbuild (jsbundling-rails + cssbundling-rails)

The fastest and most popular modern Rails setup. Uses **esbuild** for JavaScript and the **Sass CLI** for stylesheets.

#### Step 1 — Set up Rails gems

```ruby
# Gemfile
gem "propshaft"
gem "jsbundling-rails"
gem "cssbundling-rails"
```

```bash
bundle install
rails javascript:install:esbuild
rails css:install:sass
```

#### Step 2 — Add the design system to your project

Copy (or symlink) the `voice-aura-design-system/` directory into your Rails root:

```bash
# From your Rails project root:
cp -r /path/to/voice-aura-design-system vendor/voice-aura-design-system
```

Or add it as a git submodule:

```bash
git submodule add <repo-url> vendor/voice-aura-design-system
```

#### Step 3 — Install Node dependencies

```bash
yarn add bootstrap@^5.3
yarn add lucide                       # optional — for JS-rendered icons
```

#### Step 4 — Configure the Sass build to include the design system

Update the `build:css` script in `package.json` to add both load paths:

```json
{
  "scripts": {
    "build:css": "sass ./app/assets/stylesheets/application.scss:./app/assets/builds/application.css --no-source-map --load-path=node_modules --load-path=vendor/voice-aura-design-system/scss --quiet-deps",
    "build:css:dev": "sass ./app/assets/stylesheets/application.scss:./app/assets/builds/application.css --source-map --load-path=node_modules --load-path=vendor/voice-aura-design-system/scss --quiet-deps --watch",
    "build": "esbuild app/javascript/*.* --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets"
  }
}
```

> The `--load-path=vendor/voice-aura-design-system/scss` flag lets `@import "voice-aura"` resolve correctly. The `--quiet-deps` flag suppresses Bootstrap's `@import` deprecation warnings.

#### Step 5 — Create your application stylesheet

In `app/assets/stylesheets/application.scss`:

```scss
// ============================================================================
// Application Stylesheet — Voice Aura Design System
// ============================================================================
//
// HOW THIS WORKS:
//   1. Override any Voice Aura variable BEFORE the main import.
//   2. Import the full design system (which pulls in Bootstrap + all components).
//   3. Add your app-specific styles AFTER the import.
//
// REFERENCE:
//   All available variables → vendor/voice-aura-design-system/scss/abstracts/_variables.scss
//   All available mixins   → vendor/voice-aura-design-system/scss/abstracts/_mixins.scss
//   Full design spec       → vendor/voice-aura-design-system/DESIGN_SYSTEM.md
// ============================================================================

// ---------------------------------------------------------------------------
// 1. YOUR OVERRIDES (optional — set before the import to take effect)
// ---------------------------------------------------------------------------
// $va-primary-blue:    #0478FF;
// $va-near-black:      #1A1919;
// $va-font-heading:    'IBM Plex Serif', serif;
// $va-radius:          0.75rem;

// ---------------------------------------------------------------------------
// 2. IMPORT THE DESIGN SYSTEM
// ---------------------------------------------------------------------------
@import "voice-aura";

// ---------------------------------------------------------------------------
// 3. YOUR APP-SPECIFIC STYLES
// ---------------------------------------------------------------------------
// Full access to $va-* variables, @include va-* mixins, va-color() function.
```

#### Step 6 — Set up the JavaScript entry point

In `app/javascript/application.js`:

```javascript
// Bootstrap JS (for dropdowns, modals, tooltips, etc.)
import "bootstrap"

// Lucide Icons (optional — auto-replace <i data-lucide="..."> elements)
import { createIcons, icons } from "lucide"
document.addEventListener("turbo:load", () => { createIcons({ icons }) })
```

#### Step 7 — Update your layout

In `app/views/layouts/application.html.erb`:

```erb
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= content_for?(:title) ? yield(:title) : "Voice Aura" %></title>

  <%# Google Fonts — IBM Plex family %>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">

  <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
  <%= javascript_include_tag "application", "data-turbo-track": "reload", type: "module" %>
  <%= csrf_meta_tags %>
  <%= csp_meta_tag %>
</head>
<body>
  <%= yield %>
</body>
</html>
```

---

### Option B: Webpack 5 (jsbundling-rails + cssbundling-rails)

For teams that prefer Webpack's module federation, code splitting, or advanced loader configuration.

#### Step 1 — Set up Rails gems

```ruby
# Gemfile
gem "propshaft"
gem "jsbundling-rails"
gem "cssbundling-rails"
```

```bash
bundle install
rails javascript:install:webpack
rails css:install:sass
```

#### Step 2 — Add the design system

```bash
cp -r /path/to/voice-aura-design-system vendor/voice-aura-design-system
```

#### Step 3 — Install Node dependencies

```bash
yarn add bootstrap@^5.3
yarn add lucide                       # optional
```

#### Step 4 — Configure Webpack to resolve the design system

In `webpack.config.js`, add the SCSS resolve path:

```javascript
// webpack.config.js
const path = require("path")

module.exports = {
  entry: {
    application: "./app/javascript/application.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "vendor/voice-aura-design-system/scss"),
      path.resolve(__dirname, "vendor/voice-aura-design-system/assets"),
      "node_modules",
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, "node_modules"),
                  path.resolve(__dirname, "vendor/voice-aura-design-system/scss"),
                ],
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
}
```

#### Step 5 — Configure the Sass build

The CSS is still compiled separately by cssbundling-rails. Update `package.json`:

```json
{
  "scripts": {
    "build:css": "sass ./app/assets/stylesheets/application.scss:./app/assets/builds/application.css --no-source-map --load-path=node_modules --load-path=vendor/voice-aura-design-system/scss --quiet-deps",
    "build": "webpack --config webpack.config.js"
  }
}
```

#### Step 6 — Create your stylesheet and JS entry point

Stylesheet — same as [Option A, Step 5](#step-5--create-your-application-stylesheet).

JavaScript — same as [Option A, Step 6](#step-6--set-up-the-javascript-entry-point).

Layout — same as [Option A, Step 7](#step-7--update-your-layout).

---

### Option C: Dart Sass + Propshaft (No Node Bundler)

A simpler setup that avoids Node-based bundling entirely. Uses `dartsass-rails` for CSS and `importmap-rails` for JavaScript.

#### Step 1 — Set up Rails gems

```ruby
# Gemfile
gem "propshaft"
gem "dartsass-rails"
gem "importmap-rails"
```

```bash
bundle install
rails dartsass:install
```

#### Step 2 — Add the design system

```bash
cp -r /path/to/voice-aura-design-system vendor/voice-aura-design-system
```

#### Step 3 — Install Bootstrap via yarn (for SCSS source files)

```bash
yarn add bootstrap@^5.3
```

> Even though this setup does not use a Node bundler for JS, Bootstrap's SCSS source is needed by the design system.

#### Step 4 — Configure Dart Sass load paths

In `config/initializers/dartsass.rb`:

```ruby
# config/initializers/dartsass.rb
Rails.application.config.dartsass.builds = {
  "application.scss" => "application.css"
}

# Add load paths for the design system and Bootstrap
Rails.application.config.dartsass.build_options =
  "--load-path=node_modules " \
  "--load-path=vendor/voice-aura-design-system/scss " \
  "--quiet-deps"
```

#### Step 5 — Create your stylesheet

In `app/assets/stylesheets/application.scss`:

```scss
// 1. Override variables (optional)
// $va-primary-blue: #YOUR_COLOR;

// 2. Import the design system
@import "voice-aura";

// 3. App-specific styles
```

#### Step 6 — Set up JavaScript via Importmaps

Pin Bootstrap and Lucide (no Node bundler needed):

```bash
bin/importmap pin bootstrap
```

In `app/javascript/application.js`:

```javascript
import "bootstrap"
```

> **Note:** Lucide's auto-replace feature requires a Node bundler or a CDN script tag. For importmaps, use the inline SVG helper (see [Icons Setup](#icons-setup-lucide)) instead.

#### Step 7 — Update your layout

In `app/views/layouts/application.html.erb`:

```erb
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= content_for?(:title) ? yield(:title) : "Voice Aura" %></title>

  <%# Google Fonts — IBM Plex family %>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">

  <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
  <%= javascript_importmap_tags %>
  <%= csrf_meta_tags %>
  <%= csp_meta_tag %>
</head>
<body>
  <%= yield %>
</body>
</html>
```

---

## SCSS Integration — Layer by Layer

The design system follows a strict import order. Understanding each layer helps you know where to make changes.

### Import Order

```
┌─────────────────────────────────────────────┐
│ 1. abstracts/_variables.scss                │  ← Design tokens. Override BEFORE import.
│ 2. abstracts/_functions.scss                │  ← Sass helper functions (va-color(), etc.)
│ 3. abstracts/_mixins.scss                   │  ← Reusable style patterns
├─────────────────────────────────────────────┤
│ 4. vendors/_bootstrap.scss                  │  ← Bootstrap 5 (selective module import)
├─────────────────────────────────────────────┤
│ 5. base/_reset.scss                         │  ← CSS reset / normalise
│ 6. base/_typography.scss                    │  ← Type scale, heading styles
├─────────────────────────────────────────────┤
│ 7. layout/_grid.scss                        │  ← .va-container, grid helpers
│ 8. layout/_navbar.scss                      │  ← .va-navbar
│ 9. layout/_hero.scss                        │  ← .va-hero, wave bars, halftone
│ 10. layout/_section.scss                    │  ← .va-section, .va-feature-row
│ 11. layout/_footer.scss                     │  ← .va-footer
├─────────────────────────────────────────────┤
│ 12. components/_buttons.scss                │  ← .va-btn variants
│ 13. components/_cards.scss                  │  ← .va-card variants
│ 14. components/_badges.scss                 │  ← .va-badge, .va-tag, .va-section-badge
│ 15. components/_forms.scss                  │  ← .va-form-*, .va-input-card
│ 16. components/_pricing.scss                │  ← .va-pricing, .va-pricing-card
│ 17. components/_blog-card.scss              │  ← .va-blog-card
│ 18. components/_voice-agent.scss            │  ← .va-voice-agent
│ 19. components/_auth.scss                   │  ← .va-auth
└─────────────────────────────────────────────┘
```

### Selective Import (Cherry-Pick Components)

If you only need certain parts, import layers individually instead of the full `voice-aura.scss`:

```scss
// app/assets/stylesheets/application.scss

// Always required — tokens and Bootstrap
@import "abstracts/variables";
@import "abstracts/functions";
@import "abstracts/mixins";
@import "vendors/bootstrap";

// Always recommended — base styles
@import "base/reset";
@import "base/typography";

// Pick only the layout modules you need
@import "layout/grid";
@import "layout/navbar";
// @import "layout/hero";       ← skip if not using hero sections
// @import "layout/section";
// @import "layout/footer";

// Pick only the components you need
@import "components/buttons";
@import "components/cards";
@import "components/forms";
// @import "components/pricing"; ← skip if not using pricing pages
// @import "components/auth";    ← skip if using Devise views
```

---

## Fonts Setup

IBM Plex is loaded from Google Fonts by default. There are three options for Rails:

### Option 1: Google Fonts CDN (Simplest)

Add to your layout `<head>`:

```erb
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Option 2: Self-Hosted (Best Performance & Privacy)

```bash
yarn add @ibm/plex
```

Create `app/assets/stylesheets/_fonts-local.scss`:

```scss
// Self-hosted IBM Plex fonts
// Copy woff2 files from node_modules/@ibm/plex to app/assets/fonts/
// then reference them with relative paths.

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('fonts/IBMPlexSans-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('fonts/IBMPlexSans-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('fonts/IBMPlexSans-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans';
  src: url('fonts/IBMPlexSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Serif';
  src: url('fonts/IBMPlexSerif-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Serif';
  src: url('fonts/IBMPlexSerif-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Mono';
  src: url('fonts/IBMPlexMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Copy the font files and import before the design system:

```bash
mkdir -p app/assets/fonts
cp node_modules/@ibm/plex/IBM-Plex-Sans/fonts/complete/woff2/IBMPlexSans-{Regular,Medium,SemiBold,Bold}.woff2 app/assets/fonts/
cp node_modules/@ibm/plex/IBM-Plex-Serif/fonts/complete/woff2/IBMPlexSerif-{SemiBold,Bold}.woff2 app/assets/fonts/
cp node_modules/@ibm/plex/IBM-Plex-Mono/fonts/complete/woff2/IBMPlexMono-Regular.woff2 app/assets/fonts/
```

```scss
@import "fonts-local";
@import "voice-aura";
```

### Option 3: npm Package (Sass Import)

```bash
yarn add @ibm/plex
```

```scss
// Import directly from the npm package (requires node_modules on the Sass load path)
@import "@ibm/plex/scss/ibm-plex";
@import "voice-aura";
```

---

## Icons Setup (Lucide)

### Option 1: Inline SVG Helper (Recommended for Rails)

Create a reusable helper that reads Lucide SVGs from the vendor directory:

```ruby
# app/helpers/icon_helper.rb
module IconHelper
  LUCIDE_PATH = Rails.root.join('vendor', 'voice-aura-design-system', 'assets', 'icons', 'lucide')
  CUSTOM_ICON_PATH = Rails.root.join('vendor', 'voice-aura-design-system', 'assets', 'icons')

  # Render a Lucide icon as inline SVG.
  #
  #   <%= va_icon "mic" %>
  #   <%= va_icon "send", size: 20, css_class: "va-icon--primary" %>
  #   <%= va_icon "headphones", size: 32, stroke_width: 1.5 %>
  #
  def va_icon(name, size: 24, css_class: "va-icon", stroke_width: 2, **attrs)
    # Try Lucide first, then custom icons
    file = LUCIDE_PATH.join("#{name}.svg")
    file = CUSTOM_ICON_PATH.join("#{name}.svg") unless file.exist?

    unless file.exist?
      Rails.logger.warn "[VoiceAura] Icon not found: #{name}"
      return content_tag(:span, name, class: css_class)
    end

    svg = file.read
    # Set size and class attributes
    svg = svg.gsub(/width="[^"]*"/, %(width="#{size}"))
             .gsub(/height="[^"]*"/, %(height="#{size}"))
             .gsub(/stroke-width="[^"]*"/, %(stroke-width="#{stroke_width}"))

    # Add CSS class
    svg = svg.sub('<svg', %(<svg class="#{css_class}" aria-hidden="true"))

    # Add any extra HTML attributes
    attrs.each do |key, val|
      svg = svg.sub('<svg', %(<svg #{key.to_s.dasherize}="#{val}"))
    end

    svg.html_safe
  end

  # Render the Voice Aura brand logo.
  #
  #   <%= va_logo %>
  #   <%= va_logo variant: :icon %>
  #   <%= va_logo variant: :white, size: 32 %>
  #
  def va_logo(variant: :full, size: nil)
    brand_path = Rails.root.join('vendor', 'voice-aura-design-system', 'assets', 'brand')

    filename = case variant
               when :icon  then 'logo-icon.svg'
               when :white then 'logo-icon-white.svg'
               else             'logo-full.svg'
               end

    file = brand_path.join(filename)
    return "" unless file.exist?

    svg = file.read
    if size
      svg = svg.gsub(/width="[^"]*"/, %(width="#{size}"))
               .gsub(/height="[^"]*"/, %(height="#{size}"))
    end

    svg.html_safe
  end
end
```

Usage in templates:

```erb
<%# Icon inside a button %>
<button class="va-btn va-btn--primary va-btn--icon">
  <%= va_icon "mic", size: 20 %>
  <span>Open Studio</span>
</button>

<%# Accent-colored icon %>
<%= va_icon "send", css_class: "va-icon va-icon--primary" %>

<%# Logo in navbar %>
<a href="/" class="va-navbar__brand">
  <%= va_logo variant: :full %>
</a>
```

### Option 2: Lucide via JavaScript (Auto-Replace)

If you prefer the JS approach (icons are rendered client-side from `<i>` tags):

```javascript
// app/javascript/application.js
import { createIcons, icons } from "lucide"

document.addEventListener("turbo:load", () => {
  createIcons({ icons })
})
```

```erb
<%# In your ERB template %>
<i data-lucide="mic" class="va-icon"></i>
<i data-lucide="headphones" class="va-icon"></i>
<i data-lucide="send" class="va-icon va-icon--primary"></i>
```

> **Note:** The JS auto-replace approach requires a Node bundler (esbuild or Webpack). For the Dart Sass + Propshaft setup (Option C), use the inline SVG helper instead.

---

## SVG Assets (Patterns, Brand, Illustrations)

### Copying Assets to the Public Directory

For SVGs referenced in CSS or `<img>` tags, copy them to the Rails public directory:

```bash
# Copy to public (simplest — no fingerprinting)
cp -r vendor/voice-aura-design-system/assets/patterns public/voice-aura/patterns
cp -r vendor/voice-aura-design-system/assets/illustrations public/voice-aura/illustrations
cp -r vendor/voice-aura-design-system/assets/brand public/voice-aura/brand
```

Or create a Rake task for automation:

```ruby
# lib/tasks/voice_aura.rake
namespace :voice_aura do
  desc "Copy Voice Aura design assets to public/"
  task copy_assets: :environment do
    src = Rails.root.join('vendor', 'voice-aura-design-system', 'assets')
    dest = Rails.root.join('public', 'voice-aura')

    FileUtils.rm_rf(dest)
    FileUtils.mkdir_p(dest)

    %w[brand patterns illustrations].each do |dir|
      FileUtils.cp_r(src.join(dir), dest.join(dir))
    end

    puts "Voice Aura assets copied to public/voice-aura/"
  end
end
```

```bash
rails voice_aura:copy_assets
```

### Using Patterns in Stylesheets

```scss
// In your app-specific SCSS (after @import "voice-aura")
.my-section--textured {
  background-image: url('/voice-aura/patterns/halftone-dots.svg');
  background-repeat: repeat;
  background-size: 16px 16px;
}

// Or use the CSS mixin (no image file needed):
.my-section--halftone {
  @include va-halftone-overlay(0.04, $va-near-black);
}
```

### Using Illustrations in Templates

```erb
<div class="va-feature-row__visual">
  <%= image_tag "/voice-aura/illustrations/voice-studio-mockup.svg",
                alt: "Voice Aura Studio",
                width: 600,
                height: 400,
                loading: "lazy" %>
</div>
```

---

## View Helpers & Partials

### Recommended Partials

Create shared partials for common Voice Aura components:

```erb
<%# app/views/shared/_va_navbar.html.erb %>
<nav class="va-navbar">
  <div class="va-container">
    <a href="/" class="va-navbar__brand">
      <%= va_logo variant: :full %>
    </a>
    <div class="va-navbar__links">
      <a href="/features" class="va-navbar__link">Features</a>
      <a href="/pricing" class="va-navbar__link">Pricing</a>
      <a href="/docs" class="va-navbar__link">API Docs</a>
      <a href="/blog" class="va-navbar__link">Blog</a>
    </div>
    <div class="va-navbar__actions">
      <a href="/login" class="va-btn va-btn--ghost">Log in</a>
      <a href="/signup" class="va-btn va-btn--primary">
        <%= va_icon "mic", size: 18 %>
        <span>Open Studio</span>
      </a>
    </div>
  </div>
</nav>
```

```erb
<%# app/views/shared/_va_footer.html.erb %>
<footer class="va-footer">
  <div class="va-container">
    <div class="va-footer__grid">
      <div class="va-footer__brand">
        <%= va_logo variant: :icon, size: 32 %>
        <p class="va-footer__tagline">AI Voice Generator & Text-to-Speech</p>
      </div>
      <div class="va-footer__column">
        <h4 class="va-footer__heading">Product</h4>
        <a href="/features" class="va-footer__link">Features</a>
        <a href="/pricing" class="va-footer__link">Pricing</a>
        <a href="/studio" class="va-footer__link">Voice Studio</a>
      </div>
      <%# ... more columns ... %>
    </div>
    <div class="va-footer__bottom">
      <p>&copy; <%= Date.current.year %> Voice Aura. All rights reserved.</p>
    </div>
  </div>
</footer>
```

### Using Partials in Layouts

```erb
<%# app/views/layouts/application.html.erb %>
<body>
  <%= render "shared/va_navbar" %>
  <%= yield %>
  <%= render "shared/va_footer" %>
</body>
```

---

## Customizing the Design System in Your App

### Overriding Variables

The most important file to understand is `scss/abstracts/_variables.scss`. Every design token is defined there with the `$va-` prefix. Override any variable **before** importing the design system:

```scss
// app/assets/stylesheets/application.scss

// ── YOUR BRAND OVERRIDES ──────────────────────────────────
$va-primary-blue:    #6C63FF;          // Change accent from blue to purple
$va-near-black:      #2D2B55;          // Change dark tone
$va-font-heading:    'Playfair Display', serif;  // Different heading font
$va-radius:          1rem;             // Rounder cards

// ── IMPORT (overrides take effect) ────────────────────────
@import "voice-aura";

// ── APP STYLES ────────────────────────────────────────────
// ...
```

### Common Variables You Might Override

| Variable | Default | What it changes |
|----------|---------|-----------------|
| `$va-primary-blue` | `#0478FF` | Accent colour for buttons, links, focus rings |
| `$va-near-black` | `#1A1919` | Primary dark — headings, dark buttons, halftone dots |
| `$va-light-grey` | `#E9E9EA` | Subtle backgrounds, borders |
| `$va-font-heading` | `IBM Plex Serif` | All heading fonts (h1–h4) |
| `$va-font-body` | `IBM Plex Sans` | All body text |
| `$va-radius` | `0.75rem` (12px) | Default card border-radius |
| `$va-radius-sm` | `0.5rem` (8px) | Button & input border-radius |
| `$va-section-padding-y` | `5rem` (80px) | Standard vertical section padding |
| `$va-shadow` | subtle box-shadow | Default card elevation shadow |
| `$va-halftone-pattern-opacity` | `0.06` | Halftone dot overlay intensity |
| `$va-container-max-width` | `80rem` (1280px) | Max width of `.va-container` |

### Adding New Components

Follow the design system's conventions:

```scss
// app/assets/stylesheets/components/_dashboard.scss

// Use the va- prefix for consistency
.va-dashboard {
  @include va-section-padding;

  &__header {
    @include va-heading-serif($font-weight-semibold);
    margin-bottom: map-get($spacers, 5);
  }

  &__card {
    @include va-card-elevated("md");
    transition: $va-transition-base;

    &:hover {
      box-shadow: $va-shadow-lg;
      transform: translateY(-2px);
    }
  }

  &__stat {
    font-family: $va-font-mono;
    font-size: map-get($va-font-sizes, "h2");
    color: $va-primary-blue;
  }
}
```

### Using Mixins in Your Styles

The design system provides these mixins (defined in `scss/abstracts/_mixins.scss`):

```scss
// Section spacing
@include va-section-padding;           // 80px top/bottom
@include va-section-padding("lg");     // 120px top/bottom

// Typography
@include va-heading-serif;             // Serif heading with proper weight
@include va-heading-serif(600);        // Custom weight

// Cards
@include va-card-elevated;             // Default shadow
@include va-card-elevated("lg");       // Large shadow
@include va-card-bordered;             // Border, no shadow

// Decorative
@include va-halftone-overlay;          // Dot pattern overlay
@include va-halftone-overlay(0.1, $va-primary-blue);  // Custom

// Glass effect
@include va-glass-effect;             // Frosted glass
@include va-glass-effect(0.8, 16px);  // Custom opacity & blur

// Text gradient
@include va-text-gradient;            // Primary blue gradient text

// Focus ring
@include va-focus-ring;               // Blue focus outline

// Responsive font size
@include va-responsive-font-size(1rem, 3.5rem);  // Fluid scaling

// Text truncation
@include va-truncate-lines(3);         // Clamp to 3 lines

// Aspect ratio
@include va-aspect-ratio(16, 9);       // 16:9 box

// Breakpoint media queries
@include va-media-up("md")   { ... }   // min-width: 768px
@include va-media-down("lg") { ... }   // max-width: 991.98px
```

---

## Common Patterns in ERB Templates

### Hero Section

```erb
<section class="va-hero">
  <span class="va-badge va-badge--dark va-badge--pill">
    <%= va_icon "sparkles", size: 14 %>
    DON'T SPEAK JUST TYPE
  </span>

  <h1 class="va-hero__title">Built for unmatched speed</h1>
  <p class="va-hero__subtitle">Fastest TTS API. Customizable voice Studio.</p>

  <div class="va-hero__actions">
    <a href="/studio" class="va-btn va-btn--primary va-btn--lg">
      <%= va_icon "mic", size: 20 %>
      <span>Open Studio</span>
    </a>
    <a href="/docs" class="va-btn va-btn--secondary va-btn--lg">
      <%= va_icon "code", size: 20 %>
      <span>API Docs</span>
    </a>
  </div>
</section>
```

### Feature Section (Two-Column)

```erb
<section class="va-section">
  <div class="va-container">
    <div class="va-feature-row">
      <div class="va-feature-row__content">
        <span class="va-section-badge">FOR DEVELOPERS</span>
        <h2>Experience the Fastest Text-to-Speech API</h2>
        <p>Delivering natural, high-quality voice output with industry-leading low latency.</p>
        <div class="va-feature-row__actions">
          <a href="/api" class="va-btn va-btn--accent">
            <%= va_icon "zap", size: 18 %>
            Get API Key
          </a>
          <a href="/docs" class="va-btn va-btn--ghost">Learn more →</a>
        </div>
      </div>
      <div class="va-feature-row__visual">
        <%= image_tag "/voice-aura/illustrations/voice-studio-mockup.svg",
                      alt: "API demo", loading: "lazy" %>
      </div>
    </div>
  </div>
</section>
```

### Card Grid

```erb
<section class="va-section va-section--alt">
  <div class="va-container">
    <h2 class="text-center mb-5">Latest Insights</h2>
    <div class="row g-4">
      <% @articles.each do |article| %>
        <div class="col-md-6 col-lg-3">
          <div class="va-blog-card">
            <%= image_tag article.cover_image, class: "va-blog-card__image", alt: article.title %>
            <div class="va-blog-card__body">
              <span class="va-blog-card__category"><%= article.category %></span>
              <h3 class="va-blog-card__title"><%= article.title %></h3>
              <p class="va-blog-card__excerpt"><%= truncate(article.excerpt, length: 100) %></p>
            </div>
          </div>
        </div>
      <% end %>
    </div>
  </div>
</section>
```

### Pricing Cards

```erb
<section class="va-section">
  <div class="va-container">
    <div class="va-pricing">
      <div class="va-pricing__tabs">
        <button class="va-pricing__tab va-pricing__tab--active">Studio</button>
        <button class="va-pricing__tab">API</button>
      </div>

      <div class="va-pricing__grid">
        <% @plans.each do |plan| %>
          <div class="va-pricing-card <%= 'va-pricing-card--featured' if plan.featured? %>">
            <span class="va-pricing-card__badge"><%= plan.name %></span>
            <div class="va-pricing-card__price">
              $<%= plan.price %> <span>/Month</span>
            </div>
            <p class="va-pricing-card__description"><%= plan.description %></p>
            <%= link_to plan.cta_text,
                        new_subscription_path(plan: plan.slug),
                        class: "va-btn #{plan.featured? ? 'va-btn--primary' : 'va-btn--secondary'} va-btn--block" %>
            <ul class="va-pricing-card__features">
              <% plan.features.each do |feature| %>
                <li class="va-pricing-card__feature">
                  <%= va_icon "check", size: 16, css_class: "va-icon va-icon--primary" %>
                  <%= feature %>
                </li>
              <% end %>
            </ul>
          </div>
        <% end %>
      </div>
    </div>
  </div>
</section>
```

### Auth Form (Sign Up)

```erb
<div class="va-auth">
  <h2 class="va-auth__header">Create an Account</h2>
  <p class="va-auth__subtitle">You are a few moments away from getting started!</p>

  <%= form_with model: @user, url: registration_path, class: "va-auth__form" do |f| %>
    <div class="va-form-group">
      <%= f.label :email, class: "va-form-label" %>
      <%= f.email_field :email, class: "va-form-input", placeholder: "Email Address" %>
    </div>
    <div class="va-form-group">
      <%= f.label :password, class: "va-form-label" %>
      <%= f.password_field :password, class: "va-form-input", placeholder: "Password" %>
    </div>
    <%= f.submit "Sign up", class: "va-btn va-btn--primary va-btn--block va-auth__submit" %>
  <% end %>

  <div class="va-auth__divider">or</div>

  <%= link_to user_google_oauth2_omniauth_authorize_path, class: "va-auth__social-btn" do %>
    <%= va_icon "globe", size: 18 %>
    Continue with Google
  <% end %>

  <p class="va-auth__footer">
    Already have an account? <%= link_to "Log In", new_session_path %>
  </p>
</div>
```

---

## Troubleshooting

### "File not found" errors during Sass compilation

**Cause:** The SCSS load path does not include the design system directory.

**Fix (cssbundling-rails):** Add `--load-path` to the build script in `package.json`:
```json
"build:css": "sass ... --load-path=vendor/voice-aura-design-system/scss"
```

**Fix (dartsass-rails):** Add to `config/initializers/dartsass.rb`:
```ruby
Rails.application.config.dartsass.build_options =
  "--load-path=node_modules " \
  "--load-path=vendor/voice-aura-design-system/scss"
```

**Fix (Webpack 5):** Add the path to `sassOptions.includePaths` in `webpack.config.js`:
```javascript
sassOptions: {
  includePaths: [
    path.resolve(__dirname, "vendor/voice-aura-design-system/scss"),
    path.resolve(__dirname, "node_modules"),
  ]
}
```

### Bootstrap path errors (`../../node_modules/bootstrap/...` not found)

**Cause:** The design system's `vendors/_bootstrap.scss` uses relative paths to `node_modules/`.

**Fix:** Ensure Bootstrap is installed via yarn/npm at the Rails root and create a symlink:

```bash
yarn add bootstrap@^5.3
ln -s ../../node_modules/bootstrap vendor/voice-aura-design-system/node_modules/bootstrap
```

Or add `node_modules` to the Sass load path (already included in the recommended `--load-path=node_modules`).

### Deprecation warnings about `@import`

**Cause:** Dart Sass 2.0 will remove `@import` in favour of `@use`/`@forward`. Bootstrap 5.3 still uses `@import`.

**Status:** These warnings are cosmetic and do not affect the build. They will be resolved when Bootstrap migrates to `@use`. Suppress them with:

```bash
sass --quiet-deps ...
```

Or in Webpack:

```javascript
sassOptions: { quietDeps: true }
```

### Fonts not loading

**Check:**
1. Google Fonts `<link>` tags are in your layout's `<head>`.
2. The font names in your SCSS match exactly: `'IBM Plex Serif'`, `'IBM Plex Sans'`, `'IBM Plex Mono'`.
3. If self-hosting, verify the font files exist in `app/assets/fonts/` and the `@font-face` `src` URLs match.

### Lucide icons not rendering

**Check:**
1. For inline SVG helper: verify `vendor/voice-aura-design-system/assets/icons/lucide/` exists and contains `.svg` files.
2. For JS approach: ensure `createIcons()` runs after the Turbo `turbo:load` event.
3. The `va_icon` helper returns `html_safe` — ensure your template uses `<%= %>`, not `<%- %>`.

### Propshaft does not find built CSS

**Check:** Ensure `app/assets/builds/` is in the asset paths and is generated by the build step:

```bash
yarn build:css
ls app/assets/builds/application.css
```

Verify `Procfile.dev` runs both JS and CSS build watchers:

```
web: bin/rails server
js: yarn build --watch
css: yarn build:css:dev
```

---

## Quick-Reference Cheat Sheet

### File Locations

| What | Path |
|------|------|
| Design system root | `vendor/voice-aura-design-system/` |
| Full specification | `vendor/voice-aura-design-system/DESIGN_SYSTEM.md` |
| Asset guidelines | `vendor/voice-aura-design-system/ASSET_GUIDELINES.md` |
| This guide | `vendor/voice-aura-design-system/RAILS_INTEGRATION.md` |
| All variables | `vendor/voice-aura-design-system/scss/abstracts/_variables.scss` |
| All mixins | `vendor/voice-aura-design-system/scss/abstracts/_mixins.scss` |
| SCSS entry point | `vendor/voice-aura-design-system/scss/voice-aura.scss` |
| Pre-built CSS | `vendor/voice-aura-design-system/dist/css/voice-aura.css` |
| Lucide icons | `vendor/voice-aura-design-system/assets/icons/lucide/` |
| Brand SVGs | `vendor/voice-aura-design-system/assets/brand/` |
| Visual reference | `vendor/voice-aura-design-system/docs/reference.html` |

### CSS Class Prefix

All Voice Aura classes use the `va-` prefix: `.va-btn`, `.va-card`, `.va-hero`, `.va-section`, etc. Standard Bootstrap classes (`container`, `row`, `col-*`, `d-flex`, `mt-3`, etc.) work alongside them.

### SCSS Variable Prefix

All design tokens use the `$va-` prefix: `$va-primary-blue`, `$va-font-heading`, `$va-radius`, `$va-shadow`, etc. Bootstrap's own variables (`$primary`, `$font-family-base`, etc.) are overridden automatically.

### Mixin Prefix

All mixins use the `va-` prefix: `@include va-section-padding`, `@include va-card-elevated("lg")`, `@include va-media-up("md")`, etc.

### Key Design Decisions

| Decision | Value | Rationale |
|----------|-------|-----------|
| Primary accent | `#0478FF` | Blue for interactive elements only |
| Heading font | IBM Plex Serif | Serif/sans pairing creates hierarchy |
| Spacing unit | 8px (`$va-grid-unit`) | All spacing is multiples of 8 |
| Section padding | 80px / 120px | Generous whitespace is a design feature |
| Border-radius | 8 / 12 / 16 / 24 / pill | Consistent roundedness scale |

---

*Part of the Voice Aura Design System. See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the complete specification, [ASSET_GUIDELINES.md](./ASSET_GUIDELINES.md) for icon and asset documentation, and [SKILLS.md](./SKILLS.md) for AI agent skills and GitHub CLI setup.*
