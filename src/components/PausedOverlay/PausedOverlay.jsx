import css from './PausedOverlay.module.css';

const PausedOverlay = () => {
  return (
    <div className={css.overlay}>
      <p className={css.text}>Take a rest</p>
      <div className={css.shark}></div>
    </div>
  );
};

export default PausedOverlay;
