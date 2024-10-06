// GameLogic.js

import { toast } from 'react-toastify';

// --------------------------------------- IS BALL in the Ocean
export const checkBall = position => {
  return position[1] <= 0;
};

// --------------------------------------- IS BALL OUT ?

export const OutsideBall = (position, ballId, outBallsArrRef) => {
  const isOut =
    position[0] > 38 ||
    position[0] < -38 ||
    position[2] > 38 ||
    position[2] < -38;

  if (isOut && !outBallsArrRef.current.includes(ballId)) {
    outBallsArrRef.current.push(ballId);

    toast.warn('BALL OUT', { position: 'top-left', theme: 'colored' });

    return true;
  }

  return false;
};
