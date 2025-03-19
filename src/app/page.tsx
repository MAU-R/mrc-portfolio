'use client'

import React, { useRef } from 'react';
import CubeWorld from './components/CubeWorld';
import TechCarousel from './technologies/Technologies';
import  ManifestSection  from './manifest/ManifestSection';
import { ProjectSections } from './projects/projects';
const HomePage = () => {

  return <>
    <CubeWorld/>
    <section className='first-section'>
      <div className="main">
      <div className="header">
      <h3 className='main-feat rubik-font'>Desarrollo <br />Web</h3>
        <div className="header-links rubik-font">
        <h4 className="header-link"><a href="">Proyectos</a></h4>
        <h4 className="header-link last"><a href="">Conocimientos</a></h4>
        <h4 className="header-link "><a href="">Contacto</a></h4>
        </div>
      </div>
      <h1 className='main-title rubik-font'>Mauricio Ramirez Castro</h1>
      </div>
      <ManifestSection/>
    </section>
    <section className='canvas-spacing'></section>
    <section className='canvas-fade'></section>
    <TechCarousel/>
    <ProjectSections/>
  </> 
};

export default HomePage