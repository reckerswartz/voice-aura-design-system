# Voice Aura — Template Guide

Reference guidance for using background patterns, visual elements, and responsive
transitions when building pages with the Voice Aura Design System.

> **Source of truth**: `scss/components/_backgrounds.scss` and `scss/components/_animations.scss`
> **Reference images**: `assets/reference/behance-*.jpg` (16 sliced sections)

---

## 1. Background Patterns

### Halftone Dot Overlay

The signature motif — a dramatic dot-field behind hero and feature sections.

```html
<!-- Bottom-concentrated (hero default) -->
<section class="va-pattern-halftone va-pattern-halftone--bottom">
  ...content...
</section>

<!-- Centered, left, or right variants -->
<div class="va-pattern-halftone va-pattern-halftone--center">...</div>
<div class="va-pattern-halftone va-pattern-halftone--left">...</div>
<div class="va-pattern-halftone va-pattern-halftone--right">...</div>

<!-- Dark variant (white dots on dark backgrounds) -->
<div class="va-pattern-halftone va-pattern-halftone--dark">...</div>

<!-- Light (reduced opacity for subtle sections) -->
<div class="va-pattern-halftone va-pattern-halftone--light">...</div>
```

**Reference**: behance-04 (hero), behance-05 (feature split), behance-11 (dark mockup)

### Sound-Wave Waveform

Full-width amplitude bar spanning the hero section middle.

```html
<!-- As a positioned pseudo-element on a parent -->
<section class="va-hero va-pattern-waveform-bg">...</section>

<!-- As a standalone positioned element -->
<div class="va-pattern-waveform">
  <img src="assets/patterns/sound-wave-wide.svg" alt="" aria-hidden="true" />
</div>
```

### Dot Grid

Uniform small dots behind pricing and feature sections. Pure CSS, no SVG needed.

```html
<section class="va-bg-dots">...</section>
<section class="va-bg-dots va-bg-dots--tight">...</section>  <!-- 16px grid -->
<section class="va-bg-dots va-bg-dots--loose">...</section>  <!-- 32px grid -->
<section class="va-bg-dots va-bg-dots--full">...</section>   <!-- No fade mask -->
```

### Grid Lines

Clean perpendicular lines for structured, technical layouts.

```html
<section class="va-bg-grid-lines">...</section>
<section class="va-bg-grid-lines va-bg-grid-lines--dense">...</section>
```

### Dark Grid Overlay

Subtle white grid lines on dark panels (feature visual cards).

```html
<div class="va-feature-visual--dark va-bg-dark-grid">
  ...voice agent or dubbing card...
</div>
```

**Reference**: behance-05 (dark card with crosshair lines)

### Circuit Lines / Concentric Rings / Diagonal Lines

```html
<section class="va-pattern-circuit">...</section>
<section class="va-pattern-circuit va-pattern-circuit--light">...</section>

<section class="va-pattern-rings">...</section>
<section class="va-pattern-rings va-pattern-rings--small">...</section>

<section class="va-pattern-diagonal">...</section>
```

### Mesh Gradient

Soft multi-blob ambient gradient.

```html
<section class="va-bg-mesh">...</section>
<section class="va-bg-mesh va-bg-mesh--dark">...</section>
```

### Noise / Grain Texture

```html
<section class="va-pattern-noise">...</section>
```

---

## 2. Glows & Gradients

### Radial Gradient Glow

Soft coloured glow behind content areas.

```html
<div class="va-bg-glow">...</div>                    <!-- Default blue -->
<div class="va-bg-glow va-bg-glow--neutral">...</div> <!-- Grey -->
<div class="va-bg-glow va-bg-glow--top-right">...</div>
<div class="va-bg-glow va-bg-glow--bottom-left">...</div>
```

**Custom properties**: `--va-glow-size`, `--va-glow-color`

### Section Backgrounds

```html
<section class="va-bg-white">...</section>
<section class="va-bg-alt">...</section>
<section class="va-bg-dark">...</section>
<section class="va-bg-gradient-subtle">...</section>
<section class="va-bg-gradient-primary">...</section>
<section class="va-bg-gradient-dark">...</section>
```

### Glass / Frosted Panel

```html
<div class="va-glass">...</div>
<div class="va-glass va-glass--strong">...</div>
<div class="va-glass va-glass--dark">...</div>
```

---

## 3. Decorative Elements

### Brand Text Watermark

Large faint "VOICE AURA" text as a background element.

```html
<div class="va-bg-brand-watermark">
  <span class="va-bg-brand-watermark__text" aria-hidden="true">VOICE AURA</span>
  ...content on top...
</div>
```

**Reference**: behance-05 (right panel behind voice agent card)

