import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import divisionSlice from './divisionSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
  },
});

export default store;
