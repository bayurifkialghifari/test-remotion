// src/scenes/Scene3Bento.tsx — Scene 3: Superpowers Bento Grid (5.5s – 8.5s / 90 frames)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Terminal } from "../components/Terminal";
import { AnimatedCounter, Breathing, Entrance } from "../components/Motion";
import { IconBolt, IconMcp, IconSwarm } from "../components/Icons";

export const Scene3Bento: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance whip
  const enterX = interpolate(frame, [0, 8], [600, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: theme.ease.out,
  });

  // Exit transition
  const exitProgress = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: theme.ease.in,
  });
  const exitX = interpolate(exitProgress, [0, 1], [0, -800]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${enterX + exitX}px)`,
        opacity: exitOpacity,
        padding: "0 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1600,
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* Left Column: Background Tilted Terminal */}
        <div
          style={{
            flex: "1 1 45%",
            perspective: 1000,
          }}
        >
          <Breathing period={40} amplitudeY={3}>
            <div
              style={{
                transform: "rotateY(12deg) scale(0.9)",
                opacity: 0.85,
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
              }}
            >
              <Terminal
                commandText="agy --agent=research 'analyze bottlenecks'"
                typeStartFrame={0}
                showOutput={true}
                outputStartFrame={15}
                width={620}
              />
            </div>
          </Breathing>
        </div>

        {/* Right Column: Bento Cards Stack */}
        <div
          style={{
            flex: "1 1 55%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Header */}
          <Entrance delay={2}>
            <div
              style={{
                fontFamily: theme.fonts.mono,
                fontSize: 14,
                color: theme.colors.accent,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              [ Unmatched Agent Capabilities ]
            </div>
            <div
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 44,
                fontWeight: 800,
                color: theme.colors.text,
                letterSpacing: "-0.02em",
              }}
            >
              Built for <span style={{ color: theme.colors.primary }}>deep velocity</span>.
            </div>
          </Entrance>

          {/* 3 Staggered Bento Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Card 1 */}
            <Entrance delay={6}>
              <div
                style={{
                  backgroundColor: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.borderBright}`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(139,92,246,0.06)`,
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <IconBolt size={26} color={theme.colors.accent} />
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.text,
                    marginBottom: 6,
                  }}
                >
                  Autonomous Loop
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    color: theme.colors.textDim,
                    lineHeight: 1.4,
                  }}
                >
                  Plans, inspects repos, applies multi-file diffs, and auto-corrects.
                </div>
              </div>
            </Entrance>

            {/* Card 2 */}
            <Entrance delay={11}>
              <div
                style={{
                  backgroundColor: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.borderBright}`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(139,92,246,0.06)`,
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <IconSwarm size={26} color={theme.colors.primary} />
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.text,
                    marginBottom: 6,
                  }}
                >
                  Subagent Swarms
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    color: theme.colors.textDim,
                    lineHeight: 1.4,
                  }}
                >
                  Spawns concurrent subagents across isolated branches and memory.
                </div>
              </div>
            </Entrance>

            {/* Card 3: MCP */}
            <Entrance delay={16}>
              <div
                style={{
                  backgroundColor: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.borderBright}`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <IconMcp size={26} color={theme.colors.accent} />
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.colors.text,
                    marginBottom: 6,
                  }}
                >
                  Native MCP & Tools
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    color: theme.colors.textDim,
                    lineHeight: 1.4,
                  }}
                >
                  Model Context Protocol support, browser automation, and local tools.
                </div>
              </div>
            </Entrance>

            {/* Card 4: Giant Metric Counter */}
            <Entrance delay={21}>
              <div
                style={{
                  backgroundColor: "rgba(66, 133, 244, 0.10)",
                  border: `1px solid rgba(66, 133, 244, 0.35)`,
                  borderRadius: 16,
                  padding: "20px 24px",
                  boxShadow: `0 15px 35px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(66, 133, 244, 0.05)`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 48,
                    fontWeight: 900,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #FFFFFF 30%, #93C5FD 75%, #34A853 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 4px 12px rgba(66, 133, 244, 0.25))",
                  }}
                >
                  <AnimatedCounter target={10.0} delay={23} decimals={1} suffix="x" />
                </div>
                <div
                  style={{
                    fontFamily: theme.fonts.mono,
                    fontSize: 12,
                    fontWeight: 600,
                    color: theme.colors.emerald,
                    letterSpacing: "0.1em",
                    marginTop: 8,
                    textTransform: "uppercase",
                  }}
                >
                  Faster Development Loop
                </div>
              </div>
            </Entrance>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
