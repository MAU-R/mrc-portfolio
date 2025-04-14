import type React from "react"
import styles from "./glitch-text.module.css"

export interface GlitchTextProps {
  text: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
  glitchIntensity?: "light" | "medium" | "heavy"
  glitchColor1?: string
  glitchColor2?: string
  disabled?: boolean
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "",
  tag: Tag = "span",
  glitchIntensity = "medium",
  glitchColor1 = "rgba(255,0,0,0.7)",
  glitchColor2 = "rgba(0,255,255,0.7)",
  disabled = false,
}) => {
  const intensityClass = disabled ? "" : styles[`glitch-${glitchIntensity}`]
  const combinedClassName = `${styles.glitchText} ${intensityClass} ${className}`.trim()

  // Create a style object for custom colors
  const customStyle = {
    "--glitch-color-1": glitchColor1,
    "--glitch-color-2": glitchColor2,
  } as React.CSSProperties

  return (
    <Tag className={combinedClassName} style={customStyle} data-text={text}>
      {text}
    </Tag>
  )
}
