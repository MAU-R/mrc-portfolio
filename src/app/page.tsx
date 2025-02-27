'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import Typed from 'typed.js';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import { ProjectSections } from './projects/projects';
const HomePage = () => {
  const span = useRef(null);

  React.useEffect(() => {
    const typed = new Typed(span.current, {
      strings: ['Developer','Designer', 'Programmer'],
      typeSpeed: 150,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <>
    <CubeWorld/>
    <section className='first-section'>
      <div className="main">
      <h1 className='main-title'>Mauricio Ramirez Castro</h1>
      <h3 className='main-subtitle'>Web <span ref={span} className='main-subtitle-span'></span></h3>
      </div>
    </section>
    <section className='canvas-spacing'></section>
    <TechCarousel/>
    <ManifestSection/>
    <ProjectSections/>
    <ManifestSection/>
  </> 
};

export default HomePage