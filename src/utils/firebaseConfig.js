// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBZK0YQCfL6a6nJ4zUP8Rf4u9VfC5yPUJQ',
  authDomain: 'aqua-bounce.firebaseapp.com',
  projectId: 'aqua-bounce',
  storageBucket: 'aqua-bounce.appspot.com',
  messagingSenderId: '339873647650',
  appId: '1:339873647650:web:a10047ec1a6ded28d18e7b',
  measurementId: 'G-0C87LC6SNF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, doc, getDoc };
