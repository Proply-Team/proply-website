import { configureStore } from '@reduxjs/toolkit';
import divisionSlice from './divisionSlice';
import categorySlice from './categorySlice';
import itemSlice from './itemSlice';
import userSlice from './userSlice';
import procurementCategorySlice from './procurementCategorySlice';
import procurementSlice from './procurementSlice';
import procurementDetailSlice from './procurementDetailSlice';
import authSlice from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    division: divisionSlice.reducer,
    category: categorySlice.reducer,
    item: itemSlice.reducer,
    user: userSlice.reducer,
    procurementCategory: procurementCategorySlice.reducer,
    procurement: procurementSlice.reducer,
    procurementDetail: procurementDetailSlice.reducer,
  },
});

export default store;
