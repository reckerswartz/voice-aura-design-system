# QA Report: pixel-perfect-demo.html

**Tested:** 2026-03-25  
**Viewport:** 1440 × 900 (Desktop)  
**Browser:** Chromium (Playwright)  
**Page:** `site/pixel-perfect-demo.html`  
**Reference:** `site/components.html` + Behance design slices

---

## Section 1: Navbar

**Screenshot:** `qa-01-navbar.png`, `qa-01b-navbar-scrolled.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Position | `sticky` | `sticky` | ✅ |
| Brand font | IBM Plex Serif 700 | IBM Plex Serif 700 | ✅ |
| Brand letter-spacing | ~1.4px | 1.44px | ✅ |
| Nav links | Products, Integrations, API, Pricing | ✅ All 4 present | ✅ |
| Active link | Pricing (underlined) | Pricing with `--active` | ✅ |
| Action buttons | Log in (ghost) + Sign up (filled) | Both present with arrow icons | ✅ |
| Scrolled state | Frosted glass, backdrop-filter | `rgba(255,255,255,0.92)` + `blur(12px)` | ✅ |
| Height | ~64–72px | 72px | ✅ |

### Issues Found

- **ISSUE N-1 (Low):** The navbar action buttons use `va-navbar-btn--outlined` and `va-navbar-btn--filled` class names, while the reference guide documents `va-btn va-btn--ghost` and `va-btn va-btn--primary`. This is a naming inconsistency — both work visually, but creates confusion when copying from the reference.

---

## Section 2: Hero

**Screenshot:** `qa-01-navbar.png`, `qa-02-hero-tts.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Badge text | "DON'T SPEAK JUST TYPE" | ✅ Correct | ✅ |
| Badge icon | Grid/list SVG icon | ✅ Present | ✅ |
| Title font | IBM Plex Serif 700 | IBM Plex Serif 700 | ✅ |
| Title size | ~72px (desktop) | 72px | ✅ |
| Title color | #1A1919 | `rgb(26, 25, 25)` | ✅ |
| Subtitle | Correct text with **10M+** bold | ✅ | ✅ |
| Subtitle color | #4B5563 | `rgb(75, 85, 99)` | ✅ |
| CTA buttons | "Open Studio" (primary) + "API Docs" (secondary) | ✅ Both present with icons | ✅ |
| Floating icons | Microphone (left) + "A" letter (right) | ✅ Both visible, opacity 0.65 | ✅ |
| Background patterns | Halftone dots + waveform | ✅ Both applied via CSS classes | ✅ |
| Hero padding | ~80px top, ~96px bottom | 80px / 96px | ✅ |

### Issues Found

- **ISSUE H-1 (Medium):** The floating decorative elements in the hero have `position: absolute` but the ones in the pricing section use inline `style="top:12%;left:8%"` which results in `position: relative` (computed). The pricing floating elements are **not absolutely positioned** — they appear inline in the document flow rather than floating over the pricing section. This breaks the intended visual effect.

- **ISSUE H-2 (Low):** The hero uses `va-hero__btn--primary` and `va-hero__btn--secondary` for CTA buttons, but the reference guide documents `va-btn va-btn--primary va-btn--icon`. The hero-specific button classes are visually correct but differ from the standard button API. This is intentional for hero-specific sizing but undocumented in the reference.

---

## Section 3: TTS Input Card

**Screenshot:** `qa-02-hero-tts.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Glass effect | backdrop-filter blur | `blur(12px)`, `rgba(255,255,255,0.7)` bg | ✅ |
| Border radius | 16px | 16px | ✅ |
| Tabs | "Text to Speech" + "Upload File" | ✅ Both with icons | ✅ |
| Category pills | YouTube, Narration, Advertisement, Podcast | ✅ All 4 with icons | ✅ |
| Active pill | YouTube (dark bg) | ✅ `va-category-pill--active` | ✅ |
| Character counter | 400/1000 | ✅ Present | ✅ |
| Send button | Blue circle with send icon | ✅ Present | ✅ |

### Issues Found

- **No issues.** TTS Input Card matches the reference design.

---

## Section 4: Trust Bar (Client Logos)

**Screenshot:** `qa-02-hero-tts.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Text | "The solution of choice for **300+** Forbes 2000 companies" | ✅ | ✅ |
| Logos | AIRFRANCE, VERTIV, Honeywell, splunk> | ✅ All 4 as data-URI SVGs | ✅ |
| Separator variant | Vertical dividers between logos | ✅ `--separated` class applied | ✅ |
| Border variant | Top/bottom borders | ✅ `--bordered` class applied | ✅ |
| Greyscale filter | Logos greyscale, full color on hover | ✅ (verified in previous audit) | ✅ |

