# MRC Portfolio - Mauricio Ramirez

Portfolio personal construido con **Next.js 15**, **React 19**, **Three.js (React Three Fiber)** y **GSAP** para animaciones avanzadas.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15.5.22 (App Router)
- **React**: 19.0.0
- **3D Graphics**: Three.js 0.172.0 + React Three Fiber 9.0.0-alpha.8
- **Animations**: GSAP 3.13.0 + Framer Motion 12.1.0
- **Styling**: Tailwind CSS 4.1.4 + Styled Components 6.1.18 + Emotion
- **UI Components**: Material-UI System 6.4.3
- **Carousels**: Embla Carousel 8.6.0 + Swiper 11.2.2
- **TypeScript**: 5.7.3

## 📋 Prerequisitos

- Node.js >= 18.18.0
- npm o pnpm

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd mrc-portfolio
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3001`

### 4. Build para producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
mrc-portfolio/
├── src/
│   ├── app/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── SnapScrollWrapper.tsx  # Sistema de scroll personalizado
│   │   │   ├── CubeWorld.jsx         # Escena 3D principal
│   │   │   ├── Cubes.jsx             # Cubos animados del skyline
│   │   │   ├── CubeField.jsx         # Campo de partículas 3D
│   │   │   ├── glitchText.tsx        # Efecto de texto glitch
│   │   │   ├── cardBase.jsx          # Tarjeta base reutilizable
│   │   │   └── TechCard.tsx          # Tarjeta de tecnología
│   │   ├── manifest/           # Sección Manifesto
│   │   │   ├── ManifestSection.tsx
│   │   │   ├── ManifestText.tsx
│   │   │   └── useInView.tsx
│   │   ├── technologies/       # Sección Mi Conocimiento
│   │   │   ├── Technologies.tsx
│   │   │   ├── TechCarousel.tsx
│   │   │   ├── TechCard.tsx
│   │   │   └── Embla*.tsx (controles del carousel)
│   │   ├── experience/         # Sección Mi Experiencia
│   │   │   └── WorkExperience.tsx
│   │   ├── proyects/           # Sección Mis Proyectos
│   │   │   ├── ProyectSection.tsx
│   │   │   └── ProyectCards.tsx
│   │   ├── works/              # (Legacy - revisar si es necesario)
│   │   │   ├── WorkSection.tsx
│   │   │   └── WorkCard.tsx
│   │   ├── styles/             # Estilos globales y CSS modules
│   │   │   ├── Variables.css
│   │   │   ├── HomeStyles.css
│   │   │   └── cubeField.css
│   │   ├── utils/              # Utilidades
│   │   │   └── getClass.ts
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página principal
│   ├── assets/                 # SVGs y recursos estáticos
│   └── hooks/                  # Custom hooks
│       └── useGlitch.ts
├── public/
│   └── img/                    # Imágenes del proyecto
├── CONTEXT.md                  # Documentación del contexto del proyecto
├── PROGRESS.md                 # Registro de progreso y decisiones
└── YOMERENGUES.pdf            # Diseño de referencia en Figma
```

## 🎨 Secciones del Portfolio

### 1. **Hero** (Completo ✅)
- Nombre "Mauricio Ramirez" con efecto glitch
- Subtítulo "Software Engineer" con animación Typed.js
- Escena 3D con skyline de cubos low-poly animados
- Sistema de scroll personalizado con GSAP
- Colores: azul/celeste sobre fondo morado-negro degradado

### 2. **Manifesto** (Completo ✅)
- Texto de filosofía de desarrollo
- Foto de perfil
- Animación de entrada con Intersection Observer

### 3. **Mi Conocimiento** (Completo ✅)
- Carousel horizontal con tecnologías
- Cards con logos: Next.js, Vue.js, React, Nest.js, Nuxt, Spring, AWS, CSS
- Navegación con flechas y dots
- Autoplay opcional

### 4. **Mi Experiencia** (Completo ✅)
- Timeline vertical numerado
- Tarjetas de experiencia alternando izquierda/derecha
- Línea central conectando las tarjetas
- Animaciones de entrada suaves

### 5. **Mis Proyectos** (En Progreso 🚧)
- Cards con screenshots de dashboards
- Tags de tecnologías (Java, Nest, Next, React)
- Layout alternado imagen-texto / texto-imagen
- **Pendiente**: Implementar contenido real de proyectos

### 6. **Contáctame** (Pendiente ⏳)
- Formulario: Nombre, Email, Mensaje
- Info de contacto: LinkedIn, teléfono, email
- **Pendiente**: Implementar componente completo

### 7. **Footer / Encuéntrame** (Pendiente ⏳)
- Links: LinkedIn, Github, Mi CV
- Firma personal
- **Pendiente**: Implementar componente completo

## 🐛 Bugs Conocidos y Soluciones Aplicadas

### ✅ RESUELTOS

#### 1. **Scroll bloqueado en mobile** (Hero)
- **Problema**: El scroll se trababa en dispositivos móviles
- **Causa**: `passive: false` bloqueaba el scroll nativo durante touch events
- **Solución**: Implementado sistema híbrido que permite:
  - Scroll nativo continuo dentro del Hero
  - Snap scroll solo en los bordes (entrada/salida del Hero)
  - Manejo inteligente de touch events con throttling

