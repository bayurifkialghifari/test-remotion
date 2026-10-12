# Antigravity CLI — Remotion Motion Graphics Showcase

Executive-grade 15-second motion graphics reveal video for **Google Antigravity CLI (`agy`)**, built with [Remotion](https://www.remotion.dev/), **Apple Human Interface Guidelines (HIG)** motion principles, authentic Google Antigravity vector brand identity, and the real `agy` CLI TUI harness.

Includes a complete, production-ready AI skill packaged at [`.ai/skills/remotion-skills/`](.ai/skills/remotion-skills/SKILL.md).

---

## 🎬 Video Highlights & Keyframes

| Scene | Timestamp | Description | Keyframe Preview |
| :--- | :--- | :--- | :--- |
| **1. Hook & Defy Gravity** | 0.0s – 2.5s | Kinetic typography, architectural zero-G dark grid, Apple frosted badge | `out/frame_55.png` |
| **2. Authentic AGY CLI** | 2.5s – 5.5s | Real `agy` harness (11x8 ANSI pixel logo, Switch Model dialog, Effort slider, Plan mode prompt) | `out/frame_115.png` |
| **3. Superpowers Bento** | 5.5s – 8.5s | 3D perspective terminal tilt, Apple glass bento cards, 10.0x velocity counter | `out/frame_200.png` |
| **4. Command Arsenal** | 8.5s – 11.5s | Slash command capsules (`/plan`, `/boost`, `/teamwork-preview`), live diff | `out/frame_295.png` |
| **5. Official Brand & CTA** | 11.5s – 15.0s | Official Google Antigravity vector logo, install command capsule | `out/frame_400.png` |

---

## ✨ Design System (Anti-Slop Craft)

- **Apple Human Interface Guidelines (HIG) Physics**: Critically damped spring deceleration (`damping: 28`, `stiffness: 120`, `mass: 1.0`). No linear interpolations or cartoon wobble springs.
- **Apple Pro Dark Palette**: OLED True Black (`#000000`), frosted glass cards (`rgba(18, 18, 22, 0.72)` + `backdrop-filter: blur(40px)`), `0.5px` border sheen, and specular edge highlight (`inset 0 1px 0 rgba(255,255,255,0.15)`).
- **Official Google Antigravity Vector Logo**: Direct asset from [antigravity.google](https://antigravity.google/assets/image/brand/antigravity-icon__full-color.svg) with clean geometry, authentic Google color stops, and zero purple artifacts.
- **Authentic CLI TUI Harness**: 100% faithful reproduction of the real `agy` terminal interface — including the exact 11x8 ANSI 24-bit RGB pixel art arch logo, `bayurifkialgh@gmail.com (Google AI Pro)`, `Gemini 3.8 Flash (High)` model switcher, reasoning `Effort` slider, `/model` interaction, and Plan mode prompt bar.
- **Crisp SVG Glyphs**: No platform emoji slop; all icons are handcrafted inline vector SVGs.
- **Procedural Audio**: 100% zero-dependency synthesized 16-bit 44.1kHz WAV SFX (`whoosh`, `bass`, `pop`, `tick`, `riser`, `impact`, and electronic soundtrack) generated via Node.js.

---

## 📂 Project Architecture

```
.
├── .ai/
│   └── skills/
│       └── remotion-skills/          # Reusable Antigravity Skill
│           ├── SKILL.md              # Skill instructions & anti-slop rules
│           ├── assets/theme.ts       # Design tokens & Apple spring configs
│           ├── references/
│           │   ├── apple-motion-system.md
│           │   ├── design-rules.md
│           │   └── motion-patterns.md
│           └── scripts/gen-sfx.mjs   # Standalone procedural audio synth
├── public/
│   ├── antigravity-official.svg      # Official Google Antigravity vector icon
│   └── sfx/                          # Generated 16-bit WAV SFX & music bed
├── scripts/
│   └── gen-audio.mjs                 # Audio generator script
├── src/
│   ├── index.ts                      # Remotion root register
│   ├── Root.tsx                      # Composition sequencer & audio tracks
│   ├── theme.ts                      # Design tokens, Apple springs & easings
│   ├── components/
│   │   ├── Icons.tsx                 # Inline vector SVG glyphs
│   │   ├── Layers.tsx                # 5-Layer depth stack
│   │   ├── Logo.tsx                  # Official Google Antigravity vector emblem
│   │   ├── Motion.tsx                # Entrance, WordReveal, AnimatedCounter
│   │   └── Terminal.tsx              # Authentic AGY CLI TUI harness
│   └── scenes/
│       ├── Scene1Hook.tsx
│       ├── Scene2Terminal.tsx
│       ├── Scene3Bento.tsx
│       ├── Scene4Arsenal.tsx
│       └── Scene5CTA.tsx
├── remotion.config.ts
└── package.json
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node 20 & 22)
- Playwright Chromium (`npx playwright install chromium`)

### 2. Installation
```bash
npm install
```

### 3. Generate Audio
```bash
node scripts/gen-audio.mjs
```

### 4. Open Remotion Studio (Live Preview)
```bash
npm start
```

### 5. Render Master Video
```bash
npx remotion render src/index.ts AntigravityPromo out/antigravity_cli_promo.mp4 --codec h264 --crf 17
```

### 6. Render Still Keyframes
```bash
npx remotion still src/index.ts AntigravityPromo out/frame_400.png --frame 400
```

---

## 🛠 Reusable Skill Usage

To use this motion design skill in your own Antigravity or AI agent workflow:
Copy `.ai/skills/remotion-skills/` into your project's `.ai/skills/` directory.

The skill provides guidelines and patterns for:
- Apple HIG spring configurations (`smooth`, `snappy`, `bouncy`)
- 5-layer visual depth architecture
- Procedural audio synthesis without third-party downloads
- Authentic terminal and developer tool motion design

---

## 📄 License
MIT
