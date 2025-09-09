'use client'

import TechCarousel from './TechCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import './embla.css'
import GlitchText from '../components/glitchText';

export default function TechSection() {

  const slides = [
    {
      title: "REACT",
      subtitle: "Framework Frontend de Javascript",
      description: "Un año de experiencia desarrollando con react",
      link: "https://react.dev/",
      image: "/img/react.png",
    },
    {
      title: "VUE",
      subtitle: "Framework Frontend de Javascript",
      description: "Trabajé un año como desarrollador JR de VUE en kepler oil & gas",
      link: "https://vuejs.org/",
      image: "/img/vue.png",
    },
    {
      title: "NEST",
      subtitle: "Framework Backend de Javascript",
      description: "Trabajé un año como desarrollador JR de VUE en Kepler Oil & Gas.",
      link: "https://nestjs.com/",
      image: "/img/Nest.js.png",
    },
    {
      title: "JAVA SPRING",
      subtitle: "Framework Backend de JAVA",
      description: "Experiencia desarrollando API REST y otro tipo de servicios backend usando SPRING.",
      link: "https://spring.io/",
      image: "/img/spring.png",
    },
    {
      title: "NEXT",
      subtitle: "Framework de React que ofrece SSR y SSG",
      description: "Tengo experiencia desarrollando varios proyectos con Next.js.",
      link: "https://nextjs.org/",
      image: "/img/next.png",
    },
    {
      title: "NUXT",
      subtitle: "Framework basado en Vue.js que optimiza el desarrollo",
      description: "He trabajado 1 año desarrollando profesionalmente con Nuxt.js.",
      link: "https://nuxt.com/",
      image: "/img/nuxt.png",
    },
    {
      title: "CSS",
      subtitle: "Lenguaje para diseñar y estilizar ",
      description: "Tengo 2 años de experiencia diseñando y estilizando webs, además de varios cursos en Udemy.",
      link: "",
      image: "/img/css.png",
    },
    {
      title: "AWS",
      subtitle: "Plataforma de computación en la nube con servicios escalables y seguros",
      description: 'Tengo experiencia trabajando con AWS y una certificación "Cloud Practitioner".',
      link: "https://aws.amazon.com/es/",
      image: "/img/aws.png",
    },
  ];
const options: EmblaOptionsType = { dragFree: true, loop: true,  align: 'center', }
  return(
    <section className='flex flex-col h-[80vh] py-12 justify-between'>
        <GlitchText 
    colorPrimary="#cc2d50" 
    colorSecondary="#4da8da" 
    duration="10s"
    glitchOffset="0.8px"
    className="rubik-font text-[4.5vh] glitch-text-main spacing-b text-(--primary-light)! ml-8 lg:ml-20 w-[90vw] md:w-[5vw]"
  >
    MI CONOCIMIENTO
    </GlitchText>

    <h3 className='text-3xl md:text-6xl text-(--accent-light) w-full text-center mb-5 md:mb-8'>Tecnologias</h3>
    <p className='text-4xl md:text-7xl text-(--accent-light) w-full text-center mb-18 md:mb-24'>Con que puedo desarrollar el siguiente proyecto</p>
    <TechCarousel slides={slides} options={options} />
    </section>

  )

}

