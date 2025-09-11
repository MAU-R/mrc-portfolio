'use client'

import GlitchText from '../components/glitchText';

export default function WorkSection() {

  return(
    <section className='flex flex-col h-max py-12 justify-between maw-w-[100vw]'>
        <GlitchText 
    colorPrimary="#cc2d50" 
    colorSecondary="#4da8da" 
    duration="10s"
    glitchOffset="0.8px"
    className="rubik-font text-[4.5vh] glitch-text-main spacing-b text-(--primary-light)! mr-8 lg:mr-20 w-[90vw] md:w-[24vw] lg:md-w-[20vw] xl:w-[18vw] self-end text-right"
  >
    MI EXPERIENCIA
    </GlitchText>

    <h3 className='text-2xl xl:text-4xl 2xl:text-5xl text-(--accent-light) w-full text-center mb-5 md:mb-8'>Carrera</h3>
    <p className='text-3xl xl:text-5xl 2xl:text-6xl text-(--accent-light) w-full text-center mb-18 md:mb-24'>Experiencia laboral a lo largo de mi trayectoria</p>
      <article className="relative h-[80vh] flex flex-col items-center mt-[5vh]">

        {/* Línea central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-(--neon-dark)/70 -translate-x-1/2"></div>

        <div className="grid grid-cols-2 gap-y-24 md:gap-y-36 xl:gap-y-46 w-full max-w-[95vw] md:max-w[90vw] xl:maw-w-[70vw]">
          {/* Card 1 (derecha) */}
        <div className="relative col-start-2 flex justify-start">
          {/* Glow detrás del card */}


          {/* Card principal */}
          <div className="relative bg-(--neon-darker)/70 border border-(--neon-normal-active) rounded-xl p-6 w-full lg:w-8/10 xl:w-1/2">
           <div
            className="absolute inset-0 rounded-4xl blur-[50px] w-full h-full opacity-70 -z-0 flex items-center justify-center "
            style={{ backgroundColor: 'var(--neon-dark)' }}
          />
            {/* Círculo con número */}
              <span className="
                absolute -left-[5vh] -top-[4vh] 
                bg-(--neon-dark-active)/95
                border border-(--neon-normal-active) 
                text-white text-2xl lg:text-3xl font-bold rounded-full 
                w-[9vh] h-[9vh] lg:w-[7vh] lg:h-[7vh] 2xl:w-[6vh] 2xl:h-[6vh]   flex items-center justify-center 
                shadow-[0_0_5px_var(--neon-dark-active),0_0_10px_var(--neon-normal-active)]
              ">
                1
              </span>

            {/* Contenido */}
            <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold text-white z-5">Next JS</h3>
            <p className="mt-4 text-white  text-lg md:text-xl">
              Tengo experiencia de más de un año desarrollando con Next.js de manera completamente profesional bajo una empresa más grande.
            </p>
          </div>
        </div>


          {/* Card 2 (izquierda) */}
          <div className="relative col-start-1 flex justify-end">
            <div className="bg-pink-900 bg-opacity-30 backdrop-blur-xl border border-pink-500 rounded-2xl shadow-lg p-6 w-80 relative">
              <span className="absolute -right-8 -top-4 bg-pink-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                2
              </span>
              <h3 className="text-xl font-semibold text-white">Nest JS</h3>
              <p className="mt-2 text-gray-200 text-sm leading-relaxed">
                Experiencia creando APIs y manejando proyectos empresariales de manera eficiente.
              </p>
            </div>
          </div>

          {/* Card 3 (derecha) */}
          <div className="relative col-start-2 flex justify-start">
            <div className="bg-pink-900 bg-opacity-30 backdrop-blur-xl border border-pink-500 rounded-2xl shadow-lg p-6 w-80 relative">
              <span className="absolute -left-8 -top-4 bg-pink-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                3
              </span>
              <h3 className="text-xl font-semibold text-white">Vue / Nuxt</h3>
              <p className="mt-2 text-gray-200 text-sm leading-relaxed">
                Desarrollo de interfaces modernas, rápidas y responsivas utilizando Nuxt 3, Pinia y Tailwind.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
    
  )

}

