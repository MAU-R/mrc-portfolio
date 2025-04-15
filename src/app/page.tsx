'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import { ProyectSections } from './proyects/proyects';
import GlitchText from './components/glitchText';

const HomePage = () => {

  return <>
    <CubeWorld/>
    <section className='first-section'>
      <div className="main">
      <div className="header">
      <h3>
      <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#f700ff" 
        duration="20s"
        glitchOffset="0.1px"
        className="rubik-font main-feat"
      >
        Desarrollo
        Web
      </GlitchText>
      </h3>
        <div className="header-links rubik-font">
        <h4 className="header-link">
          <a href="">     
          <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#ff0000" 
        duration="10s"
        glitchOffset="2px"
        className="rubik-font"
      >
        Proyectos
      </GlitchText></a></h4>
        <h4 className="header-link last"><a href="">
        <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#ff0000" 
        duration="10s"
        glitchOffset="2px"
        className="rubik-font"
      >
        Conocimientos
      </GlitchText></a></h4>
        <h4 className="header-link "><a href="">
        <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#ff0000" 
        duration="10s"
        glitchOffset="2px"
        className="rubik-font"
      >
        Contacto
      </GlitchText>
      </a></h4>
        </div>
      </div>
      <h1>
      <GlitchText 
        colorPrimary="#4da8da" 
        colorSecondary="#f700ff" 
        duration="20s"
        glitchOffset="0.5px"
        className="rubik-font main-feat"
      >
        Mauricio Ramirez Castro
      </GlitchText>
      </h1>
      </div>
      <ManifestSection/>
    </section>
    <section className='canvas-spacing'></section>
    <section className='canvas-fade'></section>
    <TechCarousel/> 
    
  </> 
};

export default HomePage