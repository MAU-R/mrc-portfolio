# Sistema de Scroll Personalizado - Documentación Técnica

## Índice
1. [Visión General](#visión-general)
2. [SnapScrollWrapper.tsx](#snapscrollwrappertsx)
3. [CubeWorld.jsx](#cubeworldjsx)
4. [CubeField.jsx](#cubefieldjsx)
5. [Cubes.jsx](#cubesjsx)
6. [Flujo de Datos](#flujo-de-datos)
7. [Problemas Conocidos](#problemas-conocidos)

---

## Visión General

El sistema de scroll personalizado del portfolio está diseñado para crear una experiencia inmersiva donde:
- El scroll tradicional se reemplaza por un "barrido" (sweep) en la sección Hero
- Los cubos 3D reaccionan al scroll, cayendo y desapareciendo
- Se utiliza GSAP para animaciones suaves
- React Three Fiber maneja el renderizado 3D

### Arquitectura del Sistema

```
page.tsx
  └── SnapScrollWrapper (controla el scroll)
      └── children (secciones del portfolio)
          └── CubeWorld (canvas 3D, posicionado fixed)
              └── CubeField (genera grid de cubos)
                  └── Cube (componente individual)
```

---

## SnapScrollWrapper.tsx

**Propósito**: Wrapper que intercepta eventos de scroll y aplica un comportamiento de "snap" personalizado usando GSAP.

### Línea por línea:

```typescript
'use client';
```
**L1**: Directiva de Next.js 13+ que indica que este es un Client Component (requiere interactividad del navegador).

```typescript
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
```
**L3-5**: Importaciones necesarias:
- `useEffect`: Para side effects (agregar event listeners)
- `useRef`: Para referencias directas al DOM
- `gsap`: Librería de animación para scroll suave
- `ScrollToPlugin`: Plugin de GSAP para animar el scrollTop

```typescript
gsap.registerPlugin(ScrollToPlugin);
```
**L7**: Registra el plugin globalmente. GSAP requiere esto para habilitar la funcionalidad `scrollTo`.

```typescript
export default function SnapScrollWrapper({ children }: { children: React.ReactNode }) {
```
**L9**: Componente funcional que recibe children (el contenido a wrappear).

```typescript
const containerRef = useRef<HTMLDivElement>(null);
const groupRef = useRef<HTMLDivElement>(null);
let isThrottled = false;
```
**L10-12**: 
- `containerRef`: Referencia al div que scrollea (el viewport)
- `groupRef`: Referencia al grupo Hero donde ocurre el efecto especial
- `isThrottled`: Flag para prevenir múltiples animaciones simultáneas

```typescript
useEffect(() => {
  const container = containerRef.current;
  const group = groupRef.current;
  if (!container || !group) return;
```
**L14-17**: Hook que se ejecuta al montar. Obtiene referencias DOM y retorna early si no existen.

```typescript
let touchStartY = 0;
let isTouchScrolling = false;
```
**L19-20**: Variables para manejar eventos touch en dispositivos móviles:
- `touchStartY`: Coordenada Y donde comenzó el touch
- `isTouchScrolling`: Flag para saber si está ocurriendo scroll touch dentro del Hero

```typescript
const scrollTo = (target: number) => {
  isThrottled = true;

  gsap.to(container, {
    scrollTo: { y: target, autoKill: false },
    duration: 4,
    ease: 'power2.inOut',
    onComplete: () => {
      isThrottled = false;
    },
  });
};
```
**L22-33**: Función que anima el scroll a una posición target:
- **L23**: Activa throttle para bloquear nuevos scrolls
- **L25-32**: Animación GSAP
  - `scrollTo: { y: target }`: Anima el scrollTop del container
  - `autoKill: false`: No interrumpe la animación si hay cambios
  - `duration: 4`: 4 segundos de duración (muy lento para efecto dramático)
  - `ease: 'power2.inOut'`: Curva de animación (acelera y desacelera)
  - `onComplete`: Callback que desactiva throttle al terminar

```typescript
const onWheel = (e: WheelEvent) => {
  const currentScroll = container.scrollTop;
  const groupTop = group.offsetTop;
  const groupBottom = groupTop + group.offsetHeight;
```
**L35-38**: Handler para eventos de rueda del mouse:
- `currentScroll`: Posición actual del scroll
- `groupTop`: Posición Y donde comienza el Hero
- `groupBottom`: Posición Y donde termina el Hero

```typescript
// Dentro del Hero: permitir scroll nativo continuo
if (currentScroll >= groupTop && currentScroll < groupBottom - container.clientHeight) {
  // Scroll nativo dentro del hero, no hacer nada especial
  return;
}
```
**L40-44**: **CRÍTICO** - Si el scroll está dentro del Hero, permite scroll nativo normal (no interviene). Esto permite el efecto de caída de cubos mientras scrolleas naturalmente.

```typescript
// En los bordes: aplicar snap scroll si no está en throttle
if (isThrottled) return;
```
**L46-47**: Si ya hay una animación en curso, ignora nuevos eventos.

```typescript
// Scroll hacia abajo desde antes del Hero
if (e.deltaY > 0 && currentScroll < groupTop + 100) {
  e.preventDefault();
  scrollTo(groupBottom);
}
```
**L49-53**: **SNAP DOWN** - Si scrolleas hacia abajo (`deltaY > 0`) estando antes del Hero (con margen de 100px), previene scroll default y anima hasta el final del Hero (el "barrido").

```typescript
// Scroll hacia arriba desde después del Hero
if (e.deltaY < 0 && currentScroll >= groupBottom - container.clientHeight) {
  e.preventDefault();
  scrollTo(groupTop);
}
```
**L55-59**: **SNAP UP** - Si scrolleas hacia arriba (`deltaY < 0`) estando después del Hero, anima de regreso al inicio del Hero.

**NOTA**: Aquí está el bug - solo funciona para bajar, no para subir dentro del Hero.

```typescript
const onTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY;
  isTouchScrolling = false;
};
```
**L62-65**: Handler para inicio de touch:
- Guarda la posición Y inicial
- Resetea el flag de scrolling

```typescript
const onTouchMove = (e: TouchEvent) => {
  const currentScroll = container.scrollTop;
  const groupTop = group.offsetTop;
  const groupBottom = groupTop + group.offsetHeight;

  // Dentro del Hero: permitir scroll nativo continuo
  if (currentScroll >= groupTop && currentScroll < groupBottom - container.clientHeight) {
    isTouchScrolling = true;
    return; // Permitir scroll nativo
  }
};
```
**L67-77**: Handler para movimiento de touch:
- Recalcula posiciones
- Si está dentro del Hero, marca `isTouchScrolling` y permite scroll nativo
- Mismo comportamiento que `onWheel` para mantener consistencia

```typescript
const onTouchEnd = (e: TouchEvent) => {
  if (isThrottled || isTouchScrolling) {
    isTouchScrolling = false;
    return;
  }
```
**L79-83**: Handler para fin de touch:
- Si hay throttle o se estaba scrolleando dentro del Hero, sale early
- Resetea el flag

```typescript
const deltaY = touchStartY - e.changedTouches[0].clientY;
```
**L85**: Calcula la distancia del swipe (positivo = swipe up, negativo = swipe down).

```typescript
const currentScroll = container.scrollTop;
const groupTop = group.offsetTop;
const groupBottom = groupTop + group.offsetHeight;

// Swipe hacia arriba (scroll hacia abajo)
if (deltaY > 50 && currentScroll < groupTop + 100) {
  e.preventDefault();
  scrollTo(groupBottom);
}

// Swipe hacia abajo (scroll hacia arriba)
if (deltaY < -50 && currentScroll >= groupBottom - container.clientHeight) {
  e.preventDefault();
  scrollTo(groupTop);
}
```
**L87-101**: Lógica de snap para touch:
- Requiere al menos 50px de distancia para activar
- Mismo comportamiento que `onWheel` pero con gestos touch
- **BUG**: El umbral de 50px puede ser muy sensible o poco sensible dependiendo del dispositivo

```typescript
container.addEventListener('wheel', onWheel, { passive: false });
container.addEventListener('touchstart', onTouchStart, { passive: true });
container.addEventListener('touchmove', onTouchMove, { passive: true });
container.addEventListener('touchend', onTouchEnd, { passive: false });
```
**L104-107**: Registra todos los event listeners:
- `passive: false` para `wheel` y `touchend` porque llaman `preventDefault()`
- `passive: true` para `touchstart` y `touchmove` para mejor performance

```typescript
return () => {
  container.removeEventListener('wheel', onWheel);
  container.removeEventListener('touchstart', onTouchStart);
  container.removeEventListener('touchmove', onTouchMove);
  container.removeEventListener('touchend', onTouchEnd);
};
```
**L109-114**: Cleanup function que remueve todos los listeners cuando el componente se desmonta.

```typescript
}, []);
```
**L115**: Array de dependencias vacío = el effect solo corre una vez al montar.

```typescript
return (
  <div ref={containerRef} className="relative h-screen overflow-y-scroll scroll-container overflow-x-hidden" id="snap-scroll-container">
    <div ref={groupRef}>
      {children}
    </div>
  </div>
);
```
**L117-123**: JSX de retorno:
- `containerRef`: El div scrolleable principal
- `h-screen`: Altura de 100vh
- `overflow-y-scroll`: Permite scroll vertical
- `id="snap-scroll-container"`: ID usado por CubeWorld para detectar scroll
- `groupRef`: Envuelve children (aquí va el Hero con los cubos)

---

## CubeWorld.jsx

**Propósito**: Componente que maneja el canvas 3D de Three.js y sincroniza la posición de la cámara con el scroll.

### Línea por línea:

```javascript
import React, {useState, useEffect}from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import CubesField from './CubeField';
```
**L1-4**: Importaciones:
- React hooks para estado
- `Canvas`: Componente de R3F que crea el renderer WebGL
- `THREE`: Librería Three.js completa
- `CubesField`: Componente que genera el grid de cubos

```javascript
const CubeWorld = () => {
```
**L8**: Componente funcional (sin export default al final).

```javascript
const [scroll, setScroll] = useState(0);
const [cameraY, setCameraY] = useState(3.5); // Valor inicial para PC
const [cameraX, setCameraX] = useState(5);
```
**L10-12**: Estados:
- `scroll`: Posición actual del scroll (en pixels)
- `cameraY`: Posición Y de la cámara (ajustable por tamaño de pantalla)
- `cameraX`: Posición X de la cámara (no se usa actualmente)

```javascript
const updateCameraY = () => {

  const width = window.innerWidth;
  console.log("Aqui entro o que?", width)
  if (width > 1300) {
    setCameraY(3.5); // PC
  } else if (width > 900) {
    setCameraY(2.9); // Tablet
  } else {
    setCameraY(2.3); // Celular
  }
};
```
**L15-26**: Función de responsive design para la cámara:
- **L17**: Obtiene ancho de ventana
- **L18**: Console log (debug, debería removerse en producción)
- **L19-25**: Breakpoints para ajustar altura de cámara:
  - Desktop (>1300px): Y = 3.5 (más alta)
  - Tablet (900-1300px): Y = 2.9 (media)
  - Mobile (<900px): Y = 2.3 (más baja, para ver más cubos)

**RAZÓN**: En pantallas pequeñas, una cámara más baja permite ver más del campo de cubos.

```javascript
useEffect(() => {
  const scrollContainer = document.getElementById('snap-scroll-container');

  const handleScroll = () => {
    if (scrollContainer) {
      setScroll(scrollContainer.scrollTop);
    }
  };
```
**L28-35**: Setup de scroll listener:
- **L29**: Obtiene el container de scroll por ID (el div de SnapScrollWrapper)
- **L31-35**: Handler que actualiza el estado `scroll` con la posición actual

**CRÍTICO**: Este es el enlace entre el DOM scroll y React state que luego se pasa a los cubos.

```javascript
scrollContainer?.addEventListener("scroll", handleScroll);
window.addEventListener("resize", updateCameraY);
updateCameraY(); // Inicial
```
**L38-40**: 
- Escucha eventos scroll del container
- Escucha resize de ventana para ajustar cámara
- Llama `updateCameraY()` inmediatamente para setup inicial

```javascript
return () => {
  scrollContainer?.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateCameraY);
};
```
**L42-45**: Cleanup de listeners.

```javascript
}, []);
```
**L46**: Array vacío = solo corre al montar.

```javascript
const cameraPosition = new THREE.Vector3(0, cameraY, 15);
```
**L49**: **POSICIÓN DE CÁMARA**:
- X = 0 (centrada horizontalmente)
- Y = cameraY (variable según dispositivo)
- Z = 15 (distancia fija hacia atrás)

**IMPORTANTE**: La cámara mira hacia (0,0,0) con rotación X=-0.55 rad.

```javascript
return (
  <div className='main-canvas'>
  <Canvas  camera={{ position: cameraPosition.toArray(), rotation:[-0.55,0,0]}}>
```
**L51-53**: 
- Wrapper div para el canvas
- `Canvas` de R3F con configuración:
  - `position`: Array [x,y,z] de la posición de cámara
  - `rotation`: [-0.55,0,0] rad = inclinación hacia abajo ~31.5°

**RAZÓN**: La rotación negativa en X hace que la cámara mire ligeramente hacia abajo, creando perspectiva dramática del skyline.

```javascript
<ambientLight intensity={0.8} />
<pointLight position={[1, 2, 1]} intensity={30} />
<pointLight position={[1, 2, 8]} intensity={30} />
<pointLight position={[1, 2, -8]} intensity={30} />
```
**L54-57**: Luces de la escena:
- `ambientLight`: Luz global difusa (80% intensidad) - ilumina todo por igual
- 3x `pointLight`: Luces puntuales de alta intensidad (30) en diferentes posiciones Z
  - Una cerca (z=1), una al frente (z=8), una atrás (z=-8)

**RAZÓN**: Las luces múltiples crean profundidad y gradientes en los cubos.

```javascript
<CubesField scroll={scroll} cameraPosition={cameraPosition} />
```
**L58**: Pasa el estado de scroll y posición de cámara al field de cubos.

---

## CubeField.jsx

**Propósito**: Genera un grid de 400 cubos (20x20) usando noise Perlin para alturas, y activa subgrupos aleatoriamente.

### Línea por línea:

```javascript
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { FBM } from 'three-noise';
import Cube from './Cubes.jsx';
```
**L1-4**: Importaciones:
- React hooks
- THREE para Vector2
- `FBM`: Fractional Brownian Motion (noise procedural)
- Componente `Cube` individual

```javascript
const fbm = new FBM({
  seed: Math.random(),
  scale: 8.06,
  octaves: 6,
  persistence: 0.5,
  lacunarity: 2,
  redistribution: 1,
  height: 0.0,
});
```
**L6-14**: Instancia FBM (tipo de noise) con parámetros:
- `seed: Math.random()`: Seed aleatorio = patrón diferente cada reload
- `scale: 8.06`: Escala del noise (mayor = más variación)
- `octaves: 6`: Capas de noise superpuestas (más = más detalle)
- `persistence: 0.5`: Cuánto influye cada octave (0.5 = 50%)
- `lacunarity: 2`: Frecuencia entre octaves (2 = el doble)
- `redistribution: 1`: Distribución de valores
- `height: 0.0`: Offset base de altura

**RAZÓN**: FBM crea alturas orgánicas para los cubos, simulando un skyline irregular.

```javascript
const CubesField = ({scroll, cameraPosition}) => {
```
**L16**: Recibe props: `scroll` (posición) y `cameraPosition` (Vector3).

```javascript
const [activeCubes, setActiveCubes] = useState([]);
const cubes = [];
const totalCubes = 20 * 20; // 400 cubos
const groupSize = 75;
const duration = 30000; // Duración de cada grupo en milisegundos
```
**L18-22**: 
- `activeCubes`: Array de índices de cubos "activos" (iluminados)
- `cubes`: Array temporal para JSX
- `totalCubes`: 400 cubos en el grid
- `groupSize`: 75 cubos activos a la vez (~18.75% del total)
- `duration`: 30 segundos antes de cambiar grupo

```javascript
useEffect(() => {
  let intervalId;
  let usedIndices = new Set();
```
**L24-26**: Setup de effect:
- `intervalId`: Referencia al interval timer
- `usedIndices`: Set para evitar duplicados en el mismo grupo

```javascript
const activateRandomCubes = () => {
  const newActiveCubes = [];
  while (newActiveCubes.length < groupSize) {
    const randomIndex = Math.floor(Math.random() * totalCubes);
    if (!usedIndices.has(randomIndex)) {
      newActiveCubes.push(randomIndex);
      usedIndices.add(randomIndex);
    }
  }
  setActiveCubes(newActiveCubes);
};
```
**L27-37**: Función que selecciona 75 cubos aleatorios sin repetir:
- **L28**: Array vacío para nuevos activos
- **L29**: Loop hasta tener 75 cubos
- **L30**: Genera índice aleatorio entre 0-399
- **L31**: Verifica que no esté ya usado
- **L32-33**: Agrega a array y Set
- **L36**: Actualiza estado

**EFECTO**: Cada 30 segundos, un nuevo grupo de 75 cubos se ilumina al azar.

```javascript
activateRandomCubes();
intervalId = setInterval(() => {
  activateRandomCubes();
  usedIndices.clear(); // Limpiar el conjunto de índices usados después de cada ciclo
}, duration);

return () => clearInterval(intervalId);
```
**L39-45**: 
- **L39**: Activa primer grupo inmediatamente
- **L40-43**: Interval que cada 30s activa nuevo grupo y limpia Set
- **L45**: Cleanup del interval

```javascript
}, []);
```
**L46**: Array vacío = solo corre al montar (el interval continúa indefinidamente).

```javascript
let cubeIndex = 0;
for (let x = -10; x < 10; x++) {
  for (let z = -10; z < 10; z++) {
```
**L48-50**: Genera grid de cubos:
- `cubeIndex`: Contador global (0-399)
- Loops anidados: X de -10 a 9, Z de -10 a 9 = 20x20 = 400 cubos

```javascript
const pos = new THREE.Vector2(x, z);
const height = fbm.get2(pos);
```
**L51-52**: 
- Crea Vector2 con posición XZ
- Obtiene altura del noise en esa posición (entre -1 y 1)

```javascript
const isActive = activeCubes.includes(cubeIndex);
```
**L53**: Verifica si este cubo está en el array de activos.

```javascript
cubes.push(
  <Cube key={`${x}-${z}`} position={[x * 1.1, height * 3, z * 1.1]} isActive={isActive} scroll={scroll} cameraPosition={cameraPosition}/>
);
```
**L54-56**: Crea componente Cube:
- `key`: Identificador único React
- `position`: 
  - X: `x * 1.1` (espaciado de 1.1 unidades)
  - Y: `height * 3` (altura del noise multiplicada x3)
  - Z: `z * 1.1` (espaciado de 1.1 unidades)
- `isActive`: Boolean si está iluminado
- `scroll` y `cameraPosition`: Para animación de caída

```javascript
cubeIndex++;
```
**L57**: Incrementa contador para siguiente cubo.

```javascript
return <>{cubes}</>;
```
**L61**: Retorna Fragment con todos los cubos generados.

---

## Cubes.jsx

**Propósito**: Componente individual de cada cubo con animación de caída basada en scroll y distancia a la cámara.

### Línea por línea:

```javascript
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
```
**L1-3**: Importaciones:
- React hooks
- `useFrame`: Hook de R3F que ejecuta código cada frame (~60fps)
- THREE para matemáticas 3D

```javascript
const Cube = ({ position, isActive, scroll, cameraPosition }) => {
```
**L5**: Props del cubo individual:
- `position`: Array [x,y,z] de posición inicial
- `isActive`: Boolean si está iluminado
- `scroll`: Valor de scroll actual
- `cameraPosition`: Vector3 de la cámara

```javascript
const meshRef = useRef();
const [visible, setVisible] = useState(true);
const [initialY] = useState(position[1]); // Guardamos la altura inicial
```
**L6-8**:
- `meshRef`: Referencia al mesh de Three.js
- `visible`: Estado para ocultar el cubo
- `initialY`: Guarda Y inicial (constante) para resetear altura

```javascript
useEffect(() => {
  if (!meshRef.current) return;
  
  const mesh = meshRef.current;
  const cube = mesh;
```
**L10-14**: Effect de caída - setup inicial.

```javascript
const distanceToCamera = cameraPosition.distanceTo(new THREE.Vector3(...position));
const fallSpeed = 0.015 + (distanceToCamera * 0.001);
```
**L16-17**: **CÁLCULO CRÍTICO**:
- `distanceToCamera`: Distancia 3D entre cubo y cámara
- `fallSpeed`: Velocidad base (0.015) + factor de distancia
  - Cubos más lejos caen más rápido (parallax inverso)

```javascript
const maxScroll = 3000;
const scrollFactor = Math.min(scroll / maxScroll, 1);
const fallAmount = scrollFactor * 50 * fallSpeed;
```
**L19-21**: 
- `maxScroll`: 3000px = scroll máximo esperado
- `scrollFactor`: Normalizado entre 0-1
- `fallAmount`: Distancia total de caída = factor × 50 unidades × velocidad

**EJEMPLO**: Si scroll=1500px, scrollFactor=0.5, fallAmount=25*fallSpeed unidades.

```javascript
cube.position.y = initialY - fallAmount;
```
**L23**: **ANIMACIÓN DE CAÍDA**: Resta el fallAmount de la Y inicial.

```javascript
if (scrollFactor > 0.8) {
  setVisible(false);
} else {
  setVisible(true);
}
```
**L25-29**: **FADE OUT**: Si scroll > 80% del máximo, oculta el cubo.

```javascript
}, [scroll, cameraPosition, position, initialY]);
```
**L30**: Dependencias - re-ejecuta cuando cambia cualquiera de estos valores.

**PROBLEMA**: `cameraPosition` y `position` son objetos/arrays = re-renders innecesarios.

```javascript
useFrame(() => {
  if (meshRef.current && isActive) {
    meshRef.current.rotation.y += 0.01;
  }
});
```
**L32-36**: **ANIMACIÓN DE ROTACIÓN**:
- Ejecuta cada frame (~60fps)
- Solo rota si el cubo está activo
- Rotación en Y a velocidad constante 0.01 rad/frame

**EFECTO**: Los cubos "activos" giran, los demás están estáticos.

```javascript
if (!visible) return null;
```
**L38**: Si no es visible, no renderiza nada (optimización).

```javascript
const color = isActive
  ? new THREE.Color(0x00d9ff)
  : new THREE.Color(0x4a5568);
```
**L40-42**: Color del cubo:
- Activo: Cyan brillante (0x00d9ff)
- Inactivo: Gris oscuro (0x4a5568)

```javascript
return (
  <mesh ref={meshRef} position={position}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial
      color={color}
      emissive={isActive ? new THREE.Color(0x00aaff) : new THREE.Color(0x000000)}
      emissiveIntensity={isActive ? 0.5 : 0}
    />
  </mesh>
);
```
**L44-52**: JSX del cubo:
- `mesh`: Objeto 3D
- `boxGeometry`: Cubo de 1x1x1 unidades
- `meshStandardMaterial`: Material con PBR:
  - `color`: Color base
  - `emissive`: Color que "emite luz" (solo si activo)
  - `emissiveIntensity`: Intensidad del glow (50% si activo, 0% si no)

**EFECTO VISUAL**: Cubos activos brillan cyan, inactivos son grises mate.

---

## Flujo de Datos

### 1. Scroll Event Flow
```
Usuario scrollea
  ↓
SnapScrollWrapper detecta (onWheel/onTouchEnd)
  ↓
Container.scrollTop cambia
  ↓
CubeWorld escucha evento 'scroll'
  ↓
setScroll(container.scrollTop)
  ↓
Prop scroll llega a CubeField
  ↓
Prop scroll llega a cada Cube
  ↓
useEffect en Cube recalcula posición Y
  ↓
Cubo cae visualmente
```

### 2. Snap Scroll Flow
```
Usuario scrollea con rueda
  ↓
onWheel detecta si está en borde del Hero
  ↓
e.preventDefault() bloquea scroll nativo
  ↓
scrollTo(target) con GSAP
  ↓
Animación de 4 segundos
  ↓
Durante animación: isThrottled = true
  ↓
Scroll animado mueve container.scrollTop
  ↓
CubeWorld detecta cambios de scrollTop
  ↓
Cubos caen gradualmente durante animación
```

### 3. Activation Flow
```
Componente CubeField monta
  ↓
useEffect se ejecuta
  ↓
activateRandomCubes() selecciona 75 índices
  ↓
setActiveCubes([índices...])
  ↓
setInterval cada 30s repite
  ↓
Cubes reciben isActive={activeCubes.includes(i)}
  ↓
useFrame rota solo cubos activos
  ↓
Material muestra color/emissive según isActive
```

---

## Problemas Conocidos

### 1. Bug: Scroll hacia arriba no funciona
**Archivo**: `SnapScrollWrapper.tsx`  
**Líneas**: 56-59

**Problema**: 
```typescript
if (e.deltaY < 0 && currentScroll >= groupBottom - container.clientHeight) {
  e.preventDefault();
  scrollTo(groupTop);
}
```
Solo funciona si estás **después** del Hero. Si estás **dentro** del Hero scrolleando hacia arriba, la condición de L41 retorna early y nunca llega a esta lógica.

**Solución propuesta**:
Agregar lógica para detectar scroll up dentro del Hero:
```typescript
// Dentro del Hero scrolleando hacia arriba
if (e.deltaY < 0 && currentScroll > groupTop && currentScroll < groupBottom - container.clientHeight) {
  e.preventDefault();
  scrollTo(groupTop);
}
```

### 2. Bug: Scroll se traba en móvil
**Archivo**: `SnapScrollWrapper.tsx`  
**Líneas**: 79-101

**Problema**: El flag `isTouchScrolling` puede no resetearse correctamente si el usuario hace gestos rápidos o interrumpidos.

**Síntomas**:
- Touch parece no responder
- Scroll queda "congelado"
- Requiere refresh para recuperar

**Causa raíz**: Race condition entre `onTouchMove` y `onTouchEnd`.

**Solución propuesta**:
```typescript
// Agregar timeout de seguridad
const onTouchEnd = (e: TouchEvent) => {
  // Reset automático después de 100ms
  setTimeout(() => {
    isTouchScrolling = false;
  }, 100);
  
  // ... resto del código
}
```

### 3. Performance: Re-renders innecesarios
**Archivo**: `Cubes.jsx`  
**Líneas**: 30

**Problema**:
```javascript
}, [scroll, cameraPosition, position, initialY]);
```
`cameraPosition` es un THREE.Vector3 y `position` es un array. Aunque sus valores no cambien, sus referencias sí, causando re-renders en cada frame.

**Impacto**: 400 cubos × 60fps = 24,000 re-evaluaciones/segundo

**Solución propuesta**:
```javascript
// Usar valores primitivos
}, [scroll, initialY]);

// O memoizar objetos
const cameraPos = useMemo(() => cameraPosition.toArray(), [cameraPosition.x, cameraPosition.y, cameraPosition.z]);
```

### 4. Limitación: No hay scroll up animado
**Archivos**: Todos

**Problema**: El sistema está diseñado para un "barrido" unidireccional (down). No hay animación equivalente al scrollear hacia arriba dentro del Hero.

**Comportamiento actual**:
- Scroll down → Cubos caen suavemente
- Scroll up → Cubos saltan instantáneamente a posición anterior

**Por qué ocurre**: El `useEffect` en `Cubes.jsx` recalcula posición basándose en `scroll` absoluto, no en dirección. Cuando scroll disminuye, la Y simplemente se ajusta, sin transición.

**Solución propuesta**:
Agregar animación con `lerp` (interpolación lineal):
```javascript
useFrame(() => {
  if (!meshRef.current) return;
  const targetY = initialY - fallAmount;
  meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1;
});
```

### 5. Magic Numbers en código
**Archivos**: Múltiples

**Problema**: Valores hard-coded dificultan ajustes:
- `duration: 4` (SnapScrollWrapper L27)
- `maxScroll = 3000` (Cubes L19)
- `groupSize = 75` (CubeField L21)
- `duration = 30000` (CubeField L22)

**Impacto**: Cambiar comportamiento requiere editar múltiples archivos.

**Solución propuesta**:
Centralizar en archivo de configuración:
```javascript
// config/scroll.js
export const SCROLL_CONFIG = {
  snapDuration: 4,
  maxScroll: 3000,
  activeCubesCount: 75,
  activeCubesDuration: 30000,
  fallSpeedBase: 0.015,
  // ...
};
```

---

## Conclusión

El sistema de scroll personalizado es una pieza compleja que coordina:
- Manipulación del DOM (scroll interception)
- Animaciones GSAP (smooth scrolling)
- Renderizado WebGL (Three.js vía R3F)
- Gestión de estado React (sincronización)

**Fortalezas**:
- Efecto visual impresionante
- Integración fluida entre 2D (scroll) y 3D (cubos)
- Responsive design (ajustes de cámara por dispositivo)

**Debilidades**:
- Bugs de bidireccionalidad
- Problemas de performance potenciales
- Código fuertemente acoplado
- Difícil de mantener/extender

**Recomendaciones**:
1. Refactorizar hacia arquitectura basada en eventos
2. Centralizar configuración
3. Agregar tests unitarios
4. Implementar animación reversa
5. Optimizar re-renders con memoización