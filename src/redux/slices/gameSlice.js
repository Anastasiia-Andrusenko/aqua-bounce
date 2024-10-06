import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ballsOut: 0,
  timer: 3,
  showTimer: false,
  clock: { minutes: 0, seconds: 0 },
  isPaused: false,
  currentScore: 0,
  bounce: 0,
  isStopGame: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setTimer: state => {
      if (state.timer > 0) {
        state.timer -= 1;
      } else {
        state.showTimer = false;
      }
    },
    resetTimer: state => {
      state.timer = 3;
      state.showTimer = true;
    },
    incrementBallsOut: state => {
      state.ballsOut = state.ballsOut + 1;
    },
    setShowTimer: (state, action) => {
      state.showTimer = action.payload;
    },
    gameTimerClock: state => {
      if (!state.isPaused) {
        state.clock.seconds += 1;
        if (state.clock.seconds >= 60) {
          state.clock.minutes += 1;
          state.clock.seconds = 0;
        }
      }
    },
    resetGameTimerClock: state => {
      state.clock = { minutes: 0, seconds: 0 };
    },
    gameTimePaused: state => {
      state.isPaused = !state.isPaused;
    },
    setCurrentScore: (state, action) => {
      state.currentScore = action.payload;
    },
    resetCurrentScore: state => {
      state.currentScore = 0;
    },
    setBounce: state => {
      state.bounce += 1;
    },
    stopStartGame: state => {
      state.isStopGame = !state.isStopGame;
    },
  },
});

export const {
  setTimer,
  resetTimer,
  setShowTimer,
  incrementBallsOut,
  gameTimerClock,
  gameTimePaused,
  isPaused,
  clock,
  setCurrentScore,
  setBounce,
  resetGameTimerClock,
  resetCurrentScore,
  stopStartGame,
  isStopGame,
} = gameSlice.actions;

export default gameSlice.reducer;
