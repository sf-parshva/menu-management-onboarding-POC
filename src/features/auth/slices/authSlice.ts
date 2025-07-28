import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

const getUsersFromStorage = (): User[] => {
  try {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Save auth state to localStorage for persistence
const saveAuthState = (state: AuthState) => {
  localStorage.setItem('authState', JSON.stringify(state));
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      const users = getUsersFromStorage();
      if (users.find((u) => u.username === action.payload.username)) {
        state.error = 'Username already exists.';
        saveAuthState(state);
        return;
      }
      const updatedUsers = [...users, action.payload];
      saveUsersToStorage(updatedUsers);
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.error = null;
      saveAuthState(state);
    },
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const users = getUsersFromStorage();
      const user = users.find(
        (u) => u.username === action.payload.username && u.password === action.payload.password,
      );
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = user;
        state.error = null;
      } else {
        state.isAuthenticated = false;
        state.currentUser = null;
        state.error = 'Invalid username or password.';
      }
      saveAuthState(state);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
      saveAuthState(state);
    },
    clearAuthError(state) {
      state.error = null;
      saveAuthState(state);
    },
  },
});

export const { register, login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
