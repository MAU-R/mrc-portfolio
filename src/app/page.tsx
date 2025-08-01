'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import GlitchText from './components/glitchText';
import WorkExperience from './experience/WorkExperience';
import SnapScrollWrapper from './components/SnapScrollWrapper';
import { useEffect, useState } from 'react'

const useResponsiveManifest = () => {
  const fullText = `Creo que una gran experiencia web va más allá de la funcionalidad: es la suma de creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para explorar nuevas tecnologías y crear una experiencia única. Mi enfoque combina la innovación creativa con metodologías probadas y las mejores prácticas de desarrollo. Adopto nuevas tecnologías y herramientas modernas, pero siempre con bases sólidas, priorizando la eficiencia, el rendimiento y la accesibilidad. Para mí, programar es más que escribir código: es diseñar experiencias memorables que inspiren, resuelvan problemas y se mantengan relevantes en el tiempo.`;

  const mobileText = `Una gran experiencia web no solo es funcional: es creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para innovar con nuevas tecnologías. Combino eficiencia, rendimiento y accesibilidad con buenas prácticas, creando experiencias memorables que inspiran y perduran.`;

  const [text, setText] = useState(fullText);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setText(mobileText);
      } else {
        setText(fullText);
      }
    };

    handleResize(); // run once on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return text;
};

const HomePage = () => {
  const manifestText = useResponsiveManifest();

  return <>
    <SnapScrollWrapper>
    <div className="absolute top-0 left-0 w-full h-[350vh] z-1 pointer-events-none">
      <CubeWorld />
    </div>
    <section className='first-section relative'>
      <div className="main">
<div className="absolute inset-0 z-0 flex md:top-[2vh] gap-[10vh] md:gap-[11vh] flex-col items-center justify-start pointer-events-none">
  <GlitchText 
    colorPrimary="#ff3cac" 
    colorSecondary="#ff3864" 
    duration="2s"
    glitchOffset="3px"
    className="rubik-font main-feat glitch-text-main hidden! md:block! text-[19vw]"
  >
    Mauricio
  </GlitchText>
  <GlitchText 
    colorPrimary="#ff3cac" 
    colorSecondary="#ff3864" 
    duration="2s"
    glitchOffset="4px"
    className="rubik-font main-feat glitch-text-main hidden! md:block! text-[19vw]"
  >
    Ramirez
  </GlitchText>
    <GlitchText 
    colorPrimary="#ff3cac" 
    colorSecondary="#ff3864" 
    duration="2s"
    glitchOffset="3px"
    className="rubik-font main-feat glitch-text-main block md:hidden! text-[23vh]"
  >
    Mau
  </GlitchText>
  <GlitchText 
    colorPrimary="#ff3cac" 
    colorSecondary="#ff3864" 
    duration="2s"
    glitchOffset="4px"
    className="rubik-font main-feat glitch-text-main block md:hidden! text-[23vh]"
  >
    Ram
  </GlitchText>
</div>
   <div className="z-0 relative w-full h-[18vh] md:h-[30vh] flex items-start justify-start">
  <div className="w-[60vw] h-[100vh] rounded-xl bg-(--neon-normal)/90 blur-[2000px] opacity-45 "></div>
</div>
  <div className="z-20 text-center">
  <GlitchText 
    colorPrimary="#cc2d50" 
    colorSecondary="#4da8da" 
    duration="10s"
    glitchOffset="0.8px"
    className="rubik-font text-[7.5vh] glitch-text-main spacing-b text-(--primary-light)!"
  >
    Software engineer
  </GlitchText>
</div>
  </div>
    </section>
    <section className='canvas-spacing '></section>
    <section className=' canvas-fade'></section>
    <section className=" h-[100vh] md:h-[90vh] flex flex-wrap w-full justify-center items-center p-6 lg:p-6 ">
      <div className="w-9/10 h-4/10 md:w-45/100 md:h-max flex flex-col justify-around gap-1 md:gap-8 p-6 md:p-16">
          <h2 className='text-(--neon-light) text-6xl md:text-7xl lg:text-9xl md:mb-20'>Manifesto</h2>
          <h4 className='text-(--text-light-active)/90 font-bold text-4xl md:text-5xl lg:text-6xl'>Mi filosofia detras del codigo</h4> 
          <p className='text-(--text-light) text-xl md:text-2xl lg:text-3xl text-justify'>{manifestText}</p>
      </div>
      <div className="w-full h-1/2 md:w-40/100 md:h-full flex flex-col justify-center items-center p-6">
        <div className="relative flex items-center justify-center w-9/10 h-3/4 md:h-3/4 bg-(--neon-normal)/30 rounded-xl border-2 border-(--neon-normal) ">
      <div className="absolute w-[40vw] h-[60vh] rounded-xl opacity-100 blur-[250px] z-5"
           style={{ backgroundColor: 'var(--neon-dark)' }}
      />
        <img
          src="https://pngimg.com/d/men_in_black_PNG1.png"
          alt="Imagen Glowy"
          className="relative z-10 w-full h-full object-cover object-bottom"
        />
    </div>
      </div>
    </section>
    </SnapScrollWrapper>

    <section>
      
    </section>
    <TechCarousel />


  </> 
};

export default HomePage