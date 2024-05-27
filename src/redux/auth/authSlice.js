import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token:null,
  role: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: build => {
    build.addCase
  }
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;
export default authSlice;
