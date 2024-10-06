/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import css from './Header.module.css';
import { IoHeartCircle } from 'react-icons/io5';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'utils/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import Timer from '../GameTimer/GameTimer';
import {
  resetCurrentScore,
  resetGameTimerClock,
  setCurrentScore,
  stopStartGame,
} from '../../redux/slices/gameSlice';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import GameSession from 'components/GameSessin/GameSession';
import { updateTopResult } from 'services/getTopResult';

const Header = () => {
  const [bestResult, setBestResult] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const life = useSelector(state => state.user.life);
  const { clock, currentScore, bounce, isStopGame } = useSelector(
    state => state.game
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        setBestResult(docSnap.data().bestResult);
        updateTopResult();
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    currentScoreCounter();
    checkAndUpdateBestScore();
  }, [bounce]);

  const currentScoreCounter = () => {
    const time = clock.minutes * 60 + clock.seconds;
    const calkScore = time * bounce;
    dispatch(setCurrentScore(calkScore));
  };

  const formatScore = score => {
    if (score >= 1000000) {
      return (score / 1000000).toFixed(1) + 'M';
    } else if (score >= 1000) {
      return (score / 1000).toFixed(1) + 'K';
    }
    return score;
  };

  const checkAndUpdateBestScore = async () => {
    if (currentUser && currentScore > bestResult) {
      try {
        // Оновлюємо bestScore у Firestore, якщо поточний результат кращий
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { bestResult: currentScore });
        setBestResult(currentScore);
        toast.success(`New personal record! ${currentScore}`, {
          theme: 'colored',
        });
      } catch (error) {
        console.error('Error updating best score: ', error);
        toast.error('Failed to update your best score.');
      }
    }
  };

  const handleStopGame = () => {
    dispatch(stopStartGame());
    dispatch(resetGameTimerClock());
    dispatch(resetCurrentScore());
  };

  return (
    <>
      {currentUser && (
        <>
          <div className={css.header}>
            <div className={css.container}>
              <p className={css.userEmail}>{currentUser.email}</p>
              <p className={css.currentScore}>
                {`Score`}
                <span className={css.number}>{formatScore(currentScore)}</span>
              </p>
              <Timer />
              {bestResult > 0 && (
                <p className={css.bestScore}>
                  {`Best Score `}
                  <span className={css.number}>{bestResult}</span>
                </p>
              )}
              <div className={css.life_container}>
                <span className={css.lifeCount}>{life}</span>
                <ul className={css.life_list}>
                  {Array.from({ length: life }, (_, index) => (
                    <li key={index} className={css.life_item}>
                      <IoHeartCircle />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={css.btnWrapper}>
                <Button
                  text={isStopGame ? 'START GAME' : 'STOP GAME'}
                  onClick={handleStopGame}
                />
              </div>
            </div>
          </div>
          {isStopGame && <GameSession score={bestResult} />}
        </>
      )}
    </>
  );
};

export default Header;
