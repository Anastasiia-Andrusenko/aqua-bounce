import { Sky } from '@react-three/drei';
import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import LoaderOverlay from './components/Loader/Loader';
import Button from './components/Button/Button';
import Timer from 'components/Timer/Timer';
import Header from 'components/Header/Header';
import MovingBlock from 'components/MovingBlock/MovingBlock';
import { useDispatch, useSelector } from 'react-redux';
import NewGame from './components/NewGame/NewGame';
import {
  gameTimerClock,
  resetTimer,
  setShowTimer,
  setTimer,
  gameTimePaused,
} from './redux/slices/gameSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

// --------------------------------------- I M P O R T S
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

export const App = () => {
  const dispatch = useDispatch();
  const [isPreload, setIsPreload] = useState(true);
  const [balls, setBalls] = useState([0]);
  const life = useSelector(state => state.user.life);
  const { timer, showTimer, isPaused, isStopGame } = useSelector(
    state => state.game
  );

  // відслідковуємо обратний таймер для запуска гри
  useEffect(() => {
    if (!isPreload) {
      dispatch(setShowTimer(true));
      const interval = setInterval(() => {
        dispatch(setTimer());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPreload, dispatch]);

  // запускаємо "часи" рахуємо час у грі
  useEffect(() => {
    if (timer <= 0 && !isPaused && life > 0) {
      const clockInterval = setInterval(() => {
        dispatch(gameTimerClock());
      }, 1000);
      return () => clearInterval(clockInterval);
    }
  }, [dispatch, isPaused, life, timer]);

  const handlePauseResume = () => {
    dispatch(gameTimePaused());
  };

  const resetBall = () => {
    if (life > 0) {
      const newBallKey = { id: uuidv4() };
      setBalls(prevBalls => [...prevBalls, newBallKey]);
    }
  };

  // START GAME функція
  const handleStartBtn = () => {
    setIsPreload(false);
    setBalls([{ id: uuidv4() }]);
    dispatch(resetTimer());
  };

  // START таймер для гри
  const handleResetTimer = () => {
    setBalls([{ id: uuidv4() }]);
    dispatch(resetTimer());
  };

  const isPhysicStop = () => {
    if (isPaused || isStopGame) {
      return true;
    }
  };

  return (
    <div className="page">
      <Suspense fallback={<LoaderOverlay />}>
        {isPreload ? (
          <Preload handleStartBtnClick={handleStartBtn} />
        ) : (
          <>
            <Header />
            {showTimer && <Timer timer={timer} />}
            {!isStopGame && (
              <Button
                onClick={handlePauseResume}
                text={isPaused ? 'Resume' : 'Pause'}
              />
            )}
            <NewGame resetTimer={handleResetTimer} />
            {isPaused && <PausedOverlay />}
            <Canvas
              dpr={1.5}
              camera={{ position: [0, 25, 40], fov: 70 }}
              frameloop={isPaused ? 'demand' : 'always'}
              style={{ background: '0x87CEEB' }}
            >
              <Physics
                iterations={5}
                gravity={[0, -30, 0]}
                isPaused={isPhysicStop()}
              >
                <Scene>
                  {!showTimer &&
                    balls.map(ball => (
                      <React.Fragment key={ball.id}>
                        {<Ball onReset={resetBall} ballId={ball.id} />}
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
        <ToastContainer />
      </Suspense>
    </div>
  );
};
