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
    let isTouchScrolling = false;

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
      const currentScroll = container.scrollTop;
      const groupTop = group.offsetTop;
      const groupBottom = groupTop + group.offsetHeight;

      // Dentro del Hero: permitir scroll nativo continuo
      if (currentScroll >= groupTop && currentScroll < groupBottom - container.clientHeight) {
        // Scroll nativo dentro del hero, no hacer nada especial
        return;
      }

      // En los bordes: aplicar snap scroll si no está en throttle
      if (isThrottled) return;

      // Scroll hacia abajo desde antes del Hero
      if (e.deltaY > 0 && currentScroll < groupTop + 100) {
        e.preventDefault();
        scrollTo(groupBottom);
      }

      // Scroll hacia arriba desde después del Hero
      if (e.deltaY < 0 && currentScroll >= groupBottom - container.clientHeight) {
        e.preventDefault();
        scrollTo(groupTop);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouchScrolling = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentScroll = container.scrollTop;
      const groupTop = group.offsetTop;
      const groupBottom = groupTop + group.offsetHeight;

      // Dentro del Hero: permitir scroll nativo continuo
      if (currentScroll >= groupTop && currentScroll < groupBottom - container.clientHeight) {
        isTouchScrolling = true;
        return; // Permitir scroll nativo
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isThrottled || isTouchScrolling) {
        isTouchScrolling = false;
        return;
      }
      
      const deltaY = touchStartY - e.changedTouches[0].clientY;

      const currentScroll = container.scrollTop;
      const groupTop = group.offsetTop;
      const groupBottom = groupTop + group.offsetHeight;

      // Swipe hacia arriba (scroll hacia abajo)
      if (deltaY > 50 && currentScroll < groupTop + 100) {
        e.preventDefault();
        scrollTo(groupBottom);
      }

      // Swipe hacia abajo (scroll hacia arriba)
      if (deltaY < -50 && currentScroll >= groupBottom - container.clientHeight) {
        e.preventDefault();
        scrollTo(groupTop);
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
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