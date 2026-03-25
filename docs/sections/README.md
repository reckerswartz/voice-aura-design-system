# Section Documentation Index

> Per-section architecture review for the Voice Aura Design System.
> Each folder contains a README documenting classes, issues, improvements,
> reference guide status, and maturity level.
>
> Last updated: 2026-03-25

## Sections

### Layout (`scss/layout/`)

| Section | Lines | Maturity | Critical Issues |
|---------|-------|----------|----------------|
| [Navbar](navbar/) | 458 | Beta | Parallel button system (8 `@extend`), HTML duplicated 4× |
| [Hero](hero/) | 588 | Beta | Parallel button system (~60 lines duplicated), largest layout file |
| [Footer](footer/) | 294 | Stable | No code snippet in reference |
| [Feature Rows](feature-rows/) | 604 | Beta | No BOOTSTRAP ALIGNMENT, limited reference snippets |
| [Grid](grid/) | 292 | Beta | No reference page section at all |

### Components (`scss/components/`)

| Component | Lines | Maturity | Critical Issues |
|-----------|-------|----------|----------------|
| [Buttons](buttons/) | 388 | Stable | 10 `@extend` (highest), well-documented |
| [Cards](cards/) | 220 | Stable | 5 `@extend`, clean delta-only |
| [Forms](forms/) | 587 | Beta | 6 `@extend`, missing variant demos in reference |
| [Badges](badges/) | 275 | Stable | Minimal issues |
| [Pricing](pricing/) | 418 | Beta | No `:focus-visible` on tabs, no dark variant |
| [Blog Cards](blog-cards/) | 260 | Stable | Minor — no `:focus-visible` on read-more link |
| [Trust Bar](trust-bar/) | 164 | Stable | Clean, well-isolated |
| [Auth](auth/) | 432 | Beta | App-specific, no code snippet |
| [Backgrounds](backgrounds/) | 1,833 | Beta | 26 hardcoded asset paths, largest component |
| [Animations](animations/) | 1,493 | Beta | Visual regression baselines needed |
| [Typography](typography/) | 289 | Beta | Render-blocking font import, 13 `@extend` |

### Brand-Specific (`scss/components/` — should be `brands/`)

| Component | Lines | Maturity | Critical Issues |
|-----------|-------|----------|----------------|
| [Voice Agent](voice-agent/) | 339 | Draft | App-specific, not reusable |
| [Video Dubbing](video-dubbing/) | 376 | Draft | App-specific, not reusable |
