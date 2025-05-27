'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import GlitchText from './components/glitchText';
import WorkExperience from './experience/WorkExperience';
import {ScrollAccordion} from './proyects/ScrollAccordion'
const HomePage = () => {
  const accordionItems = [
    {
      id: "light-penetration",
      title: "Light penetration",
      content:
        "Red light (600-700 nm) and near-infrared light (800-1000 nm) penetrate the skin, reaching deeper layers of muscle and tissue. This light stimulates the mitochondria within cells, the energy-producing organelles, directly influencing the citric acid cycle.",
    },
    {
      id: "cellular-stimulation",
      title: "Cellular stimulation",
      content:
        "When light reaches the mitochondria, it stimulates the production of adenosine triphosphate (ATP), the primary energy carrier in cells. This boost in cellular energy enhances metabolic processes, increases oxygen consumption, and promotes tissue repair and regeneration.",
    },
    {
      id: "boost-regeneration",
      title: "Boost and regeneration",
      content:
        "The increased cellular energy and improved blood circulation lead to enhanced tissue repair and regeneration. This process reduces inflammation, accelerates wound healing, and promotes the formation of new blood vessels, resulting in improved skin texture and reduced signs of aging.",
    },
    {
      id: "collagen-production",
      title: "Collagen production",
      content:
        "Red light therapy stimulates fibroblasts, the cells responsible for producing collagen. Increased collagen production strengthens the skin's structure, improves elasticity, and reduces the appearance of fine lines and wrinkles, resulting in firmer, more youthful-looking skin.",
    },
    {
      id: "anti-inflammatory",
      title: "Anti-inflammatory effects",
      content:
        "Red and near-infrared light therapy has potent anti-inflammatory effects. It reduces the production of pro-inflammatory cytokines and increases anti-inflammatory mediators, helping to alleviate conditions characterized by chronic inflammation such as arthritis, muscle soreness, and certain skin conditions.",
    },
  ]
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
        duration="8s"
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