### Issues Found

- **ISSUE T-1 (Low):** The trust bar only shows 4 logos. The Behance reference shows 4 logos as well, so count is correct. However, the logos are text-based SVGs rather than actual brand logos — acceptable for a demo but worth noting.

---

## Section 5: Feature — Developer API

**Screenshot:** `qa-03-trust-feature-api.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Layout | 2-column grid, text left / visual right | ✅ Grid `576px 576px`, gap 64px | ✅ |
| Badge | "FOR DEVELOPERS" with code icon | ✅ Blue bg `rgba(4,120,255,0.08)`, blue text | ✅ |
| Title | "Experience the Fastest, Most Powerful Text-to-Speech API" | ✅ | ✅ |
| CTA buttons | "Get API Key" (primary) + "Learn more" (link-arrow) | ✅ | ✅ |
| Visual panel | Light bg with voice agent card | ✅ `--light` variant, 576×428px | ✅ |
| Voice Agent Card | Dark card with language tabs, avatar, CTA | ✅ All elements present | ✅ |
| Background | Circuit pattern + glow | ✅ Multiple pattern classes applied | ✅ |
| VOICE AURA watermark | Faint brand text behind visual | ✅ `va-bg-brand-watermark` | ✅ |

### Issues Found

- **ISSUE F-1 (Medium):** The "Get API Key" button uses `va-btn va-btn--primary va-btn--sm` which is correct, but the button also includes a lock icon (`va-btn__icon` with padlock SVG). In the reference, the accent button variant is described as blue (`va-btn--accent`), but this implementation uses `--primary` (dark/black). The Behance reference shows a **blue** "Get API Key" button, not a dark one. **This is a color mismatch** — should be `va-btn--accent` (blue) instead of `va-btn--primary` (dark).

- **ISSUE F-2 (Low):** The voice agent card avatar uses a placeholder SVG icon (generic user silhouette) instead of an actual photo. The Behance reference shows a real avatar image. Acceptable for a demo but visually less polished.

---

## Section 6: Feature — Video Dubbing

**Screenshot:** `qa-04-feature-dubbing.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Layout | 2-column reversed (visual left, text right) | ✅ `va-feature-row--reverse` | ✅ |
| Badge | "FOR LOCALIZER" with translate icon | ✅ Blue text/bg | ✅ |
| Title | "Speed Meets Accuracy in Video Translation" | ✅ | ✅ |
| CTA buttons | "Try Dubbing" (primary) + "Learn more" | ✅ | ✅ |
| Visual panel | Dark bg with dubbing player card | ✅ `--dark` variant, 576×454px | ✅ |
| Dubbing card | Language tabs (EN/CN/JP/KR), video placeholder, controls, subtitles, meta | ✅ All present | ✅ |
| Background | Noise pattern + concentric rings | ✅ Pattern classes applied | ✅ |

### Issues Found

- **ISSUE D-1 (Medium):** The "Try Dubbing" button uses `va-btn va-btn--primary va-btn--sm` (dark/black). The Behance reference shows this as a **dark** CTA which is correct for this section. However, the button does **not** have an icon, while the Behance reference shows buttons in feature sections consistently include icons. Minor inconsistency.

- **ISSUE D-2 (Low):** The dubbing card video player area is completely black with only a play icon SVG. A thumbnail image or gradient placeholder would be more polished and match the Behance reference which shows an actual video frame.

---

## Section 7: Blog / Insights & Updates

