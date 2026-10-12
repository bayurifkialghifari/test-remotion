// src/scenes/Scene5CTA.tsx — Scene 5: Payoff & Call To Action (11.5s – 15.0s / 105 frames)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Logo } from "../components/Logo";
import { Breathing, Entrance } from "../components/Motion";

export const Scene5CTA: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    config: theme.spring.smooth,
  });

  // Soft fade out at very end
  const finalFade = interpolate(frame, [duration - 15, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: enterProgress * finalFade,
        textAlign: "center",
        padding: "0 40px",
      }}
    >
      <Breathing period={35} amplitudeY={4}>
        {/* Official Google Antigravity Logo */}
        <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
          <Logo size={220} delay={0} showAura={true} />
        </div>

        {/* Brand Headline */}
        <Entrance delay={8}>
          <div
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: "#FFFFFF",
              textShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
              marginBottom: 14,
            }}
          >
            ANTIGRAVITY CLI
          </div>
        </Entrance>

        {/* Tagline */}
        <Entrance delay={14}>
          <div
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(235, 235, 245, 0.65)",
              letterSpacing: "-0.01em",
              marginBottom: 36,
            }}
          >
            Code Beyond Gravity. Built for developers who move fast.
          </div>
        </Entrance>

        {/* Install Terminal Capsule */}
        <Entrance delay={20} springConfig={theme.spring.snappy}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              padding: "16px 36px",
              borderRadius: 14,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: `1px solid rgba(255, 255, 255, 0.14)`,
              boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              fontFamily: theme.fonts.mono,
              fontSize: 19,
              color: "#FFFFFF",
            }}
          >
            <span style={{ color: theme.colors.primary, fontWeight: 700 }}>$</span>
            <span>curl -sSL https://antigravity.google/install | bash</span>
            <span
              style={{
                backgroundColor: "rgba(48, 209, 88, 0.15)",
                color: theme.colors.emerald,
                border: "1px solid rgba(48, 209, 88, 0.3)",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 6,
                letterSpacing: "0.05em",
              }}
            >
              READY
            </span>
          </div>
        </Entrance>

        {/* Footer badges */}
        <Entrance delay={26}>
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginTop: 36,
              fontFamily: theme.fonts.mono,
              fontSize: 13,
              color: theme.colors.textMuted,
              letterSpacing: "0.05em",
            }}
          >
            <span>Google DeepMind</span>
            <span>•</span>
            <span>Next-Gen Agentic Platform</span>
            <span>•</span>
            <span>Terminal & IDE 2.0</span>
          </div>
        </Entrance>
      </Breathing>
    </AbsoluteFill>
  );
};
