// src/components/Motion.tsx — Reusable motion primitives obeying claude-remotion-skill rules
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// 1. Premium Entrance (Dual/Triple Property: translateY + scale + opacity)
export const Entrance: React.FC<{
  delay?: number;
  yOffset?: number;
  scaleFrom?: number;
  springConfig?: (typeof theme.spring)[keyof typeof theme.spring];
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  delay = 0,
  yOffset = 36,
  scaleFrom = 0.94,
  springConfig = theme.spring.smooth,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  const translateY = interpolate(p, [0, 1], [yOffset, 0]);
  const scale = interpolate(p, [0, 1], [scaleFrom, 1]);

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${translateY}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// 2. Word-by-Word Reveal with Spring
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  per?: number;
  highlightWord?: string;
  highlightColor?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  delay = 0,
  per = 3,
  highlightWord,
  highlightColor = theme.colors.primary,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.28em",
        alignItems: "center",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const p = spring({
          frame: frame - delay - i * per,
          fps,
          config: theme.spring.snappy,
        });

        const isHighlight =
          highlightWord &&
          word.toLowerCase().replace(/[^a-z0-9]/g, "") ===
            highlightWord.toLowerCase().replace(/[^a-z0-9]/g, "");

        const y = interpolate(p, [0, 1], [30, 0]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${y}px)`,
              color: isHighlight ? highlightColor : undefined,
              textShadow: isHighlight
                ? `0 0 40px ${highlightColor}88, 0 0 80px ${highlightColor}44`
                : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// 3. Animated Numeric Counter (tabular-nums to prevent jitter)
export const AnimatedCounter: React.FC<{
  target: number;
  delay?: number;
  durationInFrames?: number;
  decimals?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({
  target,
  delay = 0,
  decimals = 1,
  suffix = "",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 24, stiffness: 85, mass: 0.8 },
  });

  const value = interpolate(p, [0, 1], [0, target]);

  return (
    <span
      style={{
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum"',
        display: "inline-block",
        ...style,
      }}
    >
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// 4. Whip-pan Wrapper for High-Velocity Cuts
export const Whip: React.FC<{
  duration: number;
  first?: boolean;
  last?: boolean;
  children: React.ReactNode;
}> = ({ duration, first = false, last = false, children }) => {
  const frame = useCurrentFrame();

  const inX = first
    ? 0
    : interpolate(frame, [0, 8], [1200, 0], {
        easing: theme.ease.out,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const outX = last
    ? 0
    : interpolate(frame, [duration - 8, duration], [0, -1200], {
        easing: theme.ease.in,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const blurIn = first
    ? 0
    : interpolate(frame, [0, 8], [6, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  const blurOut = last
    ? 0
    : interpolate(frame, [duration - 8, duration], [0, 6], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  return (
    <AbsoluteFill
      style={{
        transform: `translateX(${inX + outX}px)`,
        filter: `blur(${Math.max(blurIn, blurOut)}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// 5. Idle breathing / levitation for elements staying on screen > 2s
export const Breathing: React.FC<{
  period?: number;
  amplitudeY?: number;
  amplitudeScale?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  period = 30,
  amplitudeY = 3.5,
  amplitudeScale = 0.008,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  const floatY = Math.sin(frame / period) * amplitudeY;
  const scale = 1 + Math.sin(frame / (period * 0.8)) * amplitudeScale;

  return (
    <div
      style={{
        transform: `translateY(${floatY}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const BadgePill: React.FC<{
  label: string;
  variant?: "blue" | "deepmind" | "emerald" | "amber" | "violet" | "cyan";
  style?: React.CSSProperties;
}> = ({ label, variant = "blue", style }) => {
  const colorMap = {
    blue: {
      bg: "rgba(66, 133, 244, 0.12)",
      border: "rgba(66, 133, 244, 0.35)",
      text: "#93C5FD",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
    deepmind: {
      bg: "rgba(161, 66, 244, 0.12)",
      border: "rgba(161, 66, 244, 0.35)",
      text: "#D8B4FE",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
    violet: {
      bg: "rgba(161, 66, 244, 0.12)",
      border: "rgba(161, 66, 244, 0.35)",
      text: "#D8B4FE",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
    emerald: {
      bg: "rgba(52, 168, 83, 0.12)",
      border: "rgba(52, 168, 83, 0.35)",
      text: "#86EFAC",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
    amber: {
      bg: "rgba(251, 188, 4, 0.12)",
      border: "rgba(251, 188, 4, 0.35)",
      text: "#FDE047",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
    cyan: {
      bg: "rgba(66, 133, 244, 0.12)",
      border: "rgba(66, 133, 244, 0.35)",
      text: "#93C5FD",
      glow: "0 6px 16px rgba(0, 0, 0, 0.4)",
    },
  };

  const c = colorMap[variant] || colorMap.blue;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "9999px",
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: c.glow,
        color: c.text,
        fontFamily: theme.fonts.mono,
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.03em",
        ...style,
      }}
    >
      {label}
    </div>
  );
};
