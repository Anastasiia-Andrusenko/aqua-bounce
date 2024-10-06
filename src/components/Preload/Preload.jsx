import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import css from './Preload.module.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Text3D } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import font from '../../font/Patrick Hand_Regular.json';
import Scene from '../Scene';
import AuthPanel from 'components/AuthPanel/AuthPanel';
import { auth } from 'utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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
      height={0.1}
      curveSegments={10}
      bevelEnabled
      bevelThickness={0.6}
      bevelSize={0.4}
      letterSpacing={0.3}
      bevelSegments={10}
      position={[-14, -1, -10]}
      rotation={[-Math.PI / 2.3, 0, 0]}
      material-toneMapped={true}
    >
      Aqua Bounce
      <meshPhysicalMaterial
        transmission={0}
        color={'#fbff00'}
        roughness={0.3}
        clearcoat={1}
        emissive={'#ffbf00'}
        reflectivity={1}
        emissiveIntensity={0.5}
      />
    </Text3D>
  );
};

const Preload = ({ handleStartBtnClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={css.container}>
      <Canvas dpr={1.5} camera={{ position: [0, 20, 0], fov: 100 }}>
        <Physics>
          <Scene>
            <AnimatedText />
            <Sky
              distance={500000}
              sunPosition={[0, 800, 5000]}
              inclination={0}
              azimuth={0.25}
            />
            <Ocean />
          </Scene>
        </Physics>
      </Canvas>
      <div className={css.wrapper}>
        <p className={css.text}>Keep the ball in play as long as possible!</p>
        <AuthPanel />
        {isLoggedIn && (
          <div className={css.btnWrapper}>
            <Button text={'Lets go!'} onClick={handleStartBtnClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Preload;
