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

## 9. New Background Patterns (v2)

### Radial Soft Gradient

Ambient haze effect — lighter than `va-bg-glow`, more organic. Uses `gradient-radial-soft.svg`.

```html
<section class="va-bg-radial-soft">...</section>
<section class="va-bg-radial-soft va-bg-radial-soft--top">...</section>
```

### Halftone Dots (Compact)

Circular halftone from `halftone-dots.svg`. For smaller panels and cards vs the wide hero field.

```html
<div class="va-pattern-halftone-dots">...</div>
```

### Halftone Band (Horizontal Mid-Section)

Dramatic horizontal halftone band across the middle of a panel. Reference: behance-05 left panel.

```html
<div class="va-pattern-halftone va-pattern-halftone--band">...</div>
```

### Sound Wave Hero SVG

Taller, more dramatic hero waveform variant from `sound-wave-hero.svg`.

```html
<section class="va-pattern-wave-hero">...</section>
```

### SVG Grid Dots

Crisper SVG-based dots from `grid-dots.svg` (alternative to CSS-only `va-bg-dots`).

```html
<section class="va-pattern-grid-dots">...</section>
<section class="va-pattern-grid-dots va-pattern-grid-dots--full">...</section>
```

### Voice Ripple Pattern

Organic sound-propagation rings radiating from a central source. Distinct from the
geometric `concentric-rings.svg` — these vary in stroke-weight and opacity to feel
like audio expanding outward. Uses `voice-ripple.svg`.

```html
<section class="va-pattern-voice-ripple">...</section>
<section class="va-pattern-voice-ripple va-pattern-voice-ripple--left">...</section>
<section class="va-pattern-voice-ripple va-pattern-voice-ripple--right">...</section>
<section class="va-pattern-voice-ripple va-pattern-voice-ripple--small">...</section>
<section class="va-pattern-voice-ripple va-pattern-voice-ripple--subtle">...</section>
```

**Custom property**: `--va-ripple-size` (default `640px`, shrinks to `400px` on mobile)

**Reference**: behance-04 hero ambient, behance-05/07 audio-tech motif

### Spotlight Gradient Overlay

Soft, off-center directional light wash behind content. Adds subtle depth and
dimension matching the ambient illumination in the Behance hero and pricing sections.
Uses `spotlight-gradient.svg`.

```html
<section class="va-bg-spotlight">...</section>                       <!-- Default: upper-left -->
<section class="va-bg-spotlight va-bg-spotlight--top-right">...</section>
<section class="va-bg-spotlight va-bg-spotlight--bottom-left">...</section>
<section class="va-bg-spotlight va-bg-spotlight--center">...</section>
```

**Reference**: behance-04 (hero), behance-08 (pricing)

### Feature Split Panel

Two adjacent panels (light + dark) as seen in behance-05 feature cards. Smoothly
collapses to single-column on mobile.

```html
<div class="va-feature-split">
  <div class="va-feature-split__light va-pattern-halftone va-pattern-halftone--band">
    <div class="va-app-icon va-app-icon--lg">...</div>
  </div>
  <div class="va-feature-split__dark va-bg-dark-grid va-bg-brand-watermark">
    <span class="va-bg-brand-watermark__text" aria-hidden="true">VOICE AURA</span>
    ...dark content...
  </div>
</div>
```

**Reference**: behance-05 (feature cards split)

### App Icon Component

Rounded-square app icon element. Reference: behance-05 / behance-07.

```html
<div class="va-app-icon">
  <svg>...waveform bars...</svg>
</div>
<div class="va-app-icon va-app-icon--lg">...</div>       <!-- 96px -->
<div class="va-app-icon va-app-icon--sm">...</div>       <!-- 56px -->
<div class="va-app-icon va-app-icon--animate">...</div>  <!-- Floating animation -->
```

### Additional Presets

```html
<footer class="va-bg-preset-footer va-pattern-noise">...</footer>
<div class="va-bg-preset-auth va-bg-glow va-pattern-halftone">...</div>
```

---

## 10. Mobile-Specific Patterns

### Pricing Horizontal Scroll (Mobile)

On screens < 768px, `.va-pricing-scroll` becomes a horizontal snap-scroll carousel
with peek effect. **Reference**: behance-16 (mobile pricing phones)

