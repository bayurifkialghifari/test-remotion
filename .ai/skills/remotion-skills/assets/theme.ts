// src/theme.ts — Apple Human Interface Guidelines (Motion & Color)
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#000000",                             // Apple Pro Display True Black
    bgAlt: "#0A0A0C",                          // System background secondary
    bgCard: "rgba(28, 28, 30, 0.72)",          // Apple Vibrancy material surface
    bgCardElevated: "rgba(44, 44, 46, 0.82)",  // Elevated sheet surface
    border: "rgba(255, 255, 255, 0.12)",       // Subtle 0.5-1px glass border
    borderBright: "rgba(255, 255, 255, 0.24)", // Focused specular highlight
    primary: "#0A84FF",                        // Apple System Blue
    accent: "#0A84FF",                         // System Blue accent
    deepmind: "#BF5AF2",                       // Apple System Purple
    emerald: "#30D158",                        // Apple System Green
    amber: "#FF9F0A",                          // Apple System Orange
    rose: "#FF453A",                           // Apple System Red
    text: "#FFFFFF",                           // Primary label
    textDim: "rgba(235, 235, 245, 0.68)",      // Secondary label
    textMuted: "rgba(235, 235, 245, 0.38)",    // Tertiary label
    glow: "rgba(10, 132, 255, 0.2)",           // Refined specular ambient
    glowDeepmind: "rgba(191, 90, 242, 0.18)",
  },
  fonts: {
    display: "Space Grotesk",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  // Apple HIG standard motion timing
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),       // Apple fluid deceleration
    inOut: Easing.bezier(0.42, 0, 0.58, 1),    // Natural ease-in-out
    in: Easing.bezier(0.42, 0, 1, 1),          // Clean accelerate exit
  },
  // Apple physics-based spring models
  spring: {
    smooth: { damping: 28, stiffness: 120, mass: 1.0 },   // Signature fluid Apple motion
    snappy: { damping: 22, stiffness: 180, mass: 0.8 },   // Direct tactile feedback
    bouncy: { damping: 18, stiffness: 150, mass: 0.9 },   // Controlled physical settling
  },
} as const;
