# CONTEXT.md - Portafolio Mauricio Ramirez

## Qué es este proyecto

Portafolio personal interactivo de Mauricio Ramirez (Software Engineer), construido con tecnologías web modernas y elementos 3D. El proyecto busca crear una experiencia visual única con un sistema de scroll personalizado y animaciones 3D en la sección Hero.

## Stack Tecnológico

### Core
- **Next.js 15.5.22** - Framework React con App Router
- **React 19.0.0** - Biblioteca UI
- **TypeScript 5.7.3** - Type safety
- **Tailwind CSS 4.3.3** - Estilos utility-first

### Librerías 3D
- **Three.js 0.172.0** - Motor de gráficos 3D
- **React Three Fiber (R3F) 9.0.0-alpha.8** - React renderer para Three.js
- **three-noise 1.1.2** - Generación de ruido para efectos 3D

### Animaciones
- **GSAP 3.13.0** - Animaciones de alto rendimiento
- **@gsap/react 2.1.2** - Integración con React
- **Framer Motion 12.1.0** - Animaciones declarativas React
- **typed.js 2.1.0** - Efecto de texto escribiéndose

### UI/UX
- **@emotion/react & @emotion/styled** - CSS-in-JS
- **styled-components 6.1.18** - Componentes estilizados
- **@mui/base & @mui/system** - Componentes base MUI
- **lucide-react 0.479.0** - Iconos
- **Embla Carousel 8.6.0** - Carrusel táctil
- **Swiper 11.2.10** - Slider/carrusel alternativo
- **react-swipeable 7.0.2** - Gestos táctiles

## Arquitectura del Proyecto

```
mrc-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout principal Next.js
│   │   ├── page.tsx                # Página home con todas las secciones
│   │   ├── components/             # Componentes 3D y generales
│   │   │   ├── Cubes.jsx          # Componente individual de cubo 3D
│   │   │   ├── CubeField.jsx      # Grid de cubos (skyline)
│   │   │   ├── CubeWorld.jsx      # Canvas Three.js wrapper
│   │   │   ├── SnapScrollWrapper.tsx  # Sistema scroll custom
│   │   │   ├── glitchText.tsx     # Efecto glitch en texto
│   │   │   ├── TechCard.tsx       # Card de tecnología
│   │   │   └── cardBase.jsx       # Base para cards
│   │   ├── manifest/              # Sección Manifesto
│   │   │   ├── ManifestSection.tsx
│   │   │   ├── ManifestText.tsx
│   │   │   ├── useInView.tsx      # Hook visibilidad
│   │   │   └── manifest.module.css
│   │   ├── technologies/          # Sección Mi Conocimiento
│   │   │   ├── Technologies.tsx
│   │   │   ├── TechCarousel.tsx   # Carrusel Embla
│   │   │   ├── TechCard.tsx
│   │   │   ├── EmblaCarouselArrowButtons.tsx
│   │   │   ├── EmblaCarouselDotButton.tsx
│   │   │   └── embla.css
│   │   ├── experience/            # Sección Mi Experiencia
│   │   │   └── WorkExperience.tsx # Timeline vertical
│   │   ├── proyects/              # Sección Mis Proyectos
│   │   │   ├── ProyectSection.tsx
│   │   │   └── ProyectCards.tsx
│   │   ├── works/                 # (Alternativa/duplicado?)
│   │   │   ├── WorkSection.tsx
│   │   │   └── WorkCard.tsx
│   │   └── styles/                # Estilos globales
│   │       ├── Variables.css      # Variables CSS custom
│   │       ├── HomeStyles.css     # Estilos página principal
│   │       └── cubeField.css      # Estilos escena 3D
│   ├── assets/                    # SVGs de tecnologías
│   │   ├── aws.svg, css.svg, Nest.svg, next.svg
│   │   ├── nuxt.svg, react.svg, spring.svg, vue.svg
│   └── hooks/
│       └── useGlitch.ts           # Hook para efecto glitch
├── public/
│   └── img/                       # PNGs de tecnologías
│       ├── aws.png, css.png, Nest.js.png, next.png
│       ├── nuxt.png, react.png, spring.png, vue.png
└── YOMERENGUES.pdf               # Diseño Figma de referencia
```

