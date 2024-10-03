import React from 'react';
import { OrbitControls } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <OrbitControls
      // enableRotate={false}
      // enablePan={false}
      // enableZoom={false}
      />
      {children}
    </>
  );
};

export default Scene;
