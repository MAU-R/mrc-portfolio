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
      <h3 className='main-feat rubik-font'>Desarrollo <br />Web</h3>
        <div className="header-links rubik-font">
        <h4 className="header-link"><a href="">Proyectos</a></h4>
        <h4 className="header-link last"><a href="">Conocimientos</a></h4>
        <h4 className="header-link "><a href="">Contacto</a></h4>
        </div>
      </div>
      <GlitchText text='Mauricio Ramirez Castro' extraClass='main-title rubik-font'/>
      </div>
      <ManifestSection/>
    </section>
    <section className='canvas-spacing'></section>
    <section className='canvas-fade'></section>
    <GlitchText text="Hola Mau" extraClass='' />
    <TechCarousel/> 
    
  </> 
};

export default HomePage