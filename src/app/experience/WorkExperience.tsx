'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const races = ['Monaco', 'Austria', 'Hungary', 'Netherlands', 'Japan'];

export default function WorkExperience() {
  const racesRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const racesEl = racesRef.current;
    const wrapperEl = wrapperRef.current;
    if (!racesEl || !wrapperEl) return;

    const getScrollAmount = () => -(racesEl.scrollWidth - window.innerWidth);

    const tween = gsap.to(racesEl, {
      x: getScrollAmount,
      duration: 3,
      ease: 'none',
    });

    ScrollTrigger.create({
      trigger: wrapperEl,
      start: 'top 20%',
      end: () => `+=${-getScrollAmount()}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="overflow-x-hidden text-white bg-[#15151e] font-[Staatliches]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
      `}</style>

      {/* Espacio superior */}
      <div className="h-[50vh] bg-[#313143]"></div>

      {/* Scroll horizontal */}
      <div className="relative" ref={wrapperRef}>
        <div className="flex w-fit pointer-events-none" ref={racesRef}>
          {races.map((race, i) => (
            <h2
              key={i}
              className={`text-[30vw] whitespace-nowrap px-[0.3em] ${
                i === races.length - 1 ? 'bg-[#e1e1ff] text-black' : 'text-[#e10600]'
              }`}
            >
              {race}
            </h2>
          ))}
        </div>
      </div>

      {/* Espacio inferior */}
      <div className="h-[100vh] bg-[#313143]"></div>
    </div>
  );
}
