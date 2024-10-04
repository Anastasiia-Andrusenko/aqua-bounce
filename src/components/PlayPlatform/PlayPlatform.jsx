import * as THREE from 'three';
import Platform from '../Platform/Platform';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const PlayPlatform = () => {
  const api = useRef();

  useFrame(state => {
    api.current.position.set(state.mouse.x * 40, 2, state.mouse.y * -40);

    const tiltX = (state.mouse.y * Math.PI) / 8; // Нахил по осі X
    const tiltY = (state.mouse.x * Math.PI) / 8; // Нахил по осі Y
    const tiltZ = (state.mouse.x * Math.PI) / 8; // Нахил по осі Z

    api.current.rotation.set(tiltX, tiltY, tiltZ);
  });

  // Функція для створення половини циліндра
  const HalfCylinder = () => {
    const geometry = new THREE.CylinderGeometry(
      40,
      40,
      60,
      128,
      1,
      false,
      0,
      Math.PI
    );
    geometry.rotateY(Math.PI / 2);
    return (
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          transmission={0.99}
          roughness={0}
          thickness={0}
          envMapIntensity={4}
          color="rgba(199, 21, 133, 0.1)"
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  };

  return (
    <>
      <HalfCylinder />
      <Platform ref={api} material={{ restitution: 1.3 }} color={0xc71585} />
    </>
  );
};

export default PlayPlatform;
