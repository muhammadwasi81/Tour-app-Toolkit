import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice';
import TourReducer from './features/tourSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
});

export default store;