```html
<div class="va-pricing-scroll">
  <div class="va-pricing-card">...</div>
  <div class="va-pricing-card">...</div>
  <div class="va-pricing-card">...</div>
</div>
```

### Hero Full-Width CTAs (Mobile)

`.va-hero-actions-morph` smoothly stacks buttons full-width on mobile.
**Reference**: behance-14 (mobile hero phone)

```html
<div class="va-hero-actions-morph">
  <button class="va-btn va-btn--primary">Open Studio</button>
  <button class="va-btn va-btn--secondary">API Docs</button>
</div>
```

### Feature Row Collapse

`.va-feature-collapse` smoothly transitions from 2-column to 1-column at `lg`.
**Reference**: behance-14 (mobile features)

```html
<div class="va-feature-collapse">
  <div>Text content...</div>
  <div>Visual panel...</div>
</div>

<!-- Reverse order on desktop (visual left, text right) -->
<div class="va-feature-collapse va-feature-collapse--reverse">
  <div>Text content...</div>
  <div>Visual panel...</div>
</div>
```

### Hamburger Icon Morph

Animated ☰ → ✕ transition. Hidden on desktop, visible below `lg`.

```html
<button class="va-hamburger" aria-label="Menu">
  <span class="va-hamburger__bar"></span>
  <span class="va-hamburger__bar"></span>
  <span class="va-hamburger__bar"></span>
</button>
```

Toggle `is-open` class via JS:

```js
const btn = document.querySelector('.va-hamburger');
btn.addEventListener('click', () => btn.classList.toggle('is-open'));
```

### Responsive Pattern Fade

Smoothly reduces pattern opacity on smaller screens instead of abrupt hide.

```html
<section class="va-pattern-responsive-fade va-pattern-halftone">...</section>
```

| Breakpoint | Opacity multiplier |
|---|---|
| Desktop (lg+) | `--va-pattern-opacity` (full) |
| Tablet (md) | × 0.5 |
| Phone (sm) | × 0.3 |

### Card Grid Responsive Reflow

Animates card grids with smooth column transitions.

```html
<div class="va-card-grid-reflow va-card-grid-reflow--3">
  <article>...</article>
  <article>...</article>
  <article>...</article>
</div>
```

Variants: `--2` (2→1 at md), `--3` (3→2→1), `--4` (4→2→1)

### Responsive Stack

General-purpose utility that smoothly transitions any flex-row to flex-column.

```html
<div class="va-responsive-stack">        <!-- Stacks at md (768px) -->
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<div class="va-responsive-stack va-responsive-stack--lg">  <!-- Stacks at lg (992px) -->
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<div class="va-responsive-stack va-responsive-stack--sm">  <!-- Stacks at sm (576px) -->
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

### Responsive Order (Visual-First on Mobile)

Reorders children on mobile so the visual element appears above text content.
**Reference**: behance-14 (feature rows stack with visual above text)

```html
<div class="va-responsive-stack va-responsive-stack--lg va-responsive-order">
  <div>Text content (shows second on mobile)</div>
  <div>Visual panel (shows first on mobile)</div>
</div>
```

### Hero Secondary Button Mobile Adapt

Transitions the secondary hero CTA to a text-link style on mobile, reducing visual
weight while the primary button becomes full-width.
**Reference**: behance-14 ("API Docs" becomes text-link on mobile)

```html
<div class="va-hero-actions-morph">
  <button class="va-btn va-btn--primary">Open Studio</button>
  <button class="va-btn va-btn--secondary va-hero-secondary-adapt">API Docs</button>
