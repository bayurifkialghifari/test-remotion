// src/scenes/Scene2Terminal.tsx — Scene 2: Terminal Awakening (2.5s – 5.5s / 90 frames)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Terminal } from "../components/Terminal";
import { Breathing, Entrance } from "../components/Motion";

export const Scene2Terminal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring (drops in with weight)
  const enterProgress = spring({
    frame,
    fps,
    config: theme.spring.smooth,
  });

  const enterY = interpolate(enterProgress, [0, 1], [80, 0]);
  const enterScale = interpolate(enterProgress, [0, 1], [0.92, 1]);

  // Exit transition in last 8 frames (slides to left for Scene 3)
  const exitProgress = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: theme.ease.in,
  });

  const exitX = interpolate(exitProgress, [0, 1], [0, -600]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0.4]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 6]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${exitX}px)`,
        opacity: exitOpacity,
        filter: `blur(${exitBlur}px)`,
      }}
    >
      {/* Scene Header */}
      <Entrance delay={4} style={{ marginBottom: 28, textAlign: "center" }}>
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            color: theme.colors.accent,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          [ Autonomous Terminal Interface ]
        </div>
        <div
          style={{
            fontFamily: theme.fonts.display,
            fontSize: 48,
            fontWeight: 800,
            color: theme.colors.text,
            letterSpacing: "-0.02em",
          }}
        >
          Your terminal, <span style={{ color: theme.colors.primary }}>supercharged</span>.
        </div>
      </Entrance>

      {/* Main Terminal Window with micro-breathing */}
      <Breathing period={35} amplitudeY={4}>
        <div
          style={{
            transform: `translateY(${enterY}px) scale(${enterScale})`,
            opacity: enterProgress,
          }}
        >
          <Terminal
            width={1080}
            interactivePhase={true}
          />
        </div>
      </Breathing>
    </AbsoluteFill>
  );
};
