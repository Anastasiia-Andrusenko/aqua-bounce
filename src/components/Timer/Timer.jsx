import css from './Timer.module.css';

const Timer = ({ timer }) => {
  return (
    <>
      <div className={css.container}>
        <p className={css.timer}>{timer > 0 ? timer : 'Go!'}</p>
      </div>
    </>
  );
};

export default Timer;