</div>
```

### Scroll-Reveal Animations

Elements start hidden and animate in when scrolling into view via IntersectionObserver.

```html
<div class="va-reveal va-reveal--up">Fades up from below</div>
<div class="va-reveal va-reveal--down">Fades down from above</div>
<div class="va-reveal va-reveal--left">Slides from left</div>
<div class="va-reveal va-reveal--right">Slides from right</div>
<div class="va-reveal va-reveal--scale">Scales in</div>
```

Stagger delays (150ms increments): `--delay-1` through `--delay-4`

Speed modifiers: `--fast` (0.35s), `--slow` (0.9s)

JS (minimal IntersectionObserver):
```js
document.querySelectorAll('.va-reveal').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  }, { threshold: 0.15 }).observe(el);
});
```

---

## 11. Responsive Typography

Smooth font-size transitions when viewport crosses breakpoints.

```html
<h1 class="va-type-responsive">Headline</h1>
```

---

## 12. Reduced Motion

All animations respect `prefers-reduced-motion: reduce`. Scroll-triggered
elements remain visible (opacity: 1, transform: none) when motion is reduced.

---

## Section Recipes

### Hero Section (Full)

```html
<section class="
  va-section
  va-bg-preset-hero
  va-pattern-halftone va-pattern-halftone--bottom
  va-pattern-waveform-bg
  va-bg-glow
  va-section-morph
  va-pattern-responsive-fade
  va-hero-adapt
">
  <div class="va-hero__float va-hero__float--left va-hero__float--sm va-animate-float va-show-md" aria-hidden="true">
    <svg>...microphone icon...</svg>
  </div>
  <div class="va-hero__float va-hero__float--right va-hero__float--letter va-animate-float va-show-md" aria-hidden="true">A</div>

  <div class="va-container va-container-smooth">
    <div class="va-hero__badge va-entrance-badge">DON'T SPEAK JUST TYPE</div>
    <h1 class="va-hero__title va-entrance-hero va-type-responsive">...</h1>
    <p class="va-hero__subtitle va-entrance-hero-sub">...</p>
    <div class="va-hero-actions-morph va-entrance-hero-cta">
      <button class="va-btn va-btn--primary">Open Studio</button>
      <button class="va-btn va-btn--secondary">API Docs</button>
    </div>
  </div>
</section>
```

### Feature API Section

```html
<section class="va-section va-bg-preset-feature-api va-pattern-noise va-pattern-responsive-fade">
  <div class="va-feature-collapse">
    <div class="va-entrance-feature">
      <span class="va-section-badge">FOR DEVELOPERS</span>
      <h2>Experience the Fastest TTS API</h2>
      <p>...</p>
      <div class="va-hero-actions-morph">
        <button class="va-btn va-btn--primary">Get API Key</button>
        <a class="va-link-arrow va-hover-arrow">Learn more</a>
      </div>
    </div>
    <div class="va-entrance-feature-visual" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div class="va-feature-visual va-feature-visual--light va-pattern-halftone va-pattern-halftone--bottom">
        <div class="va-app-icon va-app-icon--lg va-hover-lift">
          <svg>...waveform icon...</svg>
        </div>
      </div>
      <div class="va-feature-visual va-feature-visual--dark va-bg-brand-watermark va-bg-dark-grid">
        <div class="va-agent-card va-agent-card--crosshairs">...</div>
      </div>
    </div>
  </div>
</section>
```

### Pricing Section

```html
<section class="va-section va-bg-preset-pricing va-bg-dots va-bg-glow va-pattern-responsive-fade">
  <div class="va-container">
    <h2 class="va-entrance-hero">Choose Pricing Plan</h2>
    <div class="va-pricing__tabs">...</div>
    <div class="va-pricing-scroll va-scroll-stagger">
      <div class="va-pricing-card va-touch-lift">...</div>
      <div class="va-pricing-card va-pricing-card--featured va-touch-lift">...</div>
      <div class="va-pricing-card va-touch-lift">...</div>
    </div>
  </div>
</section>
```

### Blog Section

```html
<section class="va-section va-bg-preset-blog va-pattern-responsive-fade">
  <div class="va-container">
    <h2>Insights & Updates</h2>
    <div class="va-card-grid-reflow va-card-grid-reflow--4 va-scroll-stagger">
      <article class="va-blog-card va-touch-lift">...</article>
      <article class="va-blog-card va-touch-lift">...</article>
      <article class="va-blog-card va-touch-lift">...</article>
      <article class="va-blog-card va-touch-lift">...</article>
    </div>
  </div>
</section>
```

### Footer

```html
<footer class="va-footer va-bg-preset-footer va-pattern-noise va-pattern-responsive-fade">
  <div class="va-container">
    <div class="va-card-grid-reflow va-card-grid-reflow--4">
      <div>Brand column</div>
      <div>Links column</div>
      <div>Products column</div>
      <div>How to Create column</div>
    </div>
  </div>
