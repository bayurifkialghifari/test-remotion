// src/components/Terminal.tsx — Realistic Antigravity CLI (`agy`) TUI Harness
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { IconBolt, IconFileCode } from "./Icons";

export const Terminal: React.FC<{
  commandText?: string;
  typeStartFrame?: number;
  showOutput?: boolean;
  outputStartFrame?: number;
  width?: number;
  style?: React.CSSProperties;
}> = ({
  commandText = 'agy --effort=max "orchestrate autonomous refactor"',
  typeStartFrame = 10,
  showOutput = true,
  outputStartFrame = 38,
  width = 1040,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Command typing
  const charsCount = commandText.length;
  const typingDuration = 28;
  const currentChars = Math.min(
    charsCount,
    Math.max(
      0,
      Math.floor(
        interpolate(
          frame,
          [typeStartFrame, typeStartFrame + typingDuration],
          [0, charsCount],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        )
      )
    )
  );
  const typedCommand = commandText.slice(0, currentChars);
  const isTypingDone = currentChars >= charsCount;
  const cursorBlink = Math.floor(frame / (fps * 0.25)) % 2 === 0;

  // Turn execution spring
  const outProgress = spring({
    frame: frame - outputStartFrame,
    fps,
    config: theme.spring.smooth,
  });

  return (
    <div
      style={{
        width,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "rgba(18, 18, 20, 0.88)",
        border: `1px solid ${theme.colors.border}`,
        boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        fontFamily: theme.fonts.mono,
        color: theme.colors.text,
        fontSize: 14,
        lineHeight: 1.5,
        ...style,
      }}
    >
      {/* macOS Window Titlebar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(28, 28, 30, 0.75)",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        <div
          style={{
            fontSize: 13,
            color: "rgba(235, 235, 245, 0.65)",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>agy — test-agy</span>
          <span style={{ opacity: 0.35 }}>│</span>
          <span style={{ color: theme.colors.primary }}>v2.4.0</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.colors.emerald }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: theme.colors.emerald,
              boxShadow: `0 0 8px ${theme.colors.emerald}`,
            }}
          />
          CONNECTED
        </div>
      </div>

      {/* Terminal Content Body */}
      <div style={{ padding: "22px 26px" }}>
        {/* Real AGY Session Banner */}
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 20,
            backgroundColor: "rgba(255, 255, 255, 0.025)",
            fontSize: 13,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#FFF", letterSpacing: "0.02em" }}>
              Google Antigravity CLI (`agy`)
            </span>
            <span style={{ color: theme.colors.primary, fontSize: 12 }}>
              Active Workspace: /home/bayur/montion/test-agy
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, color: "rgba(235, 235, 245, 0.6)", fontSize: 12 }}>
            <span>Model: <strong style={{ color: "#93C5FD" }}>Gemini 3.8 Flash (High)</strong></span>
            <span>•</span>
            <span>Effort: <strong style={{ color: theme.colors.emerald }}>MAX</strong></span>
            <span>•</span>
            <span>Mode: <strong style={{ color: theme.colors.amber }}>plan</strong></span>
          </div>
        </div>

        {/* User Shell Command */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ color: theme.colors.primary, fontWeight: 700 }}>❯</span>
          <span style={{ color: "#FFF", fontWeight: 600 }}>{typedCommand}</span>
          {(!isTypingDone || cursorBlink) && (
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 18,
                backgroundColor: theme.colors.primary,
                marginLeft: -4,
              }}
            />
          )}
        </div>

        {/* Autonomous Turn Output */}
        {showOutput && frame >= outputStartFrame && (
          <div
            style={{
              opacity: outProgress,
              transform: `translateY(${interpolate(outProgress, [0, 1], [14, 0])}px)`,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Thinking step */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(235, 235, 245, 0.55)", fontSize: 13 }}>
              <span style={{ color: theme.colors.deepmind }}>●</span>
              <span>Thinking (1.8s)... Synthesizing architecture plan across 38 files</span>
            </div>

            {/* Tool Execution Card */}
            <div
              style={{
                border: "1px solid rgba(10, 132, 255, 0.28)",
                borderRadius: 8,
                padding: "10px 14px",
                backgroundColor: "rgba(10, 132, 255, 0.05)",
                fontSize: 13,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: theme.colors.primary, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  <IconFileCode size={14} color={theme.colors.primary} />
                  Tool Call: replace_file_content (src/core/gravity.ts)
                </span>
                <span style={{ color: theme.colors.emerald, fontSize: 12 }}>+142  -18</span>
              </div>
              <div style={{ color: "rgba(235, 235, 245, 0.75)", fontSize: 12 }}>
                ✓ Clean replacement verified • Unit tests passing (18/18 green)
              </div>
            </div>

            {/* Bottom Real Input Box */}
            <div
              style={{
                marginTop: 8,
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: 8,
                padding: "10px 14px",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: theme.colors.primary, fontSize: 12 }}>[input]</span>
                <span style={{ color: "#FFF" }}>/plan implement zero-g motion design</span>
                <span style={{ display: "inline-block", width: 6, height: 14, backgroundColor: "#FFF", opacity: 0.8 }} />
              </div>
              <div style={{ color: "rgba(235, 235, 245, 0.35)", fontSize: 11 }}>
                [Enter] Send  [Tab] Auto  [/] Commands
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
