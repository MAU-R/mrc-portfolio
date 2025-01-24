import React, {useState, useEffect}from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import CubesField from './CubeField';



const CubeWorld = () => {

  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {

    setScroll(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const cameraPosition = new THREE.Vector3(1, 1.8, 15);
  return (
   
    <div className='main-canvas'>
    <Canvas  camera={{ position: cameraPosition.toArray(), rotation:[-0.43,0,0]}}>
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