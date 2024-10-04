import * as THREE from 'three';
import { useSphere } from '@react-three/cannon';
import { useEffect, useState } from 'react';
import { useTexture } from '@react-three/drei';
import plopSound from '../../sounds/plop.mp3';
import ballLogo from '../../imgs/logo.jpg';

const plop = new Audio(plopSound);

const Ball = ({ args = [1, 64, 64], v = new THREE.Vector3(), onReset }) => {
  const [isFloating, setIsFloating] = useState(false);
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    material: { restitution: 0.95 },
    position: [Math.random() * 20 - 10, 40, 0],
  }));

  useEffect(() => {
    const unsubscribe = api.position.subscribe(position => {
      if (position[1] < 0 && !isFloating) {
        setIsFloating(true);
        api.velocity.set(0, 0, 0);
        api.position.set(position[0], 0.5, position[2]);
        api.mass.set(0);

        plop.currentTime = 0;
        plop.play();

        onReset();
      }
    });

    return () => unsubscribe();
  }, [api.position, onReset, isFloating, api.velocity, api.mass]);
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={args} />
        <meshStandardMaterial
          map={useTexture(ballLogo)}
          roughness={0}
          thickness={10}
          envMapIntensity={1}
          color="orange"
        />
      </mesh>
    </>
  );
};

export default Ball;
