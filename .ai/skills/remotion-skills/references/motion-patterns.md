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

## 2. Realistic Developer CLI Harness Component
```tsx
export const RealTuiHarness: React.FC<{
  workspace: string;
  model: string;
  command: string;
  toolCall: string;
}> = ({ workspace, model, command, toolCall }) => (
  <div style={{
    borderRadius: 18,
    backgroundColor: "rgba(18, 18, 20, 0.9)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(40px)",
    fontFamily: "JetBrains Mono, monospace",
    padding: 24,
  }}>
    {/* TUI Session Box */}
    <div style={{ border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 10, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong style={{ color: "#FFF" }}>Antigravity CLI (agy)</strong>
        <span style={{ color: "#0A84FF", fontSize: 12 }}>{workspace}</span>
      </div>
      <div style={{ color: "rgba(235, 235, 245, 0.6)", fontSize: 12, marginTop: 4 }}>
        Model: <strong style={{ color: "#93C5FD" }}>{model}</strong> • Effort: <strong style={{ color: "#30D158" }}>MAX</strong>
      </div>
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
