import { db } from '../utils/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

export const updateTopResult = async () => {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);

  let topResultUser = null;

  usersSnapshot.forEach(userDoc => {
    const userData = userDoc.data();
    if (!topResultUser || userData.bestResult > topResultUser.bestResult) {
      topResultUser = {
        userId: userData.userId,
        email: userData.email,
        bestResult: userData.bestResult,
      };
    }
  });

  if (topResultUser) {
    const topResultsRef = doc(db, 'topResults', 'bestUser');
    await setDoc(topResultsRef, {
      userId: topResultUser.userId,
      email: topResultUser.email,
      bestResult: topResultUser.bestResult,
    });
    console.log('Top result updated:', topResultUser);
  }
};
