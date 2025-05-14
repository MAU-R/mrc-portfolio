import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registra los plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ScrollAccordion = () => {
  // Referencias
  const pinnedSection = useRef(null);
  const container = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);

  useGSAP(() => {
    // Configuración inicial del pinned section
    const steps = [step1.current, step2.current, step3.current];
    const totalSteps = steps.length;

    // 1. Pin de la sección completa
    ScrollTrigger.create({
      trigger: pinnedSection.current,
      start: "top top",
      end: () => `+=${container.current.offsetHeight}`, // Altura dinámica
      pin: true,
      pinSpacing: false,
      scrub: 1,
      markers: true // Quitar en producción
    });

    // 2. Animaciones para cada paso
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: {
            trigger: container.current,
            start: () => `top top+=${index * 100}%`,
            end: () => `top top+=${(index + 1) * 100}%`,
            toggleActions: "play none none reverse",
            markers: true
          }
        }
      );
    });

    // Cleanup
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, { scope: container });

  return (
    <section className="h-screen w-full overflow-hidden" ref={pinnedSection}>
      <div 
        className="relative h-[300vh] w-full" 
        ref={container}
        style={{ backgroundColor: '#1a1a1a' }}
      >
        {/* Paso 1 */}
        <div 
          ref={step1}
          className="absolute h-screen w-full flex items-center justify-center text-white text-4xl"
        >
          <h2>Primer paso</h2>
        </div>

        {/* Paso 2 */}
        <div 
          ref={step2}
          className="absolute h-screen w-full flex items-center justify-center text-white text-4xl"
          style={{ opacity: 0 }}
        >
          <h2>Segundo paso</h2>
        </div>

        {/* Paso 3 */}
        <div 
          ref={step3}
          className="absolute h-screen w-full flex items-center justify-center text-white text-4xl"
          style={{ opacity: 0 }}
        >
          <h2>Tercer paso</h2>
        </div>
      </div>
    </section>
  );
};

