// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { auth } from '../utils/firebaseConfig';

// const useAuthStateWithRedirect = () => {
//   const [nickname, setNickname] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       if (user) {
//         setNickname(user.displayName);
//       } else {
//         router.push('/login');
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   return nickname;
// };

// export default useAuthStateWithRedirect;
