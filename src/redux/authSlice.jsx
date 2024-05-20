import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {user,accessToken}= action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token= null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAuthStatus = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;