// src/redux/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  bestScore: 0,
  life: 10,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.currentScore = action.payload.currentScore;
      state.bestScore = action.payload.bestScore;
      state.life = action.payload.life || 10;
    },
    clearUser: state => {
      state.email = null;
      state.currentScore = 0;
      state.bestScore = 0;
      state.life = 10;
    },
    decrementLife: state => {
      if (state.life > 0) {
        state.life -= 1;
      }
    },
    resetLife: state => {
      state.life = 10;
    },
    incrementLife: state => {
      state.life += 1;
    },
  },
});

export const { setUser, clearUser, decrementLife, resetLife, incrementLife } =
  userSlice.actions;
export default userSlice.reducer;
