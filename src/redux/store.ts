// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Example slice reducer (you can replace this with your actual reducers)
import adminReducer from './slices/adminSlice';
import userReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    adminReducer: adminReducer, // Add your slice reducers here
    userReducer: userReducer, // Add your slice reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use dispatch with TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
