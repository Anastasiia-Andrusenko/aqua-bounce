import css from './Button.module.css';

const Button = ({ text, onClick }) => {
  return (
    <>
      <div className={css.btnShadow}></div>
      <button className={css.button} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
