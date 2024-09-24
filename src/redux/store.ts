// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Example slice reducer (you can replace this with your actual reducers)
import counterReducer from './slices/adminSlice'; 

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your slice reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use dispatch with TypeScript
export const useAppDispatch = () => useDispatch<AppDispatch>();