</footer>
```

---

## SVG Asset Inventory

| # | Pattern | File | SCSS Class | Used In |
|---|---------|------|------------|---------|
| 1 | Halftone (wide) | `assets/patterns/halftone-wide.svg` | `.va-pattern-halftone` | Hero, features, signup |
| 2 | Halftone (dots) | `assets/patterns/halftone-dots.svg` | `.va-pattern-halftone-dots` | Compact panels, cards |
| 3 | Sound wave (wide) | `assets/patterns/sound-wave-wide.svg` | `.va-pattern-waveform-bg` | Hero waveform bar |
| 4 | Sound wave (hero) | `assets/patterns/sound-wave-hero.svg` | `.va-pattern-wave-hero` | Hero accent (dramatic) |
| 5 | Grid lines | `assets/patterns/grid-lines.svg` | `.va-bg-grid-lines` | Technical sections |
| 6 | Grid dots | `assets/patterns/grid-dots.svg` | `.va-pattern-grid-dots` | SVG dot grid overlay |
| 7 | Circuit lines | `assets/patterns/circuit-lines.svg` | `.va-pattern-circuit` | API/developer sections |
| 8 | Concentric rings | `assets/patterns/concentric-rings.svg` | `.va-pattern-rings` | Voice/audio sections |
| 9 | Diagonal lines | `assets/patterns/diagonal-lines.svg` | `.va-pattern-diagonal` | Texture depth |
| 10 | Noise texture | `assets/patterns/noise-texture.svg` | `.va-pattern-noise` | Film grain overlay |
| 11 | Mesh gradient | `assets/patterns/mesh-gradient.svg` | `.va-bg-mesh` | Ambient gradient |
| 12 | Crosshair | `assets/patterns/crosshair.svg` | `.va-pattern-crosshair` | Corner decorations |
| 13 | Wave divider | `assets/patterns/wave-divider.svg` | `.va-pattern-wave-divider` | Section bottom dividers |
| 14 | Radial gradient | `assets/patterns/gradient-radial-soft.svg` | `.va-bg-radial-soft` | Soft ambient haze |
| 15 | Voice ripple | `assets/patterns/voice-ripple.svg` | `.va-pattern-voice-ripple` | Audio-themed sections |
| 16 | Spotlight gradient | `assets/patterns/spotlight-gradient.svg` | `.va-bg-spotlight` | Hero, pricing ambient light |

---

## Responsive Animation Quick Reference

| Class | Desktop behaviour | Mobile behaviour | Breakpoint |
|---|---|---|---|
| `.va-hero-actions-morph` | Inline flex buttons | Stacked full-width | md (768px) |
| `.va-feature-collapse` | 2-column grid | Single column | lg (992px) |
| `.va-pricing-scroll` | Default layout | Horizontal snap-scroll | md (768px) |
| `.va-card-grid-reflow--3` | 3 columns | 2 → 1 columns | lg → md |
| `.va-card-grid-reflow--4` | 4 columns | 2 → 1 columns | lg → md |
| `.va-hamburger` | Hidden | Visible (☰ → ✕ morph) | lg (992px) |
| `.va-pattern-responsive-fade` | Full opacity | × 0.5 (md), × 0.3 (sm) | md / sm |
| `.va-show-md` | Visible | Hidden (fade) | md (768px) |
| `.va-show-lg` | Visible | Hidden (fade) | lg (992px) |
| `.va-hide-md` | Hidden | Visible | md (768px) |
| `.va-responsive-fade-left` | Slide from left | Fade up | md (768px) |
| `.va-responsive-fade-right` | Slide from right | Fade up | md (768px) |
| `.va-type-responsive` | Smooth font-size transition | Smooth font-size transition | Any resize |
| `.va-responsive-stack` | Flex row | Flex column | md (768px) |
| `.va-responsive-stack--lg` | Flex row | Flex column | lg (992px) |
| `.va-responsive-stack--sm` | Flex row | Flex column | sm (576px) |
| `.va-responsive-order` | Source order | Visual first, text second | lg (992px) |
| `.va-hero-secondary-adapt` | Outlined button | Text-link style | md (768px) |
| `.va-feature-split` | 2-column grid | Single column | lg (992px) |
| `.va-reveal` | Hidden (opacity 0) | Animates in on scroll | IntersectionObserver |
