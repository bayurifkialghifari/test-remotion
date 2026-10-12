// src/scenes/Scene1Hook.tsx — Scene 1: The Dilemma & The Rupture (0.0s – 2.5s / 75 frames)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance, WordReveal } from "../components/Motion";

export const Scene1Hook: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part A (0–32f): "Coding has gravity."
  // Part B (32–75f): "DEFY IT. MEET ANTIGRAVITY CLI."
  const showPartB = frame >= 30;

  // Scale-through / whip exit in last 8 frames
  const exitProgress = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: theme.ease.in,
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.25]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 10]);

  // Part B Entrance spring
  const partBSpring = spring({
    frame: frame - 32,
    fps,
    config: theme.spring.bouncy,
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
        filter: `blur(${exitBlur}px)`,
      }}
    >
      {!showPartB ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: theme.fonts.mono,
              fontSize: 16,
              color: theme.colors.accent,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            [ The Friction of Modern Development ]
          </div>

          <WordReveal
            text="CODING HAS GRAVITY."
            delay={4}
            per={4}
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: theme.colors.text,
              justifyContent: "center",
            }}
          />

          <Entrance delay={14}>
            <div
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 24,
                color: theme.colors.textDim,
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Friction. Repetitive boilerplate. Endless context switching.
            </div>
          </Entrance>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              background: "linear-gradient(135deg, #FFFFFF 40%, #93C5FD 75%, #C4B5FD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 15px 35px rgba(66, 133, 244, 0.3))",
              transform: `scale(${interpolate(partBSpring, [0, 1], [0.85, 1])})`,
              opacity: partBSpring,
            }}
          >
            DEFY GRAVITY.
          </div>

          <Entrance delay={42} springConfig={theme.spring.snappy}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 28px",
                borderRadius: 999,
                backgroundColor: "rgba(66, 133, 244, 0.12)",
                border: `1px solid rgba(66, 133, 244, 0.35)`,
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5)`,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: theme.colors.emerald,
                  boxShadow: `0 0 10px ${theme.colors.emerald}`,
                }}
              />
              <span
                style={{
                  fontFamily: theme.fonts.mono,
                  fontSize: 22,
                  fontWeight: 600,
                  color: theme.colors.text,
                  letterSpacing: "0.08em",
                }}
              >
                MEET ANTIGRAVITY CLI
              </span>
            </div>
          </Entrance>
        </div>
      )}
    </AbsoluteFill>
  );
};
