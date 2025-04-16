"use client"

import { useEffect, useRef, useState } from "react"


interface AccordionItem {
  id: string
  title: string
  content: string
}

interface ScrollAccordionProps {
  items: AccordionItem[]
}

export function ScrollAccordion({ items }: ScrollAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null)
  const isTransitioning = useRef(false)

  // Handle wheel events to fill progress bar
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isTransitioning.current) return

      // Calculate new progress based on wheel delta
      // Normalize the wheel delta to make progress consistent across devices
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) / 100, 0.1)

      setProgress((prev) => {
        const newProgress = Math.max(0, Math.min(1, prev + delta))

        // If progress reaches 100% and we're not at the last item, move to next item
        if (newProgress >= 1 && activeIndex < items.length - 1 && !isTransitioning.current) {
          isTransitioning.current = true

          // Clear any existing timeout
          if (wheelTimeout.current) {
            clearTimeout(wheelTimeout.current)
          }

          // Set a timeout to prevent rapid transitions
          wheelTimeout.current = setTimeout(() => {
            setActiveIndex(activeIndex + 1)
            setProgress(0)
            isTransitioning.current = false
          }, 300)

          return 1
        }

        // If progress reaches 0% and we're not at the first item, move to previous item
        if (newProgress <= 0 && activeIndex > 0 && !isTransitioning.current) {
          isTransitioning.current = true

          // Clear any existing timeout
          if (wheelTimeout.current) {
            clearTimeout(wheelTimeout.current)
          }

          // Set a timeout to prevent rapid transitions
          wheelTimeout.current = setTimeout(() => {
            setActiveIndex(activeIndex - 1)
            setProgress(1)
            isTransitioning.current = false
          }, 300)

          return 0
        }

        return newProgress
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current)
      }
    }
  }, [activeIndex, items.length])

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[#f8f3ea]">
      <div className="max-w-6xl mx-auto px-6 py-12 h-full flex flex-col">
        {/* Section number */}
        <div className="text-[#a19b8c] text-sm mb-8">{String(activeIndex + 1).padStart(2, "0")}</div>

        {/* Content area */}
        <div className="flex-1 flex flex-col">
          {/* Active item */}
          <div className="flex-1 flex">
            <div className="w-1/2 pr-8">
              <h2 className="text-4xl font-medium text-black mb-6">{items[activeIndex].title}</h2>
              <p className="text-[#5c5a56] leading-relaxed">{items[activeIndex].content}</p>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              {/* Placeholder for illustration */}
              <div className="w-80 h-80 rounded-full border border-[#a19b8c] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#a19b8c]"></div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-[#e0dcd3] w-full mt-8 mb-12">
            <div
              className="h-full bg-[#a19b8c] transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Accordion items */}
          <div className="mb-8">
            {items.map((item, index) => (
              <div
              className={`py-6 border-t border-[#e0dcd3] transition-all duration-500 ${
                index === activeIndex ? "opacity-0 h-0 py-0 overflow-hidden" : "opacity-70"
              }`}
            
                onClick={() => {
                  if (index !== activeIndex) {
                    setActiveIndex(index)
                    setProgress(0)
                  }
                }}
              >
                <h3 className="text-2xl font-medium text-[#a19b8c] cursor-pointer">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
