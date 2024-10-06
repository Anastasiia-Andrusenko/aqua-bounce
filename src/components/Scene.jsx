import React from 'react';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[0, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <OrbitControls
        enableRotate={false}
        enablePan={false}
        // enableZoom={false}
      />
      {children}
    </>
  );
};

export default Scene;
