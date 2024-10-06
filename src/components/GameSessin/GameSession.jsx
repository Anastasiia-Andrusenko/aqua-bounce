/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import css from './GameSession.module.css';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'utils/firebaseConfig';
import {
  resetCurrentScore,
  resetGameTimerClock,
  resetTimer,
  stopStartGame,
} from '../../redux/slices/gameSlice';
import { resetLife } from '../../redux/slices/userSlice';

const GameSession = ({ title, text }) => {
  const [bestResult, setBestResult] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const [bestEverResult, setBestEverResult] = useState(null);
  const { currentScore, isStopGame } = useSelector(state => state.game);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // console.log(currentUser);
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

    // console.log(bestEverResult);
    fetchUserData();
    fetchBestUser();
  }, [currentUser]);

  const handleStartGame = () => {
    if (isStopGame) {
      dispatch(stopStartGame());
    }
    dispatch(resetLife());
    dispatch(resetGameTimerClock());
    dispatch(resetCurrentScore());
    dispatch(resetTimer());
  };

  return (
    <div className={`${css.container} ${isVisible ? css.active : ''}`}>
      <h2 className={css.game_over}>{title}</h2>
      <p className={css.game_over_text}>{text}</p>
      <h1 className={css.title}>let's play!</h1>
      <button type="button" className={css.main_btn} onClick={handleStartGame}>
        start a new game
      </button>
      <p className={css.text}>
        Your score in this game
        <span className={css.number}>{currentScore ? currentScore : 0}</span>
      </p>
      <p className={css.text}>
        Your best result
        <span className={css.number}>{bestResult}</span>
      </p>
      {bestEverResult && (
        <p className={css.record}>
          <span className={css.email}>{bestEverResult.email}</span> has the best
          result among all! <br /> His/her score is
          <span className={css.number}>{bestEverResult.bestResult}</span>
        </p>
      )}
    </div>
  );
};

export default GameSession;
