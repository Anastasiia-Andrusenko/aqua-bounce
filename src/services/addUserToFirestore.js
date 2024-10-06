// services/addUserToFirestore.js

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const addUserToFirestore = async user => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    // Перевірка, чи вже існує користувач у Firestore
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        email: user.email,
        userId: user.uid,
        bestResult: 0,
      });
      console.log('New user data added to Firestore');
    } else {
      console.log('User already exists in Firestore');
    }
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export default addUserToFirestore;
