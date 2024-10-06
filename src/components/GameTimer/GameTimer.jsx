import React from 'react';
import { useSelector } from 'react-redux';
import css from './GameTimer.module.css';

const Timer = () => {
  const clock = useSelector(state => state.game.clock);
  const min = clock.minutes;
  const sec = clock.seconds;

  return (
    <p className={css.container}>
      <p className={css.timer}>
        <p>
          <span className={css.number}>{min}</span>min
        </p>
        <p>
          <span className={css.number}>{sec}</span>sec
        </p>
      </p>
    </p>
  );
};

export default Timer;
