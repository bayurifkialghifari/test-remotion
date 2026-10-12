# Remotion Motion Patterns — Component Implementations

Production-ready, tested React components for Remotion motion graphics.

## 1. Apple Deceleration Entrance
```tsx
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const Entrance: React.FC<{
  delay?: number;
  yOffset?: number;
  scaleFrom?: number;
  children: React.ReactNode;
}> = ({ delay = 0, yOffset = 36, scaleFrom = 0.94, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.smooth,
  });

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [yOffset, 0])}px) scale(${interpolate(p, [0, 1], [scaleFrom, 1])})`,
      }}
    >
      {children}
    </div>
  );
};
```

## 2. Realistic Antigravity CLI (`agy`) TUI Harness Component
```tsx
// 11x8 ANSI 24-bit RGB Pixel Art Arch Logo
export const PixelLogo: React.FC<{ size?: number }> = ({ size = 7 }) => {
  const blocks: [number, number, string][] = [
    [4, 0, "#FFA726"], [5, 0, "#FF5722"],
    [3, 1, "#FDD835"], [4, 1, "#FB8C00"], [5, 1, "#F4511E"], [6, 1, "#E53935"],
    [2, 2, "#9CCC65"], [3, 2, "#D4E157"], [4, 2, "#FFA726"], [5, 2, "#FF7043"], [6, 2, "#E91E63"], [7, 2, "#BA68C8"],
    [2, 3, "#7CB342"], [3, 3, "#9CCC65"], [7, 3, "#AB47BC"], [8, 3, "#8E24AA"],
    [1, 4, "#4CAF50"], [2, 4, "#66BB6A"], [8, 4, "#5C6BC0"], [9, 4, "#3F51B5"],
    [1, 5, "#26A69A"], [2, 5, "#42A5F5"], [8, 5, "#3949AB"], [9, 5, "#1E88E5"],
    [0, 6, "#4DD0E1"], [1, 6, "#29B6F6"], [9, 6, "#1976D2"], [10, 6, "#2196F3"],
    [0, 7, "#80DEEA"], [1, 7, "#4FC3F7"], [9, 7, "#1976D2"], [10, 7, "#1565C0"],
  ];
  return (
    <div style={{ position: "relative", width: 11 * size, height: 8 * size }}>
      {blocks.map(([col, row, color], i) => (
        <div key={i} style={{ position: "absolute", left: col * size, top: row * size, width: size - 0.5, height: size - 0.5, backgroundColor: color, borderRadius: 1 }} />
      ))}
    </div>
  );
};

export const RealAgyTui: React.FC<{
  email?: string;
  model?: string;
  workspace?: string;
  prompt?: string;
}> = ({
  email = "bayurifkialgh@gmail.com (Google AI Pro)",
  model = "Gemini 3.8 Flash (High)",
  workspace = "~/montion/test-agy",
  prompt = "/plan orchestrate zero-g motion design",
}) => (
  <div style={{
    borderRadius: 14,
    backgroundColor: "rgba(32, 10, 26, 0.94)", // Authentic Ubuntu plum dark terminal
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.92)",
    fontFamily: "JetBrains Mono, monospace",
    padding: 24,
  }}>
    {/* Session Header */}
    <div style={{ display: "flex", gap: 18, marginBottom: 16 }}>
      <PixelLogo size={7.5} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 13 }}>
        <span style={{ color: "#3B82F6", fontWeight: 600 }}>Antigravity CLI 1.3.3</span>
        <span style={{ color: "#9CA3AF" }}>{email}</span>
        <span style={{ color: "#9CA3AF" }}>{model}</span>
        <span style={{ color: "#9CA3AF" }}>{workspace}</span>
      </div>
    </div>
    {/* Divider & Prompt Bar */}
    <div style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.16)", margin: "12px 0" }} />
    <div style={{ display: "flex", gap: 8, color: "#FFF" }}>
      <span style={{ color: "#3B82F6" }}>&gt;</span>
      <span>{prompt}</span>
    </div>
    <div style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.16)", margin: "12px 0" }} />
    <div style={{ display: "flex", justifyContent: "space-between", color: "#9CA3AF", fontSize: 12 }}>
      <span>? for shortcuts</span>
      <span><strong style={{ color: "#3B82F6" }}>plan</strong> • Gemini 3.8 Flash • high</span>
    </div>
  </div>
);
```

## 3. Tabular Numeric Counter
```tsx
export const AnimatedCounter: React.FC<{ target: number; delay?: number; suffix?: string }> = ({
  target,
  delay = 0,
  suffix = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 26, stiffness: 90, mass: 0.9 } });
  const val = interpolate(p, [0, 1], [0, target]);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{val.toFixed(1)}{suffix}</span>;
};
```

## 4. 5-Layer Stack
1. `BgMesh`: Architectural dot/grid with dark ambient field.
2. `ZeroGParticles`: Floating particles with deterministic sway.
3. Content: Typography, cards, TUI harness.
4. `Grade`: 8–10% soft-light brand overlay.
5. `Grain` + `Vignette`: Procedural SVG noise flicker (`(frame * 7) % 220px`).
