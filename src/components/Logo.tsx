// src/components/Logo.tsx — Official Google Antigravity Vector Brand Logo
import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const Logo: React.FC<{
  size?: number;
  delay?: number;
  showAura?: boolean;
}> = ({ size = 180, delay = 0, showAura = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Apple-style smooth deceleration spring
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.smooth,
  });

  const levitationY = Math.sin(frame / 28) * 5;
  const levitationScale = 1 + Math.sin(frame / 36) * 0.015;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${levitationY}px) scale(${entrance * levitationScale})`,
      }}
    >
      {/* Clean subtle directional underglow - strictly neutral/blue, zero purple */}
      {showAura && (
        <div
          style={{
            position: "absolute",
            width: size * 0.9,
            height: size * 0.9,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(49, 134, 255, 0.16) 0%, rgba(49, 134, 255, 0.04) 60%, transparent 80%)",
            filter: "blur(28px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Official Google Antigravity Brand Icon from antigravity.google */}
      <Img
        src={staticFile("antigravity-official.svg")}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.8))",
        }}
      />
    </div>
  );
};
