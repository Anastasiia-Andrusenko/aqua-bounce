import React, { useRef } from 'react';
import Button from '../Button/Button';
import css from './Preload.module.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Text3D } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import font from '../../font/helvetiker_bold.typeface.json';
import Scene from '../Scene';
const Ocean = React.lazy(() => import('../Ocean/Ocean'));

const AnimatedText = () => {
  const textRef = useRef();

  useFrame(state => {
    const t = state.clock.getElapsedTime();
    textRef.current.position.y = 1.8 + Math.sin(t * 2) * 3;
  });

  return (
    <Text3D
      ref={textRef}
      font={font}
      size={4}
      height={1}
      curveSegments={40}
      bevelEnabled
      bevelThickness={0.1}
      bevelSize={0.01}
      bevelSegments={20}
      position={[-17, -0.2, -10]}
      rotation={[-Math.PI / 2.3, 0, 0]}
      material-toneMapped={true}
    >
      Aqua Bounce
      <meshPhysicalMaterial transmission={0} color={'#ffff00'} />
    </Text3D>
  );
};

const Preload = ({ handleStartBtnClick }) => {
  return (
    <>
      <div className={css.container}>
        <Canvas dpr={1.5} camera={{ position: [0, 20, 2], fov: 100 }}>
          <Physics>
            <Scene>
              <AnimatedText />
              <Sky
                distance={500000}
                sunPosition={[0, 50, 100]}
                inclination={0}
                azimuth={0.25}
              />
              <Ocean />
            </Scene>
          </Physics>
        </Canvas>
        <div className={css.wrapper}>
          <p className={css.text}>Keep the ball in play as long as possible!</p>
          <div className={css.btnWrapper}>
            <Button text={'Lets go!'} onClick={handleStartBtnClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Preload;
