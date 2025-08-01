import { useEffect, useState } from 'react'

const useResponsiveManifest = () => {
  const fullText = `Creo que una gran experiencia web va más allá de la funcionalidad: es la suma de creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para explorar nuevas tecnologías y crear una experiencia única. Mi enfoque combina la innovación creativa con metodologías probadas y las mejores prácticas de desarrollo. Adopto nuevas tecnologías y herramientas modernas, pero siempre con bases sólidas, priorizando la eficiencia, el rendimiento y la accesibilidad. Para mí, programar es más que escribir código: es diseñar experiencias memorables que inspiren, resuelvan problemas y se mantengan relevantes en el tiempo.`;

  const mobileText = `Una gran experiencia web no solo es funcional: es creatividad, diseño y solidez técnica. Cada proyecto es una oportunidad para innovar con nuevas tecnologías. Combino eficiencia, rendimiento y accesibilidad con buenas prácticas, creando experiencias memorables que inspiran y perduran.`;

  const [text, setText] = useState(fullText);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setText(mobileText);
      } else {
        setText(fullText);
      }
    };

    handleResize(); // run once on mount

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return text;
};
export default useResponsiveManifest;