## Sistema de Scroll Personalizado

### Funcionamiento (`SnapScrollWrapper.tsx`)

El scroll custom solo se aplica en la **sección Hero** (primera sección con cubos 3D):

1. **Wrapper con referencias**
   - `containerRef`: div contenedor con `overflow-y-scroll`
   - `groupRef`: div que agrupa el contenido (children)

2. **Mecanismo de scroll**
   - Intercepta eventos `wheel` (mouse) y `touchstart/touchend` (táctil)
   - Usa GSAP ScrollToPlugin para animaciones suaves
   - Throttling con flag `isThrottled` para evitar múltiples triggers

3. **Lógica de transición**
   ```javascript
   // Detecta si está en la parte superior (Hero)
   if (currentScroll < groupTop + 100) {
     // Scroll hacia abajo -> salta al final del grupo
     scrollTo(groupBottom);
   }
   
   // Detecta si está en la parte inferior
   if (currentScroll >= groupBottom - container.clientHeight) {
     // Scroll hacia arriba -> vuelve al inicio
     scrollTo(groupTop);
   }
   ```

4. **Animación GSAP**
   - Duración: 4 segundos
   - Easing: `power2.inOut`
   - Previene scroll nativo con `e.preventDefault()`

### Por qué solo funciona hacia abajo

**Bug identificado**: La condición de scroll hacia arriba solo verifica si estás en el **final** del grupo:

```javascript
if (e.deltaY < 0 && currentScroll >= groupBottom - container.clientHeight) {
  // Solo activa si YA llegaste al final
  scrollTo(groupTop);
}
```

**Consecuencia**: No hay mecanismo para revertir el scroll cuando estás en medio de la sección o ligeramente después del Hero.

## Escena 3D (Hero Section)

### Componentes

1. **`CubeWorld.jsx`** - Canvas principal R3F
   - Configura cámara: `position={[0, 8, 16]}`
   - Iluminación: `ambientLight` + `directionalLight`
   - Integra `CubeField` con props de scroll

2. **`CubeField.jsx`** - Grid de cubos
   - Crea grid 10×10 de cubos (100 cubos totales)
   - Posiciones calculadas en bucle anidado
   - Pasa `scroll` y `cameraPosition` a cada cubo

3. **`Cubes.jsx`** - Cubo individual animado
   - **Animación flotante**: `Math.sin(cycleTime) * 0.3` cuando `isActive`
   - **Caída por scroll**: 
     ```javascript
     if(scroll > window.innerHeight*0.10)
       ref.current.position.y -= (scroll - windowHeight*0.05) * 0.0009 * Math.exp(distance/3);
     ```
   - **Fade out**: `opacity = max(1 - scroll*0.0002, 0)`
   - **Distancia exponencial**: Los cubos más cerca de la cámara caen más rápido

### Integración con scroll

- `page.tsx` tiene `useEffect` que escucha scroll del `#snap-scroll-container`
- Actualiza `scrollPosition` state
- State se pasa como prop a `CubeWorld` → `CubeField` → `Cubes`
- Cada cubo reacciona al scroll en su `useFrame` hook

## Estructura de Secciones (según diseño)

1. **Hero** ✅ Implementado
   - Nombre "Mauricio Ramirez" + subtítulo
   - Fondo 3D con cubos low-poly
   - Scroll custom activo
   - Colores: azul/celeste sobre negro/morado

2. **Manifesto** ✅ Implementado
   - Texto filosofía + foto perfil
   - Componentes en `src/app/manifest/`

3. **Mi Conocimiento** ✅ Implementado
   - Cards de stack tecnológico
   - Carrusel horizontal (Embla)
   - Componentes en `src/app/technologies/`

4. **Mi Experiencia** ⚠️ Parcial
   - Timeline vertical numerado
   - Tarjetas alternando izq/derecha
   - Componente base en `src/app/experience/`
   - **Falta**: contenido real, estilos según diseño

5. **Mis Proyectos** ⚠️ Parcial
   - Cards con screenshots
   - Tags de stack (Java, Nest, Next, React)
   - Layout alternante imagen-texto
   - Componentes en `src/app/proyects/`
   - **Falta**: contenido real, imágenes, layout alternante

