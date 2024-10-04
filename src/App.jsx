import { Sky } from '@react-three/drei';
import './App.css';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import LoaderOverlay from './components/Loader/Loader';
import Button from './components/Button/Button';
import Timer from 'components/Timer/Timer';

const PlayPlatform = React.lazy(() =>
  import('./components/PlayPlatform/PlayPlatform')
);
const Scene = React.lazy(() => import('./components/Scene'));
const Platform = React.lazy(() => import('./components/Platform/Platform'));
const Ball = React.lazy(() => import('./components/Ball/Ball'));
const Ocean = React.lazy(() => import('./components/Ocean/Ocean'));
const Preload = React.lazy(() => import('./components/Preload/Preload'));
const PausedOverlay = React.lazy(() =>
  import('./components/PausedOverlay/PausedOverlay')
);

function MovingBlock({ offset = 0, position: [x, y, z], v, ...props }) {
  const api = useRef();
  useFrame(state =>
    api.current.position.set(
      x +
        (Math.sin(offset + state.clock.elapsedTime * v) *
          state.viewport.width) /
          10,
      y,
      z
    )
  );
  return (
    <Platform
      ref={api}
      args={[4, 1.5, 4]}
      material={{ restitution: 1 }}
      {...props}
    />
  );
}

export const App = () => {
  const [key, setKey] = useState(0);

  const [paused, setPaused] = useState(false);
  const [isPreload, setIsPreload] = useState(true);
  const [timer, setTimer] = useState(5);
  const [showTimer, setShowTimer] = useState(false);
  // const [ballSum, setBallSum] = useState(0);
  const [balls, setBalls] = useState([0]);

  // Старт таймера після зникнення preload
  useEffect(() => {
    if (!isPreload) {
      setShowTimer(true);
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 0) {
            clearInterval(interval);
            setShowTimer(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isPreload]);

  const resetBall = () => {
    const newBallKey = key + 1;
    setKey(newBallKey);
    setBalls(prevBalls => [...prevBalls, newBallKey]);
  };

  // START GAME функція
  const handleStartBtn = () => {
    setIsPreload(false);
  };

  return (
    <div className="page">
      <Suspense fallback={<LoaderOverlay />}>
        {isPreload ? (
          <Preload handleStartBtnClick={handleStartBtn} />
        ) : (
          <>
            {showTimer && <Timer timer={timer} />}
            <Button
              onClick={() => setPaused(!paused)}
              text={paused ? 'Resume' : 'Pause'}
            />
            {paused && <PausedOverlay />}
            <Canvas
              dpr={1.5}
              camera={{ position: [0, 10, 40], fov: 70 }}
              frameloop={paused ? 'demand' : 'always'}
              style={{ background: '0x87CEEB' }}
            >
              <Physics iterations={5} gravity={[0, -30, 0]} isPaused={paused}>
                <Scene>
                  {!showTimer &&
                    balls.map((ball, index) => (
                      <React.Fragment key={index}>
                        {<Ball onReset={resetBall} />}
                      </React.Fragment>
                    ))}
                  <PlayPlatform />
                  {Array.from({ length: 4 }, (_, i) => (
                    <MovingBlock
                      key={i}
                      position={[0, 10 + i * 2.5, 0]}
                      v={1}
                      offset={10000 * i}
                    />
                  ))}
                  <Platform
                    args={[15, 1.5, 4]}
                    position={[-20, 12, 0]}
                    rotation={[0.1, 0, -0.7]}
                    material={{ restitution: 1.2 }}
                    color={'#15C815'}
                  />
                  <Platform
                    args={[15, 1.5, 4]}
                    position={[20, 12, 0]}
                    rotation={[0.1, 0, 0.7]}
                    material={{ restitution: 1.2 }}
                    color={'#15C815'}
                  />
                  <Environment preset="warehouse" />
                  <Ocean />
                </Scene>
              </Physics>
              <Sky
                distance={500000}
                sunPosition={[0, 50, 200]}
                turbidity={0}
                inclination={10}
                rayleigh={0.7}
              />
            </Canvas>
          </>
        )}
      </Suspense>
    </div>
  );
};
