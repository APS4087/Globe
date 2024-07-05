import React, { useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls, Stars } from '@react-three/drei';
import { getFresnelMat } from './glowEffect';
import * as THREE from 'three';

// texture imports
import earthMap from './assets/textures/earthmap1k.jpg';
import earthSpecularMap from './assets/textures/earthspec1k.jpg';
import earthBumpMap from './assets/textures/earthbump1k.jpg';
import earthLightsMap from './assets/textures/earthlights1k.jpg';
import earthCloudsMap from './assets/textures/earthcloudmap.jpg';
import earthCloudsAlphaMap from './assets/textures/earthcloudmaptrans.jpg';


function Earth() {
  const basic_EarthTexture = useLoader(TextureLoader, earthMap);
  const specularMap = useLoader(THREE.TextureLoader, earthSpecularMap);
  const bumpMap = useLoader(THREE.TextureLoader, earthBumpMap);
  const lightsMap = useLoader(THREE.TextureLoader, earthLightsMap);
  const cloudsMap = useLoader(THREE.TextureLoader, earthCloudsMap);
  const cloudsAlphaMap = useLoader(THREE.TextureLoader, earthCloudsAlphaMap);
  const fresnelMat = getFresnelMat();
  
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });
  return (
    <group rotation-z={-23.4 * Math.PI / 180}>
      <group ref={ref}>
        {/* Earth Mesh */}
        <mesh>
          <icosahedronGeometry args={[1, 12]} />
          <meshPhongMaterial map={basic_EarthTexture} specularMap={specularMap} bumpMap={bumpMap} bumpScale={0.04} />
        </mesh>
        {/* Lights Mesh */}
        <mesh>
          <icosahedronGeometry args={[1, 12]} />
          <meshBasicMaterial map={lightsMap} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Clouds Mesh */}
        <mesh scale={[1.003, 1.003, 1.003]}>
          <icosahedronGeometry args={[1, 12]} />
          <meshStandardMaterial map={cloudsMap} alphaMap={cloudsAlphaMap} transparent={true} opacity={0.8} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
      {/* Glow Mesh */}
      <mesh scale={[1.01, 1.01, 1.01]}>
        <icosahedronGeometry args={[1, 12]} />
        <shaderMaterial args={[fresnelMat]} />
      </mesh>
    </group>
  );
}

const Globe = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas style={{ background: 'black' }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[-2, 0.5, 1.5]} intensity={1.25} />
        <Earth />
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={1} 
          fade={true} 
          speed={1} 
        />
        <OrbitControls enableDamping dampingFactor={0.25} enableZoom />
      </Canvas>
    </div>
  );
};

export default Globe;
