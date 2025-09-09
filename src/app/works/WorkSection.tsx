'use client'

import GlitchText from '../components/glitchText';

export default function WorkSection() {

  return(
    <section className='flex flex-col h-[80vh] py-12 justify-between maw-w-[100vw]'>
        <GlitchText 
    colorPrimary="#cc2d50" 
    colorSecondary="#4da8da" 
    duration="10s"
    glitchOffset="0.8px"
    className="rubik-font text-[4.5vh] glitch-text-main spacing-b text-(--primary-light)! mr-8 lg:mr-20 w-[90vw] md:w-[24vw] lg:md-w-[20vw] xl:w-[18vw] self-end text-right"
  >
    MI EXPERIENCIA
    </GlitchText>

    <h3 className='text-2xl md:text-5xl text-(--accent-light) w-full text-center mb-5 md:mb-8'>Tecnologias</h3>
    <p className='text-3xl md:text-6xl text-(--accent-light) w-full text-center mb-18 md:mb-24'>Con que puedo desarrollar el siguiente proyecto</p>
    </section>

  )

}

