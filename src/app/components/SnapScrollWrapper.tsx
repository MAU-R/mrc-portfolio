'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export default function SnapScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  let isThrottled = false;

  useEffect(() => {
    const container = containerRef.current;
    const group = groupRef.current;
    if (!container || !group) return;

    let touchStartY = 0;

    const scrollTo = (target: number) => {
      isThrottled = true;

      gsap.to(container, {
        scrollTo: { y: target, autoKill: false },
        duration: 4,
        ease: 'power2.inOut',
        onComplete: () => {
          isThrottled = false;
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (isThrottled) return;

      const currentScroll = container.scrollTop;
      const groupTop = group.offsetTop;
      const groupBottom = groupTop + group.offsetHeight;

      // Scroll hacia abajo
      if (e.deltaY > 0 && currentScroll < groupTop + 100) {
        e.preventDefault();
        scrollTo(groupBottom);
      }

      // Scroll hacia arriba
        if (e.deltaY < 0 && currentScroll >= groupBottom - container.clientHeight) {
        e.preventDefault();
        scrollTo(groupTop);
        }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isThrottled) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      const currentScroll = container.scrollTop;
      const groupTop = group.offsetTop;
      const groupBottom = groupTop + group.offsetHeight;

      // Swipe hacia arriba (scroll hacia abajo)
      if (deltaY > 20 && currentScroll < groupTop + 100) {
        scrollTo(groupBottom);
      }

      // Swipe hacia abajo (scroll hacia arriba)
        if (deltaY < -20 && currentScroll >= groupBottom - container.clientHeight) {
        scrollTo(groupTop);
        }

    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-y-scroll scroll-container overflow-x-hidden" id="snap-scroll-container">
      <div ref={groupRef}>
        {children}
      </div>
    </div>
  );
}
