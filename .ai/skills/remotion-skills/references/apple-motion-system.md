# Apple Human Interface Guidelines — Motion & Color for Video

Reference: [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion) and [Apple HIG Color](https://developer.apple.com/design/human-interface-guidelines/color)

## 1. Physics-Based Springs

Apple motion avoids mechanical stiffness and artificial bounce. Motion feels like an object in the physical world with mass, friction, and natural momentum.

### Recommended Spring Presets:
```ts
export const appleSprings = {
  // Fluid Apple Hero Entrance: Generous damping, zero oscillation
  smooth: { damping: 28, stiffness: 120, mass: 1.0 },

  // Responsive UI feedback: Snappy settling for small badges & icons
  snappy: { damping: 22, stiffness: 180, mass: 0.8 },

  // Gentle Physical Settle: Used for card drops and modal sheets
  bouncy: { damping: 18, stiffness: 150, mass: 0.9 },
};
```

### Contrast & Deliberate Holds
Constant animation reads as nervous and cheap. Apple Keynote presentations use extreme dynamic range in pacing:
- Fast transition (8–12 frames)
- Complete visual stillness / hold (15–25 frames)
- Next coordinated move

---

## 2. Apple Dark Mode Palette & Vibrancy Materials

### Base Surfaces:
- System Background (Pro Display True Black): `#000000`
- Secondary Background: `#0A0A0C`
- Tertiary Background: `#1C1C1E`

### Vibrancy Glass Materials:
- Frosted Card Background: `rgba(28, 28, 30, 0.72)`
- Backdrop Blur: `backdropFilter: "blur(40px)"`
- Border: `1px solid rgba(255, 255, 255, 0.12)`
- Specular Top Edge: `boxShadow: "0 24px 64px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.14)"`

### Semantic System Colors:
- System Blue: `#0A84FF`
- System Purple: `#BF5AF2`
- System Green: `#30D158`
- System Orange: `#FF9F0A`
- System Red: `#FF453A`
- Label (Primary Text): `#FFFFFF`
- Secondary Label: `rgba(235, 235, 245, 0.68)`
- Tertiary Label: `rgba(235, 235, 245, 0.38)`

---

## 3. Typography & Hierarchy
- Hero Display: High-contrast white (`#FFFFFF`) with tracking `-0.035em`, line-height `1.0`.
- Secondary labels: Dimmed to `rgba(235, 235, 245, 0.65)` to create immediate visual depth.
- Monospace Data: `fontVariantNumeric: "tabular-nums"` on counters and benchmarks.
