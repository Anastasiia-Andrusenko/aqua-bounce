// services/authService.js

import { auth } from '../utils/firebaseConfig';
import { signOut } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';

export const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.warn('User logout', { position: 'top-left', theme: 'colored' });

    return { success: true };
  } catch (error) {
    console.error('Error signing out: ', error);
    return { success: false, error };
  }
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error('Google login error:', error.message);
    throw error;
  }
};

export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Email login error:', error.message);
    throw error;
  }
};
