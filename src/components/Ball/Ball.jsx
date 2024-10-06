import { useSphere } from '@react-three/cannon';
import { useEffect, useRef, useState } from 'react';
import { useTexture } from '@react-three/drei';
import plopSound from '../../sounds/plop.mp3';
import ballLogo from '../../imgs/logo.jpg';
import { Line } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import { decrementLife, incrementLife } from '../../redux/slices/userSlice';
import { checkBall, OutsideBall } from 'components/GameLogic/GameLogic';
import { setBounce } from '../../redux/slices/gameSlice';

// --------------------------------------- I M P O R T S

const plop = new Audio(plopSound);

const TrajectoryLine = ({ points }) => {
  return <Line points={points} color="blue" lineWidth={0.4} />;
};

const Ball = ({ args = [1, 64, 64], onReset, ballId }) => {
  const [isFloating, setIsFloating] = useState(false);
  const [trajectoryPoints, setTrajectoryPoints] = useState([]);
  const outBallsArrRef = useRef([]);
  const dispatch = useDispatch();

  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    material: { restitution: 0.95 },
    position: [Math.random() * 20 - 10, 30, 0],
    onCollide: event => {
      if (event.body.userData?.type === 'playPlatform') {
        dispatch(setBounce());
      }
    },
  }));
  const life = useSelector(state => state.user.life);

  useEffect(() => {
    const unsubscribe = api.position.subscribe(position => {
      // --------------------------------------- IS BALL OUT ?
      const isOut = OutsideBall(position, ballId, outBallsArrRef);
      if (isOut) {
        dispatch(incrementLife());
      }

      // --------------------------------------- IS BALL FALL ?
      if (checkBall(position) && !isFloating) {
        setIsFloating(true);
        api.velocity.set(0, 0, 0);
        api.position.set(position[0], 0.5, position[2]);
        api.mass.set(0);

        plop.currentTime = 0;
        plop.play();

        dispatch(decrementLife());

        if (life > 1) {
          onReset();
        }
      }

      const center = [position[0], position[1], position[2]];
      const groundPoint = [position[0], 0, position[2]];
      setTrajectoryPoints([center, groundPoint]);
    });

    return () => {
      unsubscribe();
    };
  }, [
    api.position,
    onReset,
    isFloating,
    api.velocity,
    api.mass,
    dispatch,
    life,
    ballId,
  ]);

  return (
    <>
      {trajectoryPoints.length === 2 && (
        <TrajectoryLine points={trajectoryPoints} />
      )}
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
