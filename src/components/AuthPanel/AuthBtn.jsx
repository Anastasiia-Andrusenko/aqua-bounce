import React from 'react';
// import styles from './Button.module.scss';
import css from './AuthForm.module.css';
const AuthButton = ({ onClick, text }) => {
  return (
    <button className={`${css.button} ${css.google}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthButton;
