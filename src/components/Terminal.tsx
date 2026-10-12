// src/components/Terminal.tsx — Authentic Antigravity CLI (`agy`) TUI Harness
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// Exact ANSI 24-bit RGB Pixel Art Logo for Antigravity CLI (11 cols x 8 rows)
export const PixelLogo: React.FC<{ size?: number }> = ({ size = 7 }) => {
  const blocks: [number, number, string][] = [
    // Row 0: Peak
    [4, 0, "#FFA726"], [5, 0, "#FF5722"],
    // Row 1
    [3, 1, "#FDD835"], [4, 1, "#FB8C00"], [5, 1, "#F4511E"], [6, 1, "#E53935"],
    // Row 2: Continuous arch bridge
    [2, 2, "#9CCC65"], [3, 2, "#D4E157"], [4, 2, "#FFA726"], [5, 2, "#FF7043"], [6, 2, "#E91E63"], [7, 2, "#BA68C8"],
    // Row 3: Arch opening starts
    [2, 3, "#7CB342"], [3, 3, "#9CCC65"], [7, 3, "#AB47BC"], [8, 3, "#8E24AA"],
    // Row 4
    [1, 4, "#4CAF50"], [2, 4, "#66BB6A"], [8, 4, "#5C6BC0"], [9, 4, "#3F51B5"],
    // Row 5
    [1, 5, "#26A69A"], [2, 5, "#42A5F5"], [8, 5, "#3949AB"], [9, 5, "#1E88E5"],
    // Row 6: Feet stepping out
    [0, 6, "#4DD0E1"], [1, 6, "#29B6F6"], [9, 6, "#1976D2"], [10, 6, "#2196F3"],
    // Row 7: Base
    [0, 7, "#80DEEA"], [1, 7, "#4FC3F7"], [9, 7, "#1976D2"], [10, 7, "#1565C0"],
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 11 * size,
        height: 8 * size,
        flexShrink: 0,
      }}
    >
      {blocks.map(([col, row, color], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: col * size,
            top: row * size,
            width: size - 0.5,
            height: size - 0.5,
            backgroundColor: color,
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  );
};

export const Terminal: React.FC<{
  width?: number;
  interactivePhase?: boolean;
  style?: React.CSSProperties;
}> = ({ width = 1120, interactivePhase = true, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase sequencing (relative to scene start frame)
  // Phase 1 (0..28): Header + Banner
  // Phase 2 (28..62): Switch Model & Effort Slider Modal
  // Phase 3 (62..90): Exit /model, cycle to Plan Mode & Type Command

  const showModal = interactivePhase && frame >= 24 && frame < 65;
  const showPrompt = !interactivePhase || frame >= 65;

  // Typing `/model`
  const modelCmd = "/model";
  const modelChars = Math.min(
    modelCmd.length,
    Math.max(0, Math.floor(interpolate(frame, [8, 20], [0, modelCmd.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })))
  );

  // Typing prompt command in Phase 3
  const planCmd = "/plan orchestrate zero-g motion design";
  const planChars = Math.min(
    planCmd.length,
    Math.max(0, Math.floor(interpolate(frame, [68, 86], [0, planCmd.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })))
  );

  // Modal spring entrance
  const modalSpring = spring({
    frame: frame - 25,
    fps,
    config: theme.spring.smooth,
  });

  const cursorBlink = Math.floor(frame / (fps * 0.25)) % 2 === 0;

  return (
    <div
      style={{
        width,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "rgba(32, 10, 26, 0.94)", // Authentic Ubuntu plum dark terminal
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.92), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        fontFamily: theme.fonts.mono,
        color: "#F3F4F6",
        fontSize: 13,
        lineHeight: 1.45,
        ...style,
      }}
    >
      {/* Terminal Titlebar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(22, 6, 18, 0.88)",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: "#27C93F" }} />
        </div>

        <div style={{ fontSize: 12, color: "rgba(235, 235, 245, 0.6)", fontWeight: 500 }}>
          bayur@montion: ~/montion/test-agy — agy 1.3.3
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#30D158" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#30D158" }} />
          LOCAL WSL2
        </div>
      </div>

      {/* Terminal Canvas */}
      <div style={{ padding: "20px 26px" }}>
        {/* Exact Header from Real agy cli */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 18 }}>
          <PixelLogo size={7.5} />
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ color: "#3B82F6", fontWeight: 600, fontSize: 14 }}>
              Antigravity CLI 1.3.3
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 12 }}>
              bayurifkialgh@gmail.com <span style={{ color: "rgba(156, 163, 175, 0.7)" }}>(Google AI Pro)</span>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 12 }}>
              Gemini 3.8 Flash (High)
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 12 }}>
              ~/montion/test-agy
            </div>
          </div>
        </div>

        {/* Command Invocation */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ color: "#3B82F6", fontWeight: 700 }}>&gt;</span>
          <span style={{ color: "#60A5FA" }}>{modelCmd.slice(0, modelChars)}</span>
          {frame < 24 && cursorBlink && (
            <span style={{ display: "inline-block", width: 7, height: 15, backgroundColor: "#E5E7EB" }} />
          )}
        </div>

        {frame >= 22 && frame < 65 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#9CA3AF", fontSize: 12 }}>
            <span style={{ color: "#3B82F6" }}>└</span>
            <span>Exited /model command</span>
          </div>
        )}

        {/* Phase 1: Real Verbosity Notification Banner */}
        {frame < 24 && (
          <div
            style={{
              borderLeft: "2px solid #F59E0B",
              paddingLeft: 12,
              margin: "12px 0 18px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontSize: 12,
            }}
          >
            <div style={{ color: "#F3F4F6", fontWeight: 600 }}>
              Verbosity now defaults to medium
            </div>
            <div style={{ color: "#9CA3AF", maxWidth: 840, lineHeight: 1.4 }}>
              Verbosity is now medium by default, so tool calls and thoughts roll up into summaries. You can change your preferred verbosity anytime in /config &gt; Verbosity.
            </div>
            <div style={{ color: "rgba(156, 163, 175, 0.6)", fontSize: 11 }}>
              esc to dismiss
            </div>
          </div>
        )}

        {/* Phase 2: Exact Switch Model & Effort Slider UI */}
        {showModal && (
          <div
            style={{
              margin: "12px 0 16px",
              opacity: modalSpring,
              transform: `translateY(${interpolate(modalSpring, [0, 1], [10, 0])}px)`,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 8,
              padding: "16px 20px",
              backgroundColor: "rgba(20, 6, 16, 0.9)",
            }}
          >
            <div style={{ fontWeight: 700, color: "#FFFFFF", marginBottom: 10, fontSize: 13 }}>
              Switch Model
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 12 }}>
              <span style={{ color: "#9CA3AF" }}>Search:</span>
              <span style={{ display: "inline-block", width: 7, height: 14, backgroundColor: "#E5E7EB" }} />
            </div>

            {/* Models list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14, fontSize: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#3B82F6", fontWeight: 600 }}>
                <span>&gt; Gemini 3.8 Flash</span>
                <span style={{ color: "rgba(156, 163, 175, 0.6)", fontWeight: 400 }}>(current)</span>
              </div>
              <div style={{ color: "#9CA3AF" }}>  Gemini 3.7 Flash</div>
              <div style={{ color: "#9CA3AF" }}>  Claude Sonnet 4.6 (Thinking)</div>
              <div style={{ color: "#9CA3AF" }}>  GPT-OSS 120B (Medium)</div>
            </div>

            {/* Effort Slider */}
            <div style={{ margin: "14px 0 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12 }}>
                <span style={{ color: "#9CA3AF" }}>Effort</span>
                <span style={{ color: "#6B7280" }}>◀</span>
                <div style={{ display: "flex", alignItems: "center", width: 220, position: "relative" }}>
                  <div style={{ height: 2, backgroundColor: "#EF4444", width: "100%" }} />
                  {/* low dot */}
                  <div style={{ position: "absolute", left: "10%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#EF4444", transform: "translate(-50%, -50%)", top: "50%" }} />
                  {/* med dot */}
                  <div style={{ position: "absolute", left: "50%", width: 6, height: 6, borderRadius: "50%", backgroundColor: "#EF4444", transform: "translate(-50%, -50%)", top: "50%" }} />
                  {/* high target */}
                  <div style={{ position: "absolute", left: "90%", width: 10, height: 10, borderRadius: "50%", border: "2px solid #EF4444", backgroundColor: "rgba(239, 68, 68, 0.4)", transform: "translate(-50%, -50%)", top: "50%" }} />
                </div>
                <span style={{ color: "#6B7280" }}>▶</span>
              </div>
              <div style={{ display: "flex", width: 220, marginLeft: 64, justifyContent: "space-between", fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
                <span>low</span>
                <span>medium</span>
                <span style={{ color: "#EF4444", fontWeight: 700 }}>high</span>
              </div>
              <div style={{ color: "rgba(156, 163, 175, 0.7)", fontStyle: "italic", fontSize: 11, marginTop: 6, marginLeft: 64 }}>
                Deepest reasoning for complex problems – slower but strongest
              </div>
            </div>

            {/* Keyboard hint */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 10, marginTop: 12, fontSize: 11, color: "#9CA3AF", display: "flex", gap: 14 }}>
              <span><strong style={{ color: "#3B82F6" }}>↑/↓</strong> Navigate</span>
              <span><strong style={{ color: "#3B82F6" }}>←/→</strong> Effort</span>
              <span><strong style={{ color: "#3B82F6" }}>enter</strong> Select</span>
              <span><strong style={{ color: "#3B82F6" }}>esc</strong> Go Back</span>
            </div>
          </div>
        )}

        {/* Phase 3 / Default: Real Prompt Bar & Status Bar */}
        {showPrompt && (
          <div style={{ marginTop: 16 }}>
            {/* Top Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.16)", width: "100%", margin: "8px 0" }} />

            {/* Interactive Prompt Line */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0", fontSize: 13 }}>
              <span style={{ color: "#3B82F6", fontWeight: 700 }}>&gt;</span>
              {frame >= 68 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#FFFFFF", fontWeight: 600 }}>{planCmd.slice(0, planChars)}</span>
                  {cursorBlink && (
                    <span style={{ display: "inline-block", width: 8, height: 16, backgroundColor: "#30D158", marginLeft: 2 }} />
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", color: "#9CA3AF" }}>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "rgba(48, 209, 88, 0.2)",
                      border: "1px solid #30D158",
                      color: "#FFFFFF",
                      padding: "0 2px",
                      borderRadius: 2,
                    }}
                  >
                    P
                  </span>
                  <span style={{ color: "rgba(156, 163, 175, 0.8)", marginLeft: 2 }}>
                    lan mode: research &amp; plan only (shift+tab to cycle)
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.16)", width: "100%", margin: "8px 0" }} />

            {/* Status Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
              <div style={{ color: "#9CA3AF" }}>? for shortcuts</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#3B82F6", fontWeight: 600 }}>plan</span>
                <span style={{ color: "#6B7280" }}>•</span>
                <span style={{ color: "#9CA3AF" }}>Gemini 3.8 Flash</span>
                <span style={{ color: "#6B7280" }}>•</span>
                <span style={{ color: "#9CA3AF" }}>high</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
