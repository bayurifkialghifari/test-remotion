// src/scenes/Scene4Arsenal.tsx — Scene 4: Command Arsenal & Code Diff (8.5s – 11.5s / 90 frames)
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { BadgePill, Breathing, Entrance } from "../components/Motion";
import { IconFileCode } from "../components/Icons";

export const Scene4Arsenal: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterProgress = spring({
    frame,
    fps,
    config: theme.spring.smooth,
  });

  // Scale-through zoom exit in last 8 frames
  const exitProgress = interpolate(frame, [duration - 8, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: theme.ease.in,
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.35]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Orbiting float offsets for pills
  const pill1Y = Math.sin(frame / 20) * 8;
  const pill2Y = Math.cos(frame / 22) * 7;
  const pill3Y = Math.sin(frame / 25) * 6;
  const pill4Y = Math.cos(frame / 18) * 8;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${interpolate(enterProgress, [0, 1], [0.94, 1]) * exitScale})`,
        opacity: enterProgress * exitOpacity,
        padding: "0 60px",
      }}
    >
      {/* Header */}
      <Entrance delay={2} style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontFamily: theme.fonts.mono,
            fontSize: 14,
            color: theme.colors.primary,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          [ Interactive Command Suite ]
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
          Orchestrate at the <span style={{ color: theme.colors.primary }}>speed of thought</span>.
        </div>
      </Entrance>

      {/* Floating Slash Command Arsenal Row */}
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <Entrance delay={5}>
          <div style={{ transform: `translateY(${pill1Y}px)` }}>
            <BadgePill label="/plan — Strategy Blueprints" variant="blue" />
          </div>
        </Entrance>
        <Entrance delay={9}>
          <div style={{ transform: `translateY(${pill2Y}px)` }}>
            <BadgePill label="/boost — Multi-Perspective Reasoning" variant="deepmind" />
          </div>
        </Entrance>
        <Entrance delay={13}>
          <div style={{ transform: `translateY(${pill3Y}px)` }}>
            <BadgePill label="/teamwork-preview — Autonomous Squads" variant="emerald" />
          </div>
        </Entrance>
        <Entrance delay={17}>
          <div style={{ transform: `translateY(${pill4Y}px)` }}>
            <BadgePill label="/goal — Persistent Overnight Autopilot" variant="amber" />
          </div>
        </Entrance>
      </div>

      {/* Dynamic Code Diff Window */}
      <Breathing period={40} amplitudeY={3}>
        <div
          style={{
            width: 880,
            borderRadius: 16,
            overflow: "hidden",
            backgroundColor: "rgba(10, 12, 19, 0.94)",
            border: `1px solid ${theme.colors.borderBright}`,
            boxShadow: `0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(66, 133, 244, 0.15)`,
            fontFamily: theme.fonts.mono,
            fontSize: 15,
          }}
        >
          {/* File bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              backgroundColor: "rgba(18, 22, 34, 0.9)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: 13,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: theme.colors.textDim }}>
              <IconFileCode size={16} color={theme.colors.primary} />
              <span style={{ color: theme.colors.text, fontWeight: 500 }}>
                src/agent/orchestrator.ts
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, fontSize: 12 }}>
              <span style={{ color: theme.colors.emerald }}>+34</span>
              <span style={{ color: theme.colors.rose }}>-4</span>
              <span
                style={{
                  color: theme.colors.primary,
                  backgroundColor: "rgba(66, 133, 244, 0.12)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontWeight: 600,
                }}
              >
                AUTONOMOUS DIFF
              </span>
            </div>
          </div>

          {/* Diff code lines */}
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                color: theme.colors.rose,
                backgroundColor: "rgba(244, 63, 94, 0.08)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              - const response = await basicLlm.generate(prompt);
            </div>
            <div
              style={{
                color: theme.colors.emerald,
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              + const plan = await orchestrator.synthesizePlan(workspace);
            </div>
            <div
              style={{
                color: theme.colors.emerald,
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              + const execution = await subagents.parallelMap(plan.tasks);
            </div>
            <div
              style={{
                color: theme.colors.emerald,
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              + await selfFixLoop.verifySuite(&#123; strict: true &#125;);
            </div>
          </div>
        </div>
      </Breathing>
    </AbsoluteFill>
  );
};
