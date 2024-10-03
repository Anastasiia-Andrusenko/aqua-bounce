import css from './AuthPanel.module.css';
import React from 'react';
import AuthForm from './AuthForm';
import AuthButton from './AuthBtn';
import useAuthState from 'hooks/useAuth';
import { toast } from 'react-toastify';
import {
  handleLogin,
  loginWithGoogle,
  handleLogout,
} from 'services/authServices';

const AuthPanel = () => {
  // const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);
  const isLoggedIn = useAuthState();

  const onLoginWithGoogle = async () => {
    // setLoading(true);
    try {
      const result = await loginWithGoogle();
      console.log(result.user); // Виведення інформації користувача
    } catch (error) {
      // setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  const onHandleLogin = async (email, password) => {
    // setLoading(true);
    try {
      await handleLogin(email, password);
      console.log(email);
      toast.success('User logged in successfully');
    } catch (error) {
      // setError(error.message);
      toast.error(`Login failed: ${error}`);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className={css.container}>
        {isLoggedIn ? (
          <>
            <p>Hello! Are you ready to play?</p>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <h2 className={css.please}>Please log in to access all features</h2>
            <div className={css.overlay}></div>
            <div className={css.form}>
              <AuthForm
                title=""
                buttonText="Login"
                onSubmit={onHandleLogin}
                showNickname={false}
              />
              <div>
                <AuthButton
                  onClick={onLoginWithGoogle}
                  text="Log in with Google"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AuthPanel;
