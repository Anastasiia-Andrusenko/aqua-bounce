import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';

const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('User state changed:', user);
      setIsLoggedIn(!!user);
    });

    return () => {
      console.log('Unsubscribing from auth state changes');
      unsubscribe();
    };
  }, []);

  return isLoggedIn;
};

export default useAuthState;
