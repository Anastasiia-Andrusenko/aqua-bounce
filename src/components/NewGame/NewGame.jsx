import Button from 'components/Button/Button';
import css from './NewGame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetLife } from '../../redux/slices/userSlice';
import {
  resetCurrentScore,
  resetGameTimerClock,
} from '../../redux/slices/gameSlice';

const NewGame = ({ resetTimer }) => {
  const dispatch = useDispatch();
  const { isStopGame } = useSelector(state => state.game);
  const { isPaused } = useSelector(state => state.game);

  const handleOnClick = () => {
    dispatch(resetLife());
    dispatch(resetGameTimerClock());
    dispatch(resetCurrentScore());
    resetTimer();
  };

  return (
    <>
      {!isStopGame && (
        <div className={css.overlay}>
          {!isPaused && <Button text="RESTART" onClick={handleOnClick} />}
        </div>
      )}
    </>
  );
};

export default NewGame;
