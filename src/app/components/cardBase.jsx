

const cubes = Array.from({ length: 15 });
import { motion } from "framer-motion";
export const CardBase = () => {
    return <div className={manifest.baseContainer}>
    {cubes.map((_, i) => {
      const randomSize = Math.random() * 10 - 10; // Tamaño entre 10px y 20px
      const randomDelay = Math.random() * 2; // Delay aleatorio
      const randomSpeed = Math.random() * 1.5 + 0.5; // Velocidad diferente
      const randomDepth = Math.random() * 0.5 + 0.5; // Simulación de profundidad

      return (
        <motion.div
          key={i}
          className={manifest.cube}
          style={{
            width: 'calc(100%/15)',
            height: 'auto',
            opacity: randomDepth, // Simula estar más adelante o atrás
            zIndex: Math.round(randomDepth * 10), // Organiza capas
            translateX: randomSize
          }}
          animate={{
            y: [0, Math.random() * -10, 0], // Pequeña rotación
            opacity: [randomDepth, randomDepth + 0.3, randomDepth], // Variación de brillo
          }}
          transition={{
            duration: randomSpeed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: randomDelay,
          }}
        />
      );
    })}
  </div>
}