### Blue Accent Line (Cursor)

```html
<div class="va-accent-line"></div>                     <!-- Vertical 24px -->
<div class="va-accent-line va-accent-line--horizontal"></div>
<div class="va-accent-line va-accent-line--long"></div> <!-- 40px -->
```

### Floating Cursor Element

```html
<div class="va-hero__float-cursor" aria-hidden="true"
     style="position:absolute;left:12%;top:22%;"></div>
```

### Crosshair Corner Markers

```html
<div class="va-crosshairs">
  <div class="va-crosshairs__marks"></div>
  <div class="va-crosshairs__marks-bottom"></div>
  ...content...
</div>
```

### Section Separator

```html
<section class="va-section va-section-separator">...</section>
<section class="va-section va-section-separator--double">...</section>
```

---

## 4. Section Gradient Blends

Smooth gradient washes between adjacent sections — avoids hard edges.

```html
<!-- Fade from grey at top -->
<section class="va-section va-section-blend--top">...</section>

<!-- Fade to grey at bottom -->
<section class="va-section va-section-blend--bottom">...</section>

<!-- Both edges -->
<section class="va-section va-section-blend--both">...</section>

<!-- White variants -->
<section class="va-section va-section-blend--top va-section-blend--white-top">...</section>
```

**Reference**: behance-04/09 (hero → trust-bar → features transition)

---

## 5. Signup Showcase Panel

Gradient background treatment for auth/signup page left panel.

```html
<div class="va-bg-showcase">
  <div class="va-bg-showcase__halftone"></div>
  <!-- Brand logo, TTS card preview, floating A icon, etc. -->
</div>
```

**Reference**: behance-06/12 (signup page left panel)

---

## 6. Background Presets

Token packs that set `--va-pattern-opacity`, `--va-glow-size`, etc. for
specific page sections. Use alongside explicit pattern classes.

```html
<section class="va-bg-preset-hero va-pattern-halftone va-bg-glow">...</section>
<section class="va-bg-preset-feature-api va-bg-glow va-pattern-circuit">...</section>
<section class="va-bg-preset-feature-dubbing va-pattern-rings">...</section>
<section class="va-bg-preset-pricing va-bg-glow va-bg-mesh">...</section>
<section class="va-bg-preset-blog">...</section>
<section class="va-bg-preset-signup">...</section>
```

### Pattern Intensity Overrides

```html
<section class="va-pattern-halftone va-pattern-intensity-subtle">...</section>
<section class="va-pattern-halftone va-pattern-intensity-default">...</section>
<section class="va-pattern-halftone va-pattern-intensity-strong">...</section>
```

Or via custom property: `style="--va-pattern-opacity: 0.3;"`

---

## 7. Composing Multiple Layers

Use `.va-bg-layer` for additional pattern overlays inside a section.

```html
<section class="va-bg-stack va-bg-glow va-pattern-noise">
  <div class="va-bg-layer va-bg-layer--circuit"></div>
  <div class="va-bg-stack__content va-container">
    ...content...
  </div>
</section>
```

Available layers: `--circuit`, `--rings`, `--grid`, `--mesh`, `--diagonal`,
`--crosshair`, `--wave-divider`

---

## 8. Responsive Transition Animations

### Layout Morphing (Mobile ↔ Desktop)

Applied to layout containers so resizing produces smooth animations.

```html
<!-- Grid column transitions -->
<div class="va-pricing__grid va-grid-smooth">...</div>

<!-- Flex layout transitions -->
<div class="va-hero__actions va-flex-smooth">...</div>

<!-- Container width transitions -->
<div class="va-container va-container-smooth">...</div>

<!-- Section background pattern morphing -->
<section class="va-section va-section-morph">...</section>

<!-- Full page-level morph (applies to nested navbar, hero, grids) -->
<section class="va-section va-mobile-desktop-morph">...</section>
```

### Scroll-Triggered Entrance Animations

Pair with IntersectionObserver JS that adds `.is-visible` on viewport entry.

```html
<div class="va-scroll-fade-up">Content</div>
<div class="va-scroll-fade-in">Content</div>
<div class="va-scroll-scale-in">Content</div>
<div class="va-scroll-fade-left">Content</div>
<div class="va-scroll-fade-right">Content</div>
```

### Responsive Direction Animations

On desktop: slide from left/right. On mobile: fade up (vertical flow).

```html
<div class="va-responsive-fade-left">Text column</div>
<div class="va-responsive-fade-right">Visual column</div>
```

### Stagger Groups

Auto-stagger children entrance delays.

```html
<div class="va-scroll-stagger">
  <article>Card 1</article>  <!-- delay: 0s -->
  <article>Card 2</article>  <!-- delay: 0.1s -->
  <article>Card 3</article>  <!-- delay: 0.2s -->
</div>
```