#### 2. **No hay scroll reverso** (Hero)
- **Problema**: Solo funcionaba scroll hacia abajo, no hacia arriba
- **Causa**: Lógica de scroll unidireccional
- **Solución**: Implementada lógica bidireccional:
  - Detecta dirección del scroll (wheel deltaY y touch deltaY)
  - Permite scroll hacia arriba desde después del Hero
  - Permite scroll hacia abajo desde antes del Hero

#### 3. **Cubos no caen al hacer scroll**
- **Problema**: Los cubos del skyline no se animan durante el scroll
- **Causa**: No había integración entre el scroll y las animaciones 3D
- **Solución**: Sistema de animación basado en scroll:
  - useFrame en Cubes.jsx lee el scroll actual
  - Calcula progreso normalizado (0-1) dentro del Hero
  - Anima posición Y y opacidad de los cubos
  - Los cubos caen y desaparecen gradualmente

### 🚧 PENDIENTES

#### 4. **Performance en mobile**
- **Síntoma**: Posibles frames drops en dispositivos de gama baja
- **Estrategia sugerida**:
  - Reducir cantidad de cubos en mobile (usar window.innerWidth)
  - Simplificar geometrías 3D
  - Implementar nivel de detalle (LOD)
  - Considerar deshabilitar animaciones complejas en mobile

#### 5. **Compatibilidad cross-browser**
- **Pendiente**: Testear en Safari, Firefox, Edge
- **Áreas críticas**: WebGL, GSAP ScrollToPlugin, passive events

## 🎯 Features del Sistema de Scroll

### Comportamiento Actual (SnapScrollWrapper.tsx)

1. **Scroll Normal**: Fuera del Hero, scroll tradicional
2. **Scroll Continuo en Hero**: Dentro del Hero, scroll nativo sin interrupciones
3. **Snap Scroll en Bordes**:
   - **Entrada al Hero**: Snap desde arriba
   - **Salida del Hero**: Snap hacia abajo
4. **Touch Friendly**: 
   - Manejo específico de touch events
   - No bloquea scroll nativo dentro del Hero
   - Throttling para prevenir múltiples activaciones

### Parámetros GSAP

```javascript
gsap.to(container, {
  scrollTo: { y: target, autoKill: false },
  duration: 4,           // Duración del snap (ajustable)
  ease: 'power2.inOut',  // Easing suave
})
```

## 🔧 Configuración Importante

### Variables CSS (src/app/styles/Variables.css)

```css
:root {
  --primary-purple: #1a0b2e;
  --secondary-purple: #2d1b4e;
  --accent-cyan: #00d9ff;
  --accent-blue: #4d9fff;
  --text-white: #ffffff;
  --text-gray: #a0a0a0;
}
```

### Puerto de Desarrollo

El proyecto corre en el puerto **3001** por defecto (configurado en `package.json`):

```json
"scripts": {
  "dev": "next dev -p 3001"
}
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Modo desarrollo (puerto 3001)
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Linter (tiene un warning menor que no afecta)
```

## 🎓 Notas Técnicas

### React Three Fiber (R3F)

- **Canvas**: Componente principal que renderiza la escena 3D
- **useFrame**: Hook para animaciones por frame
- **PerspectiveCamera**: Cámara configurada para vista isométrica
- **BoxGeometry**: Geometría simple para los cubos del skyline

### GSAP + ScrollToPlugin

- **ScrollToPlugin**: Plugin para scroll animado
- **gsap.registerPlugin**: Necesario registrar antes de usar
- **scrollTo**: Target puede ser número, elemento o selector CSS

### Next.js 15 App Router

- **Server Components**: Por defecto (sin 'use client')
- **Client Components**: Marcar con 'use client' cuando se usan hooks
- **layout.tsx**: Layout persistente entre páginas
- **page.tsx**: Contenido específico de cada ruta

## 🚀 Próximos Pasos

### Prioridad Alta
1. ✅ ~~Arreglar scroll bugs en Hero~~
2. ✅ ~~Implementar animación de caída de cubos~~
3. 🚧 Completar sección "Mis Proyectos" con contenido real
4. ⏳ Implementar sección "Contáctame" (formulario funcional)
5. ⏳ Implementar Footer con links sociales

### Prioridad Media
6. Optimizar performance en mobile
7. Añadir más animaciones de entrada/salida entre secciones
8. Implementar modo oscuro/claro (opcional)
9. Añadir más interactividad en la escena 3D

### Prioridad Baja
10. SEO optimization (meta tags, Open Graph)
11. Analytics integration
12. Testing (unit + e2e)
13. Accesibilidad (ARIA labels, keyboard navigation)

## 📚 Documentación Adicional

- **CONTEXT.md**: Contexto completo del proyecto, arquitectura y decisiones técnicas
- **PROGRESS.md**: Historial de cambios y decisiones de diseño
- **YOMERENGUES.pdf**: Diseño original de Figma (referencia visual)

## 🤝 Contribuir

Este es un proyecto personal. Para sugerencias o mejoras:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Proyecto personal de Mauricio Ramirez.

---

**Desarrollado con ❤️ por Mauricio Ramirez**

*Última actualización: Diciembre 2024*