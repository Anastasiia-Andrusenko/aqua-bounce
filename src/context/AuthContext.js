//
// AuthContext.tsx
//
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        if (user.emailVerified) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          toast.warn('Please verify your email address before proceeding.', {
            autoClose: false,
          });
          signOut(auth);
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateDisplayName = displayName => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, displayName });
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    logout,
    updateDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
