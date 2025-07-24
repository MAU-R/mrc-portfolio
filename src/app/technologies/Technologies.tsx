'use client'

import useEmblaCarousel from 'embla-carousel-react'
import TechCard from './TechCard'

export default function TechCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true })

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

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-6">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] md:flex-[0_0_33.3333%]">
            <TechCard
              title={slide.title}
              subtitle={slide.subtitle}
              description={slide.description}
              link={slide.link}
              image={slide.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