6. **Contactame** ❌ No implementado
   - Formulario (Nombre, Email, Mensaje)
   - Info contacto (LinkedIn, teléfono, email)

7. **Footer/Encuéntrame** ❌ No implementado
   - Links (LinkedIn, Github, CV)
   - Firma

## Decisiones de Arquitectura

### Por qué R3F sobre Three.js vanilla
- Integración nativa con React lifecycle
- Hooks como `useFrame` para animaciones
- Manejo automático de resize y performance
- Código más declarativo y mantenible

### Por qué GSAP para scroll
- Control preciso sobre animaciones complejas
- ScrollToPlugin especializado en navegación
- Rendimiento superior a CSS scroll-behavior
- Throttling integrado con callbacks

### Por qué múltiples sistemas de carrusel
- **Embla**: Carrusel principal (Mi Conocimiento)
  - Más ligero, mejor táctil
  - Navegación con flechas y dots
- **Swiper**: Posible uso futuro en proyectos
  - Más features out-of-box
  - Mejor para layouts complejos

### CSS-in-JS múltiple
- **Emotion**: Base para MUI components
- **Styled-components**: Componentes styled propios
- **Tailwind**: Utilities para layout rápido
- **CSS Modules**: Estilos scoped específicos

**Decisión cuestionable**: Mezclar tantas soluciones aumenta bundle size y complejidad. Consolidar a Tailwind + CSS Modules sería más limpio.

## Convenciones de Código

- Componentes 3D en `.jsx` (compatibilidad R3F)
- Componentes UI en `.tsx` (type safety)
- Estilos globales en `src/app/styles/`
- CSS Modules con `.module.css` suffix
- Variables CSS en `Variables.css` (colores, fuentes)
- Hooks custom en `src/hooks/`

## Performance Considerations

1. **R3F optimizado**
   - Solo 100 cubos (manageable para mobile)
   - Geometrías compartidas implícitamente
   - No hay physics engine

2. **Scroll throttling**
   - Flag `isThrottled` evita scroll spam
   - Duración de 4s asegura una transición completa

3. **Lazy loading**
   - Next.js 15 con App Router hace code-splitting automático
   - Secciones se cargan según navegación

4. **Optimización faltante**
   - ⚠️ No hay `React.memo` en componentes pesados
   - ⚠️ No hay `useMemo`/`useCallback` en cálculos caros
   - ⚠️ Imágenes no optimizadas con `next/image`

## Variables de Entorno

Actualmente no hay `.env` - el proyecto no usa:
- APIs externas
- Base de datos
- Analytics
- Auth

Si se agregan, seguir patrón Next.js:
```
NEXT_PUBLIC_* para variables client-side
Regular vars para server-side only
```

## Build & Deploy

```bash
# Development
npm run dev        # Puerto 3001 (customizado)

# Production
npm run build      # Genera .next/
npm start          # Sirve build optimizado

# Linting
npm run lint       # ESLint con config Next.js
```

**Deploy target**: Vercel (recomendado para Next.js)
- Zero config deployment
- Edge Network automático
- Optimizaciones automáticas

## Dependencias Críticas

| Paquete | Versión | Por qué crítico |
|---------|---------|-----------------|
| next | 15.5.22 | Core framework |
| react | 19.0.0 | Breaking changes vs 18 |
| three | 0.172.0 | API changes frecuentes |
| @react-three/fiber | 9.0.0-alpha | Alpha = inestable |
| gsap | 3.13.0 | Licencia comercial si escala |

⚠️ **R3F alpha version**: Puede tener breaking changes sin aviso.

## Fuente de Verdad para IA

Este documento es la referencia técnica completa. Al retomar el proyecto:

1. Leer este CONTEXT.md primero
2. Revisar PROGRESS.md para estado actual
3. Consultar YOMERENGUES.pdf para diseño visual
4. Verificar package.json para dependencias actualizadas

**Última actualización**: Enero 2026  
**Autor**: Sistema de documentación automático  
**Mantenedor**: Mauricio Ramirez