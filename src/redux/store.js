import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import profileSlice from './profileSlice';
import divisionSlice from './divisionSlice';
import categorySlice from './categorySlice';
import itemSlice from './itemSlice';
import procurementCategorySlice from './procurementCategorySlice';
import procurementSlice from './procurementSlice';
import procurementDetailSlice from './procurementDetailSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    division: divisionSlice.reducer,
    category: categorySlice.reducer,
    item: itemSlice.reducer,
    procurementCategory: procurementCategorySlice.reducer,
    procurement: procurementSlice.reducer,
    procurementDetail: procurementDetailSlice.reducer,
  },
});

export default store;
