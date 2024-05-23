import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import divisionSlice from './divisionSlice';
import categorySlice from './categorySlice';
import itemSlice from './itemSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
    category: categorySlice.reducer,
    item: itemSlice.reducer,
  },
});

export default store;
