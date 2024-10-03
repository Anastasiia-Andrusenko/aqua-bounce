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

  return (
    <>
      <Platform ref={api} material={{ restitution: 1.3 }} color={0xc71585} />
    </>
  );
};

export default PlayPlatform;
