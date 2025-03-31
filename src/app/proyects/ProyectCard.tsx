"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"

type ItemProps = {
  isActive: boolean
  onComplete: () => void
}

function Item({ isActive, onComplete }: ItemProps) {
  // Create an animation control for the circle fill
  const controls = useAnimation()

  // When the item becomes active, animate the circle's pathLength from 0 to 1.
  useEffect(() => {
    if (isActive) {
      controls
        .start({
          pathLength: 1,
          transition: { duration: 3, ease: "linear" },
        })
        .then(() => {
          onComplete()
        })
    } else {
      // Reset the progress when not active.
      controls.set({ pathLength: 0 })
    }
  }, [isActive, controls, onComplete])

  // Animate the container: active items scale to 1, collapsed ones shrink.
  const containerVariants = {
    active: { scale: 1, opacity: 1 },
    inactive: { scale: 0.5, opacity: 0.5 },
  }

  return (
    <motion.section
      style={itemContainer}
      variants={containerVariants}
      animate={isActive ? "active" : "inactive"}
    >
      <div style={item}>
        <figure style={progressIconContainer}>
          <svg style={progressIcon} width="75" height="75" viewBox="0 0 100 100">
            <circle
              style={progressIconBg}
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              className="bg"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              style={progressIconIndicator}
              animate={controls}
            />
          </svg>
        </figure>
      </div>
    </motion.section>
  )
}

export default function TrackElementSequence() {
  // Create an array of items. You can adjust the length as needed.
  const items = Array.from({ length: 5 })
  const [activeIndex, setActiveIndex] = useState(0)

  const handleComplete = () => {
    // When the current circle animation completes,
    // collapse the current square and expand the next one.
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <>
      {items.map((_, index) => (
        <Item
          key={index}
          isActive={index === activeIndex}
          onComplete={handleComplete}
        />
      ))}
    </>
  )
}

/**
 * ==============   Styles   ================
 */

const itemContainer: React.CSSProperties = {
  height: "100vh",
  maxHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const progressIconContainer: React.CSSProperties = {
  width: 80,
  height: 80,
  margin: 0,
  padding: 0,
}

const processCircle: React.CSSProperties = {
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
}

const progressIcon: React.CSSProperties = {
  ...processCircle,
  transform: "rotate(-90deg)",
  stroke: "#ff0088",
}

const progressIconIndicator: React.CSSProperties = {
  ...processCircle,
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
}

const progressIconBg: React.CSSProperties = {
  opacity: 0.2,
}

const item: React.CSSProperties = {
  width: 200,
  height: 250,
  border: "2px dotted #ff0088",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
