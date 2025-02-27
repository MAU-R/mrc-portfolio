"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import techCarousel from "./techCarousel.module.css";
import TechCard from "./TechCard";
import { img } from "framer-motion/client";

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
    image: "/img/spring-3.png",
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
    image: "/img/nuxtjs-icon.png",
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

export default function TechCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={carouselRef}
      className={`${techCarousel.carousel_container} ${isVisible ? techCarousel.show : techCarousel.hidden}`}
    >
     <h3 className={`${techCarousel.tech_title} ${isVisible ? techCarousel.show : techCarousel.hidden}`}>Tecnologias que manejo</h3>
      <Swiper
        className={techCarousel.carousel}
        modules={[EffectCoverflow, Navigation, Pagination, Parallax]}
        effect="coverflow"
        grabCursor
        freeMode
        loop
        parallax
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index} className={techCarousel.slide}>
            <TechCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
