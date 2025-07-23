import React, {useState, useEffect}from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import CubesField from './CubeField';



const CubeWorld = () => {

  const [scroll, setScroll] = useState(0);
  const [cameraY, setCameraY] = useState(5); // Valor inicial para PC

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const updateCameraY = () => {
    const width = window.innerHeight;
    if (width > 1300) {
      setCameraY(7.5); // PC
    } else if (width > 900) {
      setCameraY(3.3); // Tablet
    } else {
      setCameraY(9.5); // Celular
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCameraY);
    updateCameraY(); // Llamar para definir el valor al inicio

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCameraY);
    };
  }, []);

  const cameraPosition = new THREE.Vector3(0, cameraY, 15);
  return (
   
    <div className='main-canvas'>
    <Canvas  camera={{ position: cameraPosition.toArray(), rotation:[-0.55,0,0]}}>
      <ambientLight intensity={0.8} />
      <pointLight position={[1, 2, 1]} intensity={30} />
      <pointLight position={[1, 2, 8]} intensity={30} />
      <pointLight position={[1, 2, -8]} intensity={30} />
      <CubesField scroll={scroll} cameraPosition={cameraPosition} />

    </Canvas>
    </div>
  );
};

export default CubeWorld