**Screenshot:** `qa-05-blog.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Section title | "Insights & Updates" | ✅ | ✅ |
| Subtitle | "Latest news, product updates, and expert insights..." | ✅ | ✅ |
| Action link | "Explore more blogs" (right-aligned, dark button) | ✅ With arrow icon | ✅ |
| Card count | 4 cards in grid | ✅ 4 articles | ✅ |
| Card images | SVG illustrations | ✅ 4 images from `assets/images/` | ✅ |
| Category tags | VOICE AGENTS, PRODUCT, WHITEPAPER, TUTORIAL | ✅ All with colored dot (::before) | ✅ |
| Card titles | 2-line clamp | ✅ `webkitLineClamp: 2` | ✅ |
| Read more links | "Read more →" | ✅ All 4 present | ✅ |
| Background | Grid lines pattern | ✅ `va-bg-grid-lines` | ✅ |

### Issues Found

- **ISSUE B-1 (Medium):** Blog card date formatting shows `2024-12-08` (ISO format) but the Behance reference shows dates formatted as `Jan 06, 2025` or similar human-readable format. The ISO dates look overly technical for a marketing page.

- **ISSUE B-2 (Medium):** Blog card meta layout at 270px card width causes the date to wrap awkwardly — `2024-` appears on one line and `12-08` on the next (visible in screenshot). The `flex-wrap: nowrap` prevents overflow but the narrow card width + multi-item meta row creates a cramped layout. The date and read-time values are squeezed.

- **ISSUE B-3 (Low):** Blog card category tags use `va-blog-card__tag` class, while the reference `components.html` uses `va-blog-card__category`. This naming inconsistency means code copied from the reference won't match the sample page's class names.

---

## Section 8: Pricing

**Screenshot:** `qa-06-pricing-top.png`, `qa-07-pricing-bottom.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Discount badge | "ANNUAL DISCOUNT %40" | ✅ `va-discount-badge` | ✅ |
| Title | "Choose Pricing Plan" (IBM Plex Serif) | ✅ | ✅ |
| Tabs | Studio (active), DUB, API | ✅ All 3 | ✅ |
| Card count | 3 (Free, Creator, Business) | ✅ | ✅ |
| Featured card | Creator with dark border + scale(1.02) + shadow | ✅ `matrix(1.02,0,0,1.02,0,0)`, lg shadow | ✅ |
| Free card border | Light grey `#E5E7EB` | ✅ `1px solid rgb(229,231,235)` | ✅ |
| Featured border | Dark `#1A1919` | ✅ `1px solid rgb(26,25,25)` | ✅ |
| Crosshair corners | On all 3 cards | ✅ `__corners` + `__corners-bottom` divs | ✅ |
| Feature icons | Green checkmark circles | ✅ SVG stroke `#10B981` | ✅ |
| Badge colors | Free (green), Creator (blue), Business (blue) | ✅ `--free`, `--creator`, `--business` variants | ✅ |
| Background | Mesh gradient + glow + halftone dots | ✅ Multiple pattern classes | ✅ |

### Issues Found

- **ISSUE P-1 (High):** The pricing section's floating decorative elements (microphone icon left, "A" letter right) have **`position: relative`** instead of `position: absolute`. They use inline `style="top:12%;left:8%"` but the parent section has `overflow:hidden` and the elements lack a proper absolute positioning context. **Result:** The floats appear in the document flow above the pricing header instead of floating over the section edges. Visually, the microphone icon appears as a tiny element above the "ANNUAL DISCOUNT" badge, which is incorrect.

- **ISSUE P-2 (Medium):** The blue cursor accent (`va-hero__float-cursor`) is correctly positioned with `position: absolute` but appears as a tiny 2×24px blue line at `left:12%; top:22%`. In the Behance reference, this cursor is a thin blinking text-cursor indicator. It's currently static (no animation) and barely visible.

- **ISSUE P-3 (Low):** The pricing card CTA buttons use `<a>` tags with `va-pricing-card__cta` class, which renders differently from the reference that shows `<button class="va-btn va-btn--primary va-btn--block">` for the featured card and `va-btn--secondary` for non-featured cards. The visual styling is correct, but the HTML element type differs.

