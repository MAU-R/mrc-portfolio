// components/GlitchText.tsx
import React from "react";

interface GlitchTextProps {
  children: React.ReactNode;
  colorPrimary?: string;
  colorSecondary?: string;
  duration?: string;
  glitchOffset?: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  colorPrimary = "#ff0000",
  colorSecondary = "#00ffff",
  duration = "2s",
  glitchOffset = "2px",
  className = "",
}) => {
  return (
    <span
      className={`${className}`}
      data-text={children}
      style={{
        "--color-primary": colorPrimary,
        "--color-secondary": colorSecondary,
        "--duration": duration,
        "--glitch-offset": glitchOffset,
      } as React.CSSProperties}
    >
      {children}
    </span>
  );
};

export default GlitchText;