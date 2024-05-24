import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import divisionSlice from './divisionSlice';
import categorySlice from './categorySlice';
import itemSlice from './itemSlice';
import procurementCategorySlice from './procurementCategorySlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
    category: categorySlice.reducer,
    item: itemSlice.reducer,
    procurementCategory: procurementCategorySlice.reducer,
  },
});

export default store;
