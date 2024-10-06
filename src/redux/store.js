// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import gameReducer from '../redux/slices/gameSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

export default store;
