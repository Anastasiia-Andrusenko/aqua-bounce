import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { RoundedBox } from '@react-three/drei';
import pingSound from '../../sounds/ping.mp3';

const ping = new Audio(pingSound);

const Platform = forwardRef(
  (
    {
      shake = 0,
      args = [6, 1.5, 6],
      color = 0xffff00,
      vec = new THREE.Vector3(),
      ...props
    },
    ref
  ) => {
    const group = useRef();

    const [block, api] = useBox(() => ({
      args,
      ...props,
      type: 'Kinematic',
      restitution: 10,
      onCollide: e => {
        const velocity = e.contact.impactVelocity;
        playSound(velocity);
        shake += velocity / 12.5; // Adjust shake logic if necessary
      },
    }));

    const playSound = velocity => {
      ping.currentTime = 0; // Reset sound playback
      ping.volume = Math.min(1, Math.max(0, velocity / 20)); // Clamp volume based on velocity
      ping.play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    };

    useFrame(() => {
      group.current.position.lerp(
        vec.set(0, (shake = THREE.MathUtils.lerp(shake, 0, 0.1)), 0),
        0.2
      );
    });

    useImperativeHandle(ref, () => api, [api]);

    return (
      <>
        <group ref={group}>
          <RoundedBox ref={block} args={args} radius={0.5} smoothness={10}>
            <meshPhysicalMaterial
              transmission={0.2}
              roughness={0}
              thickness={3}
              envMapIntensity={4}
              color={color}
            />
          </RoundedBox>
        </group>
      </>
    );
  }
);

export default Platform;
