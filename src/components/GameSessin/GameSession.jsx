/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import css from './GameSession.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'utils/firebaseConfig';
import {
  resetCurrentScore,
  resetGameTimerClock,
  stopStartGame,
} from '../../redux/slices/gameSlice';

const GameSession = ({ score }) => {
  const [bestResult, setBestResult] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const [bestEverResult, setBestEverResult] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    console.log(currentUser);
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        setBestResult(docSnap.data().bestResult);
      }
    };

    const fetchBestUser = async () => {
      const docRef = doc(db, 'topResults', 'bestUser');
      const docSnap = await getDoc(docRef);
      setBestEverResult(docSnap.data());
    };

    console.log(bestEverResult);
    fetchUserData();
    fetchBestUser();
  }, [currentUser]);

  const handleStartGame = () => {
    dispatch(stopStartGame());
    dispatch(resetGameTimerClock());
    dispatch(resetCurrentScore());
  };

  return (
    <div className={css.container}>
      <h2 className={css.game_over}>game over</h2>
      <p className={css.game_over_text}>
        However, this is an opportunity to play better!
      </p>
      <h1 className={css.title}>let's play!</h1>
      <button type="button" className={css.main_btn} onClick={handleStartGame}>
        start a new game
      </button>
      <p className={css.text}>
        Your score in this game
        <span className={css.number}>{score ? score : 0}</span>
      </p>
      <p className={css.text}>
        Your best result
        <span className={css.number}>{bestResult}</span>
      </p>
      {bestEverResult && (
        <p className={css.record}>
          <span className={css.number}>{bestEverResult.email}</span> has the
          best result among all! His/her score is{' '}
          <span className={css.number}>{bestEverResult.bestResult}</span>
        </p>
      )}
    </div>
  );
};

export default GameSession;
