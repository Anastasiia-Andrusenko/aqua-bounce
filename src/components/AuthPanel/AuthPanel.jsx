import css from './AuthPanel.module.css';
import React, { useState } from 'react';
import AuthForm from './AuthForm';
import AuthButton from './AuthBtn';
import useAuthState from '../../hooks/newUseAuth';
import { toast } from 'react-toastify';
import { loginWithGoogle, handleLogout } from 'services/authServices';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from 'utils/firebaseConfig';
import addUserToFirestore from 'services/addUserToFirestore';
import { setUser } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import getUserDataFromFirestore from 'services/getUserData';
// --------------------------------------- I M P O R T S

const AuthPanel = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const isLoggedIn = useAuthState();
  const dispatch = useDispatch();

  // ------------------------------------ G O G L E __ L O G_I N
  const onLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;
      await addUserToFirestore(result.user);
      const userData = await getUserDataFromFirestore(user.uid);
      dispatch(
        setUser({
          email: user.email,
          currentScore: 0,
          bestScore: userData.bestScore,
        })
      );
      toast.success('User logged in with Google successfully', {
        position: 'top-left',
        theme: 'colored',
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // ------------------------------------ H A N D L E __ L O G_I N
  const onHandleLogin = async (email, password) => {
    console.log('Attempting to log in with', email);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = await getUserDataFromFirestore(user.uid);

      dispatch(
        setUser({
          email: user.email,
          currentScore: 0,
          bestScore: userData ? userData.bestScore : 0,
        })
      );

      toast.success('User logged in successfully', {
        position: 'top-left',
        theme: 'colored',
      });
    } catch (error) {
      setErrorMessage(error.message);

      toast.error(`${errorMessage}`, {
        position: 'top-left',
        theme: 'colored',
      });

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await addUserToFirestore(user);
        const userData = await getUserDataFromFirestore(user.uid);

        dispatch(
          setUser({
            email: user.email,
            currentScore: 0,
            bestScore: userData ? userData.bestScore : 0,
          })
        );

        toast.success('User logged in successfully', {
          position: 'top-left',
          theme: 'colored',
        });
      } catch (registrationError) {
        setErrorMessage(registrationError.message);
        toast.error('User register error', {
          position: 'top-left',
          theme: 'colored',
        });
      }
    }
  };
  return (
    <>
      <div className={css.container}>
        {isLoggedIn ? (
          <>
            <h2 className={css.title}>Hello! Are you ready to play?</h2>
            <button type="button" onClick={handleLogout} className={css.button}>
              Log out
            </button>
          </>
        ) : (
          <div className={css.formWrapper}>
            <h2 className={css.title}>Please log in to access all features</h2>
            <div className={css.form}>
              <AuthForm
                title=""
                buttonText="Login"
                onSubmit={onHandleLogin}
                showNickname={false}
              />
            </div>
            <AuthButton onClick={onLoginWithGoogle} text="Log in with Google" />
          </div>
        )}
      </div>
    </>
  );
};
export default AuthPanel;
