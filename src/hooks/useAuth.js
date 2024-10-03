import { useEffect, useState } from 'react';
import { auth } from '../utils/firebaseConfig';

const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return isLoggedIn;
};

export default useAuthState;
