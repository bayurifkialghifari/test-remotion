// src/components/Icons.tsx — Crisp vector SVG glyphs matching theme colors
import React from "react";
import { theme } from "../theme";

export const IconBolt: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = theme.colors.accent,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={color} fillOpacity="0.2" />
  </svg>
);

export const IconSwarm: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = theme.colors.primary,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3" fill={color} fillOpacity="0.2" />
    <circle cx="18" cy="6" r="3" fill={color} fillOpacity="0.2" />
    <circle cx="12" cy="18" r="3" fill={color} fillOpacity="0.2" />
    <line x1="8.5" y1="7.5" x2="15.5" y2="7.5" />
    <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
    <line x1="16.5" y1="8.5" x2="13.5" y2="15.5" />
  </svg>
);

export const IconMcp: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = theme.colors.accent,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" fill={color} fillOpacity="0.15" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

export const IconFileCode: React.FC<{ size?: number; color?: string }> = ({
  size = 16,
  color = theme.colors.textDim,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <polyline points="10 13 8 15 10 17" />
    <polyline points="14 13 16 15 14 17" />
  </svg>
);
