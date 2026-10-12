# Remotion Design Rules & Anti-Slop Principles

Guidelines for producing clean, executive-grade product videos instead of generic "AI slop".

---

## 1. What Makes Motion Look "Slop" vs "Apple Grade"

| Attribute | Generic AI / Crypto Slop | Apple / Executive Grade |
| :--- | :--- | :--- |
| **Color Palette** | Oversaturated neon cyan (#00ffff), hot pink (#ff007f), purple glows everywhere | True black (`#000000`), deep zinc (`#0A0A0C`), subtle deliberate accents (Blue, Green, Violet) |
| **Lighting** | Massive radial blur gradients (300px blur, 60% opacity) covering the entire screen | Focused directional specular sheen, subtle rim light (`1px solid rgba(255,255,255,0.14)`), `inset 0 1px 0 rgba(255,255,255,0.15)` |
| **Motion Physics** | Constant linear velocity, bouncy cartoon springs (bounciness > 15, low damping) | Critically damped / slightly underdamped springs (`damping: 26-30`, `stiffness: 110-140`, `mass: 0.9-1.0`) |
| **Typography** | Generic sans-serif or comic fonts, tiny subtitles with garish outline borders | System font stacks (`SF Pro Display`, `Inter`, `system-ui`), tight tracking (`letterSpacing: -0.035em`), precise weights (400, 600, 800) |
| **Pacing** | Rapid jump cuts every 0.3s or 5-second stagnant slides with floating text | Staggered choreographed entrances (3-5 frame offsets), fluid continuous transitions, rhythmic crescendo |
| **Graphics & Icons** | Unicode emojis (🚀, 🔥, ⚡) blown up to 64px with blurry edges | Crisp monochrome SVG vector icons with subtle accent badge backdrops |

---

## 2. Color System: Pro Dark Palette

### Background Hierarchy
- `bg.deep`: `#000000` (Pure True Black, OLED grade)
- `bg.surface`: `#070709` (Base container background)
- `bg.surfaceElevated`: `#121216` (Floating card / modal surface)
- `bg.card`: `rgba(18, 18, 22, 0.72)` (Glass backdrop)

### Border & Sheen
- Standard border: `1px solid rgba(255, 255, 255, 0.08)`
- Highlight border: `1px solid rgba(255, 255, 255, 0.16)`
- Specular rim: `box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 20px 40px -15px rgba(0, 0, 0, 0.7)`

### Typography Contrast
- `text.primary`: `#FFFFFF` (100% white for titles and primary metrics)
- `text.secondary`: `rgba(255, 255, 255, 0.65)` (Subtitles, labels)
- `text.tertiary`: `rgba(255, 255, 255, 0.40)` (Metadata, hints, timestamps)
- `text.quaternary`: `rgba(255, 255, 255, 0.25)` (Grid lines, subtle dividers)

---

## 3. Visual Layering Architecture

Every scene composition should follow the **5-Layer Depth Stack**:

```
Layer 5 (Top):    Vignette & Micro Film Grain (2-3% opacity, pointer-events: none)
Layer 4:          Color Grading & Subtle Accent Ambient Bloom (< 12% opacity)
Layer 3 (Hero):   Primary Interactive/UI Elements (Cards, Terminal, Vector Logos)
Layer 2:          Zero-G Particles / Floating Ambient Elements (Drifting, < 25% opacity)
Layer 1 (Bottom): Deep Mesh Background (#000000 base + subtle directional radial falloff)
```

### Why this matters:
Without Layer 5 (grain & vignette), digital renders look flat and plasticky.
Without Layer 1 & 2 (depth background), floating cards lack a sense of spatial presence.

---

## 4. Authentic UI Reproduction (No Fake Generic Mocks)

When featuring developer tools, CLIs, or dashboards:
1. **Never build a naive generic mock**: Don't just slap 3 colored dots and "Hello World".
2. **Include authentic UI chrome**:
   - Model indicators, active tokens, latency, mode badges.
   - Status bar with shortcuts (`/plan`, `/grill-me`, `/schedule`).
   - Real terminal file diffs with syntax styling (red deletions, green additions).
3. **Use authentic fonts**:
   - UI code: `JetBrains Mono`, `SF Mono`, `Fira Code`, `ui-monospace`.
   - Heading display: `SF Pro Display`, `Inter`, `-apple-system`.

---

## 5. Composition Golden Ratios

- **16:9 4K / 1080p Canvas**: 1920x1080 @ 30fps.
- **Card Padding**: 28px - 36px.
- **Corner Radius**: 18px - 24px (Apple squircle aesthetic).
- **Heading Scale**: 64px - 84px with line height `1.08`.
- **Badge Font Size**: 12px - 14px with `letterSpacing: '0.04em'` and uppercase text.