### Named Entrance Presets

```html
<h1 class="va-entrance-hero">Headline</h1>
<p class="va-entrance-hero-sub">Subtitle</p>
<div class="va-entrance-hero-cta">CTA buttons</div>
<div class="va-entrance-feature">Feature text</div>
<div class="va-entrance-feature-visual">Feature visual</div>
<article class="va-entrance-card">Blog card</article>
<span class="va-entrance-badge">Badge</span>
```

### Interaction Animations

```html
<div class="va-hover-lift">Card with lift on hover</div>
<div class="va-hover-scale">Card with scale on hover</div>
<div class="va-hover-glow">Element with glow ring on hover</div>
<a class="va-hover-arrow">Link with arrow nudge →</a>
<div class="va-touch-lift">Touch-optimized lift</div>
```

### Responsive Visibility

Animated show/hide at breakpoints (instead of abrupt `d-none`).

```html
<div class="va-show-md">Hidden on mobile, fades in at md+</div>
<div class="va-show-lg">Hidden on mobile, fades in at lg+</div>
<div class="va-hide-md">Visible on mobile, hidden at md+</div>
```

---

## 9. Mobile-Specific Patterns

### Pricing Horizontal Scroll (Mobile)

On screens < 768px, `.va-pricing__grid` automatically becomes a horizontal
scroll carousel with snap points. No extra classes needed.

**Reference**: behance-16 (mobile pricing phones)

### Hero Full-Width CTAs (Mobile)

On screens < 768px, `.va-hero__actions` stacks buttons vertically at full width.
Floating decorative icons are hidden. No extra classes needed.

**Reference**: behance-14 (mobile hero phone)

### Feature Row Stack (Mobile)

On screens < 768px, `.va-feature-row` collapses from 2-column to single-column
with smooth transitions. Visual padding reduces automatically.

**Reference**: behance-14 (mobile features)

---

## 10. Reduced Motion

All animations respect `prefers-reduced-motion: reduce`. Scroll-triggered
elements remain visible (opacity: 1, transform: none) when motion is reduced.

---

## Quick Reference: Section Recipe

```html
<section class="
  va-section
  va-bg-preset-hero
  va-pattern-halftone va-pattern-halftone--bottom
  va-pattern-waveform-bg
  va-bg-glow
  va-section-morph
  va-hero-adapt
  va-mobile-desktop-morph
">
  <!-- Floating decorative icons (hidden on mobile automatically) -->
  <div class="va-hero__float va-hero__float--left va-hero__float--sm va-animate-float" aria-hidden="true">
    <svg>...microphone icon...</svg>
  </div>
  <div class="va-hero__float va-hero__float--right va-hero__float--letter va-animate-float" aria-hidden="true">A</div>

  <div class="va-container va-container-smooth">
    <div class="va-hero__badge va-entrance-badge">DON'T SPEAK JUST TYPE</div>
    <h1 class="va-hero__title va-entrance-hero">...</h1>
    <p class="va-hero__subtitle va-entrance-hero-sub">...</p>
    <div class="va-hero__actions va-entrance-hero-cta">
      <button class="va-hero__btn--primary">Open Studio</button>
      <button class="va-hero__btn--secondary">API Docs</button>
    </div>
  </div>
</section>
```

---

## SVG Asset Inventory

| Pattern | File | Usage |
|---------|------|-------|
| Halftone (wide) | `assets/patterns/halftone-wide.svg` | Hero, features, signup |
| Halftone (dots) | `assets/patterns/halftone-dots.svg` | Compact sections |
| Sound wave (wide) | `assets/patterns/sound-wave-wide.svg` | Hero waveform bar |
| Sound wave (hero) | `assets/patterns/sound-wave-hero.svg` | Hero accent |
| Grid lines | `assets/patterns/grid-lines.svg` | Technical sections |
| Grid dots | `assets/patterns/grid-dots.svg` | Alternate dot grid |
| Circuit lines | `assets/patterns/circuit-lines.svg` | API/developer sections |
| Concentric rings | `assets/patterns/concentric-rings.svg` | Voice/audio sections |
| Diagonal lines | `assets/patterns/diagonal-lines.svg` | Texture depth |
| Noise texture | `assets/patterns/noise-texture.svg` | Film grain overlay |
| Mesh gradient | `assets/patterns/mesh-gradient.svg` | Ambient gradient |
| Crosshair | `assets/patterns/crosshair.svg` | Corner decorations |
| Wave divider | `assets/patterns/wave-divider.svg` | Section dividers |
| Radial gradient | `assets/patterns/gradient-radial-soft.svg` | Soft glow |
