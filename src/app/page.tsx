'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import ManifestSection from './manifest/ManifestSection';
import { ProjectSections } from './projects/projects';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HomePage = () => {
  const firstSectionRef = useRef(null);
  const techCarouselRef = useRef(null);

  useEffect(() => {
    const firstSection = firstSectionRef.current;
    const techCarousel = techCarouselRef.current;

    // Animación al hacer scroll hacia abajo desde first-section
    ScrollTrigger.create({
      trigger: firstSection,
      start: 'bottom bottom',
      onEnter: () => {
        gsap.to(window, {
          scrollTo: { y: window.scrollY + window.innerHeight * 3.5 },
          duration: 1.5,
          ease: 'power2.inOut',
        });
      },
    });

    // Animación al hacer scroll hacia arriba desde TechCarousel
    ScrollTrigger.create({
      trigger: techCarousel,
      start: 'top top',
      onEnterBack: () => {
        gsap.to(window, {
          scrollTo: { y: window.scrollY - window.innerHeight * 3.5 },
          duration: 1.5,
          ease: 'power2.inOut',
        });
      },
    });
  }, []);

  return (
    <>
      <CubeWorld />
      <section ref={firstSectionRef} className="first-section">
        <div className="main">
          <div className="header">
            <h3 className="main-feat rubik-font">Desarrollo Web</h3>
          </div>
          <h1 className="main-title rubik-font">Mauricio Ramirez Castro</h1>
        </div>
        <div className="manifest"></div>
      </section>
      <section className="canvas-spacing"></section>
      <div className="techCarspace"ref={techCarouselRef}></div>
      <TechCarousel  />
      <ManifestSection />
      <ProjectSections />
      <ManifestSection />
    </>
  );
};

export default HomePage;
