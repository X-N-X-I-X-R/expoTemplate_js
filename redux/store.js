import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slicers/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
