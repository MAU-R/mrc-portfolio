'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import GlitchText from './components/glitchText';
import WorkExperience from './experience/WorkExperience';

const HomePage = () => {
  return <>

    <CubeWorld/>
    <section className='first-section relative'>

    
      <div className="main">
<div className="absolute inset-0 z-1 flex md:top-[2vh] gap-[10vh] md:gap-[11vh] flex-col items-center justify-start pointer-events-none">
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
  <div className="w-[60vw] h-[100vh] rounded-xl bg-(--neon-dark)/70 blur-[2000px] opacity-45 "></div>
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
    <section className='canvas-spacing'></section>
    <section className='canvas-fade'></section>
    <TechCarousel/> 
    <h2 className=''>
      <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#f700ff" 
        duration="5s"
        glitchOffset="0.2px"
        className="rubik-font main-feat"
      >
        Mis proyectos
      </GlitchText>
      <div className='max-h-[95vh] overflow-scroll'>
      </div>

    </h2>
    <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#f700ff" 
        duration="5s"
        glitchOffset="0.2px"
        className="rubik-font main-feat experience-text w-full text-end"
      >
        Mi experiencia
      </GlitchText>
      <WorkExperience/>

  </> 
};

export default HomePage