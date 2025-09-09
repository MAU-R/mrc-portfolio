import React, {useState, useEffect}from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import CubesField from './CubeField';



const CubeWorld = () => {

  const [scroll, setScroll] = useState(0);
  const [cameraY, setCameraY] = useState(3.5); // Valor inicial para PC
  const [cameraX, setCameraX] = useState(5); 


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

  useEffect(() => {
    const scrollContainer = document.getElementById('snap-scroll-container');

    const handleScroll = () => {
      if (scrollContainer) {
        setScroll(scrollContainer.scrollTop);
      }
    };


    scrollContainer?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateCameraY);
    updateCameraY(); // Inicial

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
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