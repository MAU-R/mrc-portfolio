"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItem {
  title: string
  content: string
}

interface ScrollControlledAccordionProps {
  items: AccordionItem[]
}

export function ScrollControlledAccordion({ items }: ScrollControlledAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isScrollingRef = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrollingRef.current) return

      const currentItemRef = itemRefs.current[activeIndex]
      if (!currentItemRef) return

      const itemHeight = currentItemRef.offsetHeight
      const scrollPosition = window.scrollY - currentItemRef.offsetTop

      // Calculate progress through current item (0 to 1)
      const progress = Math.max(0, Math.min(1, scrollPosition / (itemHeight - window.innerHeight)))
      setScrollProgress(progress)

      // If we've scrolled to the bottom of the current item, move to the next
      if (progress >= 0.95 && activeIndex < items.length - 1) {
        isScrollingRef.current = true
        setActiveIndex(activeIndex + 1)

        // Scroll to the next item
        const nextItem = itemRefs.current[activeIndex + 1]
        if (nextItem) {
          window.scrollTo({
            top: nextItem.offsetTop,
            behavior: "smooth",
          })
        }

        // Reset scrolling flag after animation completes
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }

      // If we've scrolled to the top of the current item, move to the previous
      if (progress <= 0.05 && activeIndex > 0 && scrollPosition < 0) {
        isScrollingRef.current = true
        setActiveIndex(activeIndex - 1)

        // Scroll to the previous item
        const prevItem = itemRefs.current[activeIndex - 1]
        if (prevItem) {
          window.scrollTo({
            top: prevItem.offsetTop,
            behavior: "smooth",
          })
        }

        // Reset scrolling flag after animation completes
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        scrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [activeIndex, items.length])

  // Scroll to active item when it changes
  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex]
    if (activeItem && !isScrollingRef.current) {
      window.scrollTo({
        top: activeItem.offsetTop,
        behavior: "smooth",
      })
    }
  }, [activeIndex])

  return (
    <div ref={containerRef} className="relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-500 transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Accordion items */}
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {(itemRefs.current[index] = el)}}
          className={`min-h-screen flex flex-col justify-center p-8 transition-opacity duration-500 ${
            index === activeIndex ? "opacity-100" : "opacity-50"
          }`}
        >
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-6">{item.title}</h2>
            <div className="prose max-w-none">
              <p className="text-lg">{item.content}</p>
            </div>
          </div>

          {/* Scroll indicator for all except last item */}
          {index < items.length - 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
              <p className="text-sm text-gray-500 mb-2">Scroll to continue</p>
              <ChevronDown className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
