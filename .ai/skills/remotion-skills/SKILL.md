---
name: remotion-skills
description: Create and edit world-class motion graphics videos with Remotion using Apple Human Interface Guidelines (HIG) motion principles and Google DeepMind aesthetic craft. Eliminates AI video slop (oversaturated neon glows, vibrating springs, emoji icons) in favor of fluid physics springs, authentic CLI harnesses, frosted glass materials, vector branding, and procedural audio synthesis. Always read this skill before writing Remotion code.
---

# Remotion Motion Skills — Apple HIG & High-Craft Motion Design

Remotion renders React components frame-by-frame into broadcast-grade video. Code quality is not the bottleneck — **motion design craft and visual restraint are**.

Untrained generation produces "AI video slop": oversaturated purple/cyan neon washes, vibrating bouncy springs, emoji icons with missing glyph boxes, simultaneous entrances, flat backgrounds, and generic mockups.

This skill provides an advanced design system combining **Apple Human Interface Guidelines (HIG) Motion & Color** with **authentic developer platform TUI aesthetics**.

---

## Non-Negotiable Rules (Apply to Every Composition)

1. **Zero Linear Interpolation & No Jitter Springs**:
   - Every `interpolate()` uses an Apple easing curve (`theme.ease.out` or `theme.ease.inOut`) with `extrapolateLeft/Right: "clamp"`.
   - Entrances use Apple-style fluid deceleration springs (`damping: 28, stiffness: 120, mass: 1.0`). Never use excessive under-damped springs that wobble uncontrollably.
2. **Entrances Animate 2–3 Properties Together**:
   - Always combine `opacity` + `translateY` + `scale` (e.g. translateY 36→0px, scale 0.94→1.0, opacity 0→1). A lone fade is strictly forbidden.
3. **Stagger Everything**:
   - Lists, cards, and words staggered by 3–6 frame offsets (`start + i * 4`). Nothing enters simultaneously.
4. **Exits Exist & Are Faster Than Entrances**:
   - Exits animate in 8–10 frames with `theme.ease.in`, clearing stage momentum before the next visual beat.
5. **The 5-Layer Visual Stack**:
   - Layer 1 (Bottom): Architectural dark mesh with subtle geometric lattice (`BgMesh`).
   - Layer 2: Asset/Particle physics layer (`ZeroGParticles`).
   - Layer 3: Main graphics, typography, glassmorphism surfaces, and CLI harnesses.
   - Layer 4: Filmic color grade overlay (`Grade` at 8–12% opacity with soft-light blend).
   - Layer 5 (Top): Procedural SVG fractal noise grain + elliptical vignette.
6. **No Emoji as Icons (Strict Anti-Slop Rule)**:
   - Platform emojis (⚡, 🌐, 📄, 🔌) render inconsistently, break brand palettes, or fail with missing glyph boxes. Always use clean, inline vector SVGs matching theme tokens.
7. **Vector Logo Integrity**:
   - Use unified single-path vectors for logos. Avoid overlapping layered paths that cause internal boundary artifacts or color bleed.
8. **Realistic CLI & Harness UI**:
   - Developer tools must render authentic TUI box-drawing frames (`╭─`, `│`, `╰─`), actual model identifiers (e.g. `Gemini 3.8 Flash High`), reasoning effort, and real tool execution steps.
9. **Idle Breathing & Kinetic Pauses (Holds)**:
   - Elements on screen > 2s must breathe (`Math.sin(frame / 28) * 4px`).
   - Include intentional holds (15–20 frames of stillness) between fast kinetic cuts to create cinematic contrast.
10. **Procedural Zero-Dependency Audio**:
    - Synthesize 16-bit 44.1kHz WAV SFX (`whoosh`, `bass`, `pop`, `tick`, `impact`) and background soundtrack via Node.js scripts into `public/sfx/`. Sync hits 2–3 frames before visual landing.
11. **Mandatory Still-Frame Verification Loop**:
    - Render keyframes across every scene, inspect them visually, fix spacing and contrast bugs, and only then render the master video.

---

## Directory & Architecture Standard

```
.
├── remotion.config.ts        # Browser executable & render configs
├── package.json
├── public/
│   └── sfx/                  # Procedural 16-bit WAV SFX & music bed
├── scripts/
│   └── gen-audio.mjs         # Audio synthesizer script (pure Node.js)
└── src/
    ├── index.ts              # registerRoot entrypoint
    ├── Root.tsx              # Compositions & scene sequencing
    ├── theme.ts              # Apple HIG tokens, easings & spring presets
    ├── components/
    │   ├── Icons.tsx         # Crisp vector SVG micro-icons
    │   ├── Layers.tsx        # 5-Layer stack (BgMesh, Particles, Grade, Grain, Vignette)
    │   ├── Logo.tsx          # Unified vector brand logo
    │   ├── Motion.tsx        # Entrance, WordReveal, AnimatedCounter, Breathing
    │   └── Terminal.tsx      # Authentic developer CLI / TUI harness
    └── scenes/
        ├── Scene1Hook.tsx
        ├── Scene2Terminal.tsx
        ├── Scene3Bento.tsx
        ├── Scene4Arsenal.tsx
        └── Scene5CTA.tsx
```

---

## Step-by-Step Workflow

### 1. Scope & Theme Setup
- Define aspect ratio: 1920×1080 (Landscape showcase) or 1080×1920 (Vertical 9:16 Reel).
- Frame rate: 30 FPS standard.
- Copy `assets/theme.ts` into `src/theme.ts` with Apple system dark mode tokens (`#000000` true black, frosted vibrancy materials, Apple system accents).

### 2. Audio Synthesis
- Run `node scripts/gen-audio.mjs` to generate `whoosh.wav`, `bass.wav`, `tick.wav`, `pop.wav`, and `track.wav` into `public/sfx/`.

### 3. Scene Architecture & Storyboard
Follow the 5-Beat Apple Reveal structure:
```
0.0–2.0s   HOOK        The core friction or claim. Big typography + deliberate hold.
2.0–5.0s   DEMO        The interface awakens (authentic CLI harness typing + agent turn).
5.0–8.0s   CAPABILITY  Bento grid breakdown + animated numeric metric counter.
8.0–11.5s  ARSENAL     Command suite + interactive code diff editor.
11.5–15.0s PAYOFF/CTA  Hero logo reveal in zero gravity + terminal install pill.
```

### 4. Verification & Inspection
Extract stills across every visual transition:
```bash
for f in 20 55 115 200 295 400; do
  npx remotion still src/index.ts <CompositionId> out/frame_$f.png --frame $f --overwrite
done
```
Inspect every frame visually for:
- Spacing gaps (use px, never em in flex rows).
- Safe-zone boundaries.
- No glyph rendering bugs or overlapping path glitches.
- High contrast and Apple-style restraint.

### 5. Final Render
```bash
npx remotion render src/index.ts <CompositionId> out/final.mp4 --codec h264 --crf 17
```
