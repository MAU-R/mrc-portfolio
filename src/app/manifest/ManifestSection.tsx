"use client";

import manifest from './manifest.module.css'
import { useState, useEffect, useRef } from "react";

export default function ManifestSection () {
    const manifestRef = useRef<HTMLDivElement | null>(null);
    const fullText = 'Creo que una gran experiencia web va más allá de la funcionalidad: es la suma de creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para explorar nuevas tecnologías y crear una experiencia única. Mi enfoque combina la innovación creativa con metodologías probadas y las mejores prácticas de desarrollo. Adopto nuevas tecnologías y herramientas modernas, pero siempre con bases sólidas, priorizando la eficiencia, el rendimiento y la accesibilidad.Para mí, programar es más que escribir código: es diseñar experiencias memorables que inspiren, resuelvan problemas y se mantengan relevantes en el tiempo.'
    const halfText = 'Creo que una gran experiencia web va más allá de la funcionalidad: es la suma de creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para explorar nuevas tecnologías y crear una experiencia única. Mi enfoque combina la innovación creativa y las mejores practicas de desarrollo.'
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 700);
      };
  
      handleResize(); // Ejecuta una vez al montar
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return( 
    <section ref={manifestRef} className = {manifest.manifest}>
            <div className={`${manifest.content}` }>
                <div className={manifest.statements}>
                    <h2 className={manifest.title}>Manifesto</h2>
                    <h4 className={manifest.subtitle}>Mi filosofía detras del codigo</h4>
                    <p className={manifest.text}>{isMobile ? halfText : fullText}</p>
                </div>
            </div>
            <div className={manifest.image}>
              <img  className={manifest.img} src="https://img.freepik.com/free-photo/part-black-white-portrait-male-suit-dark-grey-background_613910-14160.jpg" alt="" />  
            </div>    
    </section>);
}