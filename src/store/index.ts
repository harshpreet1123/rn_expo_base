import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import { baseApi } from '../services/baseApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
