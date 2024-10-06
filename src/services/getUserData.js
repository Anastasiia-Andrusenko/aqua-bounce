import { doc, getDoc } from '../utils/firebaseConfig';
import { db } from '../utils/firebaseConfig';

const getUserDataFromFirestore = async userId => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default getUserDataFromFirestore;
