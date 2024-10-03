import React from 'react';
// import styles from './Button.module.scss';

const AuthButton = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default AuthButton;
