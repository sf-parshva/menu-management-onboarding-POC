import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice';
import menuReducer from '../features/menu/slices/menuSlice';

const loadMenuState = () => {
  try {
    const data = localStorage.getItem('menuState');
    if (data) return JSON.parse(data);
  } catch {}
  return { items: [], categories: [] };
};

const loadAuthState = () => {
  try {
    const data = localStorage.getItem('authState');
    if (data) return JSON.parse(data);
  } catch {}
  return { isAuthenticated: false, currentUser: null, error: null };
};

const preloadedState = {
  menu: loadMenuState(),
  auth: loadAuthState(),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
