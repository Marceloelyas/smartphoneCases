import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import designReducer from './designSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    design: designReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;