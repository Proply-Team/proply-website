import { createSlice } from '@reduxjs/toolkit';
import { AuthAction } from './authAction';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
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
  extraReducers: (builder) => {
    builder.addCase(AuthAction.loginAsyncThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
      state.isAuthenticated = false
    })
    builder.addCase(AuthAction.loginAsyncThunk.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.error = null

      const user = jwtDecode(payload.data.token)
      if(user){
        state.user = {
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
        state.isAuthenticated = true
      }
    })
    builder.addCase(AuthAction.loginAsyncThunk.rejected, (state, {payload}) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.error = payload.message
    })

    // Validate Token
    builder.addCase(AuthAction.validateAsyncThunk.pending, (state) => {
      state.isLoading = true
      state.isAuthenticated = false
      state.error = null
      console.log("pending")
    })

    builder.addCase(AuthAction.validateAsyncThunk.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.error = null

      const user = jwtDecode(payload)
      if(user){
        state.user = {
          email: user.email,
          fullName: user.fullName,
          role: user.role
        }
        state.isAuthenticated = true
      }
    })
    builder.addCase(AuthAction.validateAsyncThunk.rejected, (state, {payload}) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.error = payload.message
    })
  }
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectAuthStatus = (state) => state.auth.isAuthenticated;
export default authSlice;
