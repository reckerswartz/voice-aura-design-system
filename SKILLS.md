# Voice Aura Design System — Agent Skills & GitHub Setup

> How to configure AI coding agents (Devin, Windsurf, Cursor, and others) to work with the Voice Aura design system, plus instructions for pushing the project to GitHub.

---

## Table of Contents

1. [Overview](#overview)
2. [Devin for Terminal](#devin-for-terminal)
   - [Skill File](#devin-skill-file)
   - [Project Config](#devin-project-config)
   - [AGENTS.md Rules](#agentsmd-rules)
   - [Invoking the Skill](#invoking-the-devin-skill)
3. [Windsurf](#windsurf)
   - [Skills](#windsurf-skills)
   - [Rules](#windsurf-rules)
4. [Cursor](#cursor)
   - [Rules](#cursor-rules)
5. [Generic Agent Setup](#generic-agent-setup)
6. [npm / npx Quick Install](#npm--npx-quick-install)
7. [GitHub CLI — Push to Remote](#github-cli--push-to-remote)
8. [GitHub Pages — Live Demo Site](#github-pages--live-demo-site)
9. [File Reference](#file-reference)

---

## Overview

This design system ships with built-in configuration for AI coding agents. When an agent opens this project, it automatically receives:

- **Project rules** (`AGENTS.md`) — build commands, code conventions, asset rules
- **Skills** (`.devin/skills/`) — task-specific prompts the agent can invoke
- **Permissions** (`.devin/config.json`) — pre-approved safe operations

These files are committed to version control so every team member (and every agent session) gets the same configuration.

---

## Devin for Terminal

### Devin Skill File

**Location:** `.devin/skills/voice-aura-design-system/SKILL.md`

This skill teaches Devin how to integrate, use, and troubleshoot the design system. It covers five commands:

| Command | What It Does |
|---------|-------------|
| `/voice-aura-design-system setup` | Walk through initial project integration |
| `/voice-aura-design-system component` | Look up a specific component's variables, mixins, and markup |
| `/voice-aura-design-system icon` | Find and use icons from the asset library |
| `/voice-aura-design-system rails` | Full Rails integration walkthrough |
| `/voice-aura-design-system troubleshoot` | Debug build or integration issues |

The skill restricts itself to read-only tools plus `exec` (for running builds), so it cannot accidentally modify your files unless you approve.

### Devin Project Config

**Location:** `.devin/config.json`

Pre-approved permissions for this project:

```json
{
  "permissions": {
    "allow": [
      "Read(**)",
      "Exec(npm run build)",
      "Exec(npm run build:css)",
      "Exec(npm run build:min)",
      "Exec(npm run watch:css)",
      "Exec(npm install)",
      "Exec(git)",
      "Exec(ls)",
      "Exec(cat)",
      "Exec(sass --version)"
    ],
    "deny": [
      "Exec(rm -rf)",
      "Exec(sudo)"
    ]
  }
}
```

This lets Devin read files, run builds, and use git without prompting you each time — while blocking destructive operations.

### AGENTS.md Rules

**Location:** `AGENTS.md` (project root)

Always-on rules that are injected into every Devin session. These cover:

- Build & verify commands
- SCSS architecture conventions (7-1 pattern)
- Asset inventory and licensing
- Documentation cross-references
- Rails integration constraints (modern stack only)
- Dependency versions

Devin also reads rules from `.cursorrules`, `.cursor/rules/`, `.windsurf/rules/`, and `CLAUDE.md` if present — see [Controlling Imports](#controlling-imports) below.

### Invoking the Devin Skill

In a Devin for Terminal session, type:

```
/voice-aura-design-system setup
```

Or let Devin invoke it automatically when it detects a relevant task.

**Manual invocation examples:**

```
/voice-aura-design-system component     # look up card or button styles
/voice-aura-design-system icon search    # find an icon by name
/voice-aura-design-system rails          # full Rails integration
/voice-aura-design-system troubleshoot   # debug a build failure
```

### Controlling Imports

If your project also has Cursor or Windsurf config, Devin reads those too. Control this in `.devin/config.json`:

```json
{
  "read_config_from": {
    "cursor": true,
    "windsurf": true,
    "claude": true
  }
}
```

---

## Windsurf

### Windsurf Skills

Create the same skill for Windsurf by placing it at:

```
.windsurf/skills/voice-aura-design-system/SKILL.md
```

The `SKILL.md` format is identical — Windsurf and Devin share the same skill syntax.

**Quick setup (copy from Devin):**

```bash
mkdir -p .windsurf/skills/voice-aura-design-system
cp .devin/skills/voice-aura-design-system/SKILL.md \
   .windsurf/skills/voice-aura-design-system/SKILL.md
```

### Windsurf Rules

Create always-on rules at `.windsurf/rules/voice-aura.md`:

```markdown
---
description: "Voice Aura design system conventions"
trigger: always_on
---

- Build: `npm run build` (SCSS to CSS in dist/css/)
- Use Dart Sass — never node-sass or sassc
- SCSS follows 7-1 architecture under scss/
- Custom variables: scss/abstracts/_variables.scss
- CSS custom props: scss/abstracts/_variables.scss (SCSS vars exposed via Bootstrap theming)
- Bootstrap imported via @import (not @use) in scss/vendors/_bootstrap.scss
- Icons: Lucide (primary, MIT), Phosphor (secondary, MIT)
- Rails: modern stack only (no Webpacker, Sprockets, sassc-rails, Turbolinks)
- Docs: DESIGN_SYSTEM.md, RAILS_INTEGRATION.md, ASSET_GUIDELINES.md
```

**Trigger values:**

| Trigger | Behavior |
|---------|----------|
| `always_on` | Active in every session |
| `model_decision` | Agent decides based on description |
| `glob` | Active when working with matching files |
| `manual` | User must invoke explicitly |

---

## Cursor

### Cursor Rules

Create rules at `.cursor/rules/voice-aura.md`:

```markdown
---
description: "Voice Aura design system conventions"
globs: "scss/**/*.scss"
alwaysApply: false
---

- Build: `npm run build`
- SCSS uses 7-1 architecture (abstracts, base, components, layout, pages, vendors)
- Entry point: scss/voice-aura.scss
- Variables: scss/abstracts/_variables.scss
- CSS custom properties: scss/abstracts/_variables.scss
- Bootstrap via @import in scss/vendors/_bootstrap.scss
- New components go in scss/components/_name.scss, registered in voice-aura.scss
- Icons: Lucide SVGs in assets/icons/lucide/ (MIT)
- Full docs: DESIGN_SYSTEM.md, RAILS_INTEGRATION.md, ASSET_GUIDELINES.md
```

Or create a simpler `.cursorrules` file at the project root:

```
# Voice Aura Design System

Build: npm run build
SCSS architecture: 7-1 pattern under scss/
Variables: scss/abstracts/_variables.scss
Bootstrap: @import in scss/vendors/_bootstrap.scss
Icons: Lucide (assets/icons/lucide/, MIT license)
Docs: DESIGN_SYSTEM.md, RAILS_INTEGRATION.md
```

**Activation behavior:**

| Configuration | When Active |
|--------------|-------------|
| `alwaysApply: true` | Every session |
| `globs` specified | When working with matching files |
| `description` only | Agent decides |
| None of the above | User must invoke manually |

---

## Generic Agent Setup

For any AI coding agent that reads project-level markdown files, the `AGENTS.md` file at the project root provides all necessary context. Most modern agents (Claude Code, Aider, Continue, etc.) support `AGENTS.md` or similar convention.

**What any agent needs to know:**

1. **Build:** `npm run build` compiles SCSS to `dist/css/`
2. **Watch:** `npm run watch:css` for development
3. **Entry point:** `scss/voice-aura.scss`
4. **Variables:** `scss/abstracts/_variables.scss`
5. **CSS custom properties:** `scss/abstracts/_variables.scss`
6. **Bootstrap:** imported via `@import` (v5.3 requirement)
7. **Icons:** 54 Lucide SVGs in `assets/icons/lucide/`
8. **Docs:** `DESIGN_SYSTEM.md` (full reference), `RAILS_INTEGRATION.md` (Rails guide)

**Minimal agent prompt:**

```
This project uses the Voice Aura design system (Bootstrap 5, Dart Sass).
Read AGENTS.md for project rules, then DESIGN_SYSTEM.md for the full reference.
Build with: npm run build
```

---

## npm / npx Quick Install

### Install as a local dependency

If this package is published to npm or a private registry:

```bash
npm install voice-aura-design-system
```

Then import in your SCSS:

```scss
@import "voice-aura-design-system/scss/voice-aura";
```

### Install from a git repository

```bash
npm install github:reckerswartz/voice-aura-design-system
```

### Install from a local path (monorepo or development)

```bash
npm install ../voice-aura-design-system
```

### npx one-liner (copy assets into a new project)

Add a `bin` entry to `package.json` for a setup script:

```bash
# From your project root, copy the design system files:
npx voice-aura-design-system-setup
```

> **Note:** The `bin` script (`bin/setup.js`) is documented below in the [Setup Script](#setup-script) section.

### Setup Script

Create `bin/setup.js` to automate copying design system files into a target project:

```javascript
#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SOURCE = path.resolve(__dirname, "..");
const TARGET = process.cwd();

const DIRS_TO_COPY = ["scss", "assets"];

console.log("Voice Aura Design System — Setup");
console.log(`Source: ${SOURCE}`);
console.log(`Target: ${TARGET}`);
console.log("");

for (const dir of DIRS_TO_COPY) {
  const src = path.join(SOURCE, dir);
  const dest = path.join(TARGET, "vendor", "voice-aura", dir);

  if (!fs.existsSync(src)) {
    console.warn(`  SKIP ${dir}/ (not found in source)`);
    continue;
  }

  fs.mkdirSync(dest, { recursive: true });
  copyDirSync(src, dest);
  console.log(`  COPY ${dir}/ -> vendor/voice-aura/${dir}/`);
}

console.log("");
console.log("Done. Import in your SCSS:");
console.log('  @import "vendor/voice-aura/scss/voice-aura";');

function copyDirSync(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
```

Register it in `package.json`:

```json
{
  "bin": {
    "voice-aura-setup": "bin/setup.js"
  }
}
```

---

## GitHub CLI — Push to Remote

### Prerequisites

| Tool | Install | Verify |
|------|---------|--------|
| Git | `sudo apt install git` (Linux) / `brew install git` (macOS) | `git --version` |
| GitHub CLI | `sudo apt install gh` (Linux) / `brew install gh` (macOS) | `gh --version` |

> **Windows:** Use `winget install GitHub.cli` or download from [cli.github.com](https://cli.github.com/).

### Step 1 — Authenticate with GitHub

```bash
gh auth login
```

Follow the interactive prompts to authenticate via browser or token.

**Verify authentication:**

```bash
gh auth status
```

### Step 2 — Initialize the Git Repository

```bash
cd /path/to/voice-aura-design-system

git init
```

### Step 3 — Create a `.gitignore`

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Build output (regenerated by npm run build)
dist/

# OS files
.DS_Store
Thumbs.db

# Editor files
*.swp
*.swo
*~
.vscode/
.idea/

# Local config (secrets, personal overrides)
.devin/config.local.json
EOF
```

### Step 4 — Stage and Commit

```bash
git add .
git commit -m "Initial commit: Voice Aura design system v1.0.0

Includes:
- 20 SCSS partials (7-1 architecture on Bootstrap 5)
- 68 SVG assets (54 Lucide icons, 14 custom)
- Design system documentation (DESIGN_SYSTEM.md)
- Rails integration guide (RAILS_INTEGRATION.md)
- Asset guidelines (ASSET_GUIDELINES.md)
- Agent skills (SKILLS.md, .devin/, AGENTS.md)
- Example files for Rails (SCSS entry point, icon helper)"
```

### Step 5 — Create the GitHub Repository

**Public repository:**

```bash
gh repo create voice-aura-design-system --public --source=. --push
```

**Private repository:**

```bash
gh repo create voice-aura-design-system --private --source=. --push
```

**Under an organization:**

```bash
gh repo create YOUR_ORG/voice-aura-design-system --private --source=. --push
```

This single command creates the remote repository, sets the `origin` remote, and pushes.

### Step 6 — Verify

```bash
# Check the remote
git remote -v

# View on GitHub
gh repo view --web
```

### Ongoing Workflow

```bash
# Make changes, then:
git add .
git commit -m "Describe your changes"
git push
```

**Create a release:**

```bash
git tag v1.0.0
git push origin v1.0.0
gh release create v1.0.0 --title "v1.0.0" --notes "Initial release of the Voice Aura design system"
```

### Cloning the Repository (for collaborators)

```bash
gh repo clone reckerswartz/voice-aura-design-system
cd voice-aura-design-system
npm install
npm run build
```

---

## GitHub Pages — Live Demo Site

The design system includes a GitHub Actions workflow that automatically builds the CSS and deploys a static demo site to GitHub Pages on every push to `main`.

**Live URL:** `https://reckerswartz.github.io/voice-aura-design-system/`

### What Gets Deployed

| Page | URL Path | Description |
|------|----------|-------------|
| Landing page | `/` | Overview with links to all pages |
| Component Reference | `/site/components.html` | Live preview of all design tokens and components |
| Asset Showcase | `/site/asset-gallery.html` | Visual gallery of all 68 SVG assets |

The CI pipeline runs `npm run build` to compile SCSS, then assembles the site from `site/`, `dist/css/`, and `assets/`.

### Enabling GitHub Pages

After pushing to GitHub, enable Pages in your repository settings:

1. Go to **Settings** > **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow (`.github/workflows/deploy-pages.yml`) will deploy automatically on the next push to `main`

Or enable it via the CLI:

```bash
# The workflow handles deployment automatically.
# Just ensure GitHub Pages is enabled with "GitHub Actions" as the source.
# Push to main and the site will be live within a few minutes.
git push origin main
```

### Workflow File

**Location:** `.github/workflows/deploy-pages.yml`

The workflow:
1. Checks out the code
2. Installs Node.js 20 + npm dependencies
3. Runs `npm run build` (compiles SCSS to CSS)
4. Assembles `_site/` with `site/`, `dist/css/`, and `assets/`
5. Deploys to GitHub Pages via `actions/deploy-pages@v4`

Triggers: push to `main`, or manual dispatch from the Actions tab.

### Customizing the Landing Page

Edit `site/index.html` to update the landing page. Replace `USER` in the GitHub links with your actual username or organization name.

---

## File Reference

All agent-related files in this project:

| File | Purpose | Agent Support |
|------|---------|--------------|
| `AGENTS.md` | Always-on project rules | Devin, Claude Code, Aider, generic |
| `.devin/config.json` | Permission pre-approvals | Devin for Terminal |
| `.devin/skills/voice-aura-design-system/SKILL.md` | Interactive skill with 5 commands | Devin for Terminal |
| `.github/workflows/deploy-pages.yml` | CI/CD: build CSS + deploy to GitHub Pages | GitHub Actions |
| `site/index.html` | Landing page for GitHub Pages site | GitHub Pages |
| `site/components.html` | Component reference (live preview) | GitHub Pages |
| `site/asset-gallery.html` | Asset showcase (visual gallery) | GitHub Pages |
| `.windsurf/skills/voice-aura-design-system/SKILL.md` | Same skill for Windsurf | Windsurf (copy from .devin/) |
| `.windsurf/rules/voice-aura.md` | Always-on rules | Windsurf |
| `.cursor/rules/voice-aura.md` | Glob-activated rules | Cursor |
| `.cursorrules` | Simple project-root rules | Cursor |
| `DESIGN_SYSTEM.md` | Full design system reference | All agents (read) |
| `RAILS_INTEGRATION.md` | Rails integration guide | All agents (read) |
| `ASSET_GUIDELINES.md` | Asset & icon usage rules | All agents (read) |

> **Note:** Only `AGENTS.md`, `.devin/`, and the documentation files are included in this repository. To enable Windsurf or Cursor support, create the corresponding directories by copying from the Devin config (see sections above).
