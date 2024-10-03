//
// AuthForm.jsx
//
import React, { useState } from 'react';
import css from './AuthPanel.module.css';
import { BsFillUnlockFill, BsLock } from 'react-icons/bs';

const AuthForm = ({ title, buttonText, onSubmit, showNickname = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(email, password);
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={css.container}>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.inputGroup}>
          <label htmlFor="email" className={css.label}>
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={css.input}
          />
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="password" className={css.label}>
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={css.input}
          />
          <button
            type="button"
            className={css.showPasswordBtn}
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <BsFillUnlockFill className={css.icon} />
            ) : (
              <BsLock className={css.icon} />
            )}
          </button>
        </div>
        {/* <div className={css.inputGroup}>
          <label htmlFor="nickname" className={css.label}>
            Nickname:
          </label>
          <input
            type="text"
            placeholder="Nickname"
            id="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            required
            className={css.input}
          />
        </div> */}
        <button type="submit" className={css.button}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