---

## Section 9: Footer

**Screenshot:** `qa-07-pricing-bottom.png`, `qa-08-footer.png`

| Property | Expected | Actual | Status |
|----------|----------|--------|--------|
| Background | Dark (#1A1919) | ✅ | ✅ |
| Brand logo | Sound wave SVG (white) + "VOICE AURA" | ✅ | ✅ |
| Brand tagline | All caps tagline | ✅ `rgba(255,255,255,0.55)` color | ✅ |
| Link columns | 3 columns (Important Links, Products, How to Create) | ✅ All 3 | ✅ |
| Copyright | "© 2026 Voice Aura. All Rights Reserved" | ✅ | ✅ |
| Bottom links | Privacy Policy, Terms of Service | ✅ | ✅ |

### Issues Found

- **ISSUE FT-1 (Low):** Footer link column title "How to Create" uses `<h6>` with `va-footer__col-title`. The reference in `components.html` shows "How to create" (lowercase "c"). The sample page has "How to Create" (uppercase "C"). Minor capitalization difference.

- **ISSUE FT-2 (Info):** The footer tagline text color `rgba(255,255,255,0.55)` appears slightly dim. The Behance reference shows it as a muted but readable blue-tinted color. Current implementation reads as grey which is acceptable.

---

## Summary of All Issues

### High Priority (1)
| ID | Section | Description |
|----|---------|-------------|
| **P-1** | Pricing | Floating decorative elements have `position: relative` instead of `absolute` — appear inline above pricing header instead of floating over section edges |

### Medium Priority (5)
| ID | Section | Description |
|----|---------|-------------|
| **H-1** | Hero/Pricing | Pricing section floats use same `.va-hero__float` class but don't inherit `position:absolute` because the pricing section's `overflow:hidden` and inline styles override the base class |
| **F-1** | Feature API | "Get API Key" button uses `--primary` (dark) but Behance reference shows blue (`--accent`). Color mismatch |
| **D-1** | Feature Dubbing | "Try Dubbing" button lacks an icon; Behance reference shows icons on feature section CTAs |
| **B-1** | Blog | Dates in ISO format (`2024-12-08`) instead of human-readable format (`Dec 08, 2024`) |
| **B-2** | Blog | Blog card meta row cramped at 270px card width — date values wrap awkwardly |

### Low Priority (6)
| ID | Section | Description |
|----|---------|-------------|
| **N-1** | Navbar | Action button class names (`va-navbar-btn--*`) differ from reference guide (`va-btn--*`) |
| **H-2** | Hero | Hero-specific button classes undocumented in reference guide |
| **T-1** | Trust Bar | Logos are text-based SVGs, not actual brand logos (acceptable for demo) |
| **F-2** | Feature API | Voice agent avatar uses placeholder SVG instead of real photo |
| **B-3** | Blog | Class naming mismatch: `va-blog-card__tag` (sample) vs `va-blog-card__category` (reference) |
| **D-2** | Feature Dubbing | Video player area is flat black, no thumbnail/gradient placeholder |

### Info (2)
| ID | Section | Description |
|----|---------|-------------|
| **P-2** | Pricing | Blue cursor accent is static (no blink animation) and barely visible |
| **FT-1** | Footer | "How to Create" vs "How to create" — minor capitalization inconsistency |
| **FT-2** | Footer | Tagline color slightly dim but acceptable |
| **P-3** | Pricing | CTA uses `<a>` tags instead of `<button>` — visual styling correct, element type differs |

---

## Overall Assessment

The pixel-perfect demo page is **well-constructed** overall. The design system classes are applied correctly, typography matches IBM Plex Serif/Sans specifications, colors are accurate (#0478FF, #1A1919, #E9E9EA), and responsive patterns are in place. The main areas needing attention are:

1. **Pricing floating elements** need their positioning fixed (High priority)
2. **Feature API button color** should be `--accent` (blue) not `--primary` (dark)
3. **Blog date formatting** should use human-readable dates
4. **Class naming consistency** between sample page and reference guide needs alignment
