'use client'

import { title } from 'process';
import GlitchText from '../components/glitchText';
import WorkCard from './WorkCard';

export default function WorkSection() {
  const cardsInfo=[
    {
      title: 'Desarrollo Wordpress',
      description: 'Desarrolle plantillas personalizadas de wordpress usando css / php  / html para implementar plantillas y customizarlas ajustandolas a las necesidades de clientes desde eccomerce hasta paginas de servicios medicos',
      duration: '1 año',
      timeStamp: '1 Feb 2025 - 1 Feb 2025'
    },
    {
      title: 'Desarrollo Wordpress',
      description: 'Desarrolle plantillas personalizadas de wordpress usando css / php  / html para implementar plantillas y customizarlas ajustandolas a las necesidades de clientes desde eccomerce hasta paginas de servicios medicos',
      duration: '1 año',
      timeStamp: '1 Feb 2025 - 1 Feb 2025'
    },
    {
      title: 'Desarrollo Wordpress',
      description: 'Desarrolle plantillas personalizadas de wordpress usando css / php  / html para implementar plantillas y customizarlas ajustandolas a las necesidades de clientes desde eccomerce hasta paginas de servicios medicos',
      duration: '1 año',
      timeStamp: '1 Feb 2025 - 1 Feb 2025'
    }
  ]
  
  return(
    <section className='flex flex-col h-max py-12 justify-between maw-w-[100vw]'>
        <GlitchText 
    colorPrimary="#cc2d50" 
    colorSecondary="#4da8da" 
    duration="1.8s"
    glitchOffset="2.5px"
    className="rubik-font text-[5.5vh] glitch-text-main spacing-b text-(--primary-light)! mr-8 lg:mr-20 w-[90vw] md:w-[24vw] lg:md-w-[20vw] xl:w-[18vw] self-end text-right"
  >
    MI EXPERIENCIA
    </GlitchText>

    <h3 className='text-2xl xl:text-4xl 2xl:text-5xl text-(--accent-light) w-full text-center mb-5 md:mb-8'>Carrera</h3>
    <p className='text-3xl xl:text-5xl 2xl:text-6xl text-(--accent-light) w-full text-center mb-18 md:mb-24'>Experiencia laboral a lo largo de mi trayectoria</p>
      <article className="relative h-[80vh] flex flex-col items-center mt-[5vh]">

        {/* Línea central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-(--neon-dark)/70 -translate-x-1/2"></div>
           <div
            className={`absolute inset-0 rounded-xl blur-[6000px] xl:w-54/100 md:w-93/100 w-full h-9/10 opacity-38 -z-0 flex items-center justify-center`} 
            style={{ backgroundColor: '#ef5caf' }}
          />
        <div className="grid grid-cols-2 grid-rows-3 gap-y-20 md:gap-y-26 xl:gap-y-36 w-full max-w-[95vw] md:max-w[90vw] xl:maw-w-[70vw]">
          {cardsInfo.map((card,index) =>
            <WorkCard align={index} {...card} key={index} />
          )}
        </div>  
      </article>
    </section>
    
  )

}

