// src/components/Layers.tsx — Refined Google DeepMind 5-Layer Stack
import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

export const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const d1 = Math.sin(frame / 65) * 60;
  const d2 = Math.cos(frame / 80) * 50;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.bg, overflow: "hidden" }}>
      {/* Precision architectural dot/grid matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 30%, transparent 80%)",
        }}
      />

      {/* Ambient 1: Soft Google Blue deep field */}
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          top: -450 + d1,
          left: -200 + d2,
          filter: "blur(120px)",
          background: `radial-gradient(circle, ${theme.colors.primary}1F 0%, transparent 68%)`,
          pointerEvents: "none",
        }}
      />

      {/* Ambient 2: DeepMind Violet subtle presence */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          bottom: -400 - d2,
          right: -150 - d1,
          filter: "blur(130px)",
          background: `radial-gradient(circle, ${theme.colors.deepmind}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// Zero-gravity floating particles drifting upward with Google chromatic hues
export const ZeroGParticles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();

  const colors = [
    theme.colors.primary,  // Google Blue
    theme.colors.deepmind, // DeepMind Violet
    theme.colors.emerald,  // Google Green
    theme.colors.amber,    // Google Amber
  ];

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const seedX = ((i * 137.5) % 1920);
      const speed = 0.5 + ((i * 31) % 10) * 0.12;
      const size = 2 + ((i * 17) % 4);
      const alpha = 0.15 + ((i * 23) % 6) * 0.05;
      const swayPeriod = 45 + (i % 25);
      const color = colors[i % colors.length];
      return { id: i, x: seedX, speed, size, alpha, swayPeriod, color };
    });
  }, [count]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {particles.map((p) => {
        const totalHeight = 1200;
        const currentY = (totalHeight - ((frame * p.speed * 2 + p.id * 80) % totalHeight)) - 60;
        const currentX = p.x + Math.sin((frame + p.id * 10) / p.swayPeriod) * 16;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: currentX,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: p.alpha,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {/* Subtle filmic blue soft-light tint */}
    <AbsoluteFill
      style={{
        backgroundColor: theme.colors.primary,
        mixBlendMode: "soft-light",
        opacity: 0.08,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(10,11,16,0.25) 0%, transparent 20%, transparent 80%, rgba(10,11,16,0.35) 100%)",
      }}
    />
  </AbsoluteFill>
);

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.035,
        mixBlendMode: "overlay",
      }}
    />
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background:
        "radial-gradient(ellipse at center, transparent 52%, rgba(5,6,10,0.3) 85%, rgba(4,5,8,0.65) 100%)",
    }}
  />
);
