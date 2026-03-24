#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SOURCE = path.resolve(__dirname, "..");
const TARGET = process.cwd();

const DIRS_TO_COPY = ["scss", "assets"];
const DOCS_TO_COPY = [
  "DESIGN_SYSTEM.md",
  "RAILS_INTEGRATION.md",
  "ASSET_GUIDELINES.md",
  "AGENTS.md",
];

const VENDOR_DIR = path.join(TARGET, "vendor", "voice-aura");

console.log("Voice Aura Design System — Setup");
console.log(`Source: ${SOURCE}`);
console.log(`Target: ${TARGET}`);
console.log("");

// Copy directories (scss, assets)
for (const dir of DIRS_TO_COPY) {
  const src = path.join(SOURCE, dir);
  const dest = path.join(VENDOR_DIR, dir);

  if (!fs.existsSync(src)) {
    console.warn(`  SKIP ${dir}/ (not found in source)`);
    continue;
  }

  fs.mkdirSync(dest, { recursive: true });
  copyDirSync(src, dest);
  console.log(`  COPY ${dir}/ -> vendor/voice-aura/${dir}/`);
}

// Copy documentation files
for (const file of DOCS_TO_COPY) {
  const src = path.join(SOURCE, file);
  const dest = path.join(VENDOR_DIR, file);

  if (!fs.existsSync(src)) {
    console.warn(`  SKIP ${file} (not found in source)`);
    continue;
  }

  fs.copyFileSync(src, dest);
  console.log(`  COPY ${file} -> vendor/voice-aura/${file}`);
}

console.log("");
console.log("Done. Import in your SCSS:");
console.log('  @import "vendor/voice-aura/scss/voice-aura";');
console.log("");
console.log("Docs available at: vendor/voice-aura/DESIGN_SYSTEM.md");

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
