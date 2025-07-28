import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from '../types';

interface MenuState {
  items: MenuItem[];
  categories: string[];
}

const loadMenuState = (): MenuState => {
  try {
    const data = localStorage.getItem('menuState');
    if (data) return JSON.parse(data);
  } catch {}
  return { items: [], categories: [] };
};

const saveMenuState = (state: MenuState) => {
  localStorage.setItem('menuState', JSON.stringify(state));
};

const initialState: MenuState = loadMenuState();

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addMenuItem(state, action: PayloadAction<MenuItem>) {
      state.items.push(action.payload);
      if (!state.categories.includes(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
      saveMenuState(state);
    },
    editMenuItem(state, action: PayloadAction<MenuItem>) {
      const idx = state.items.findIndex((item) => item.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
        if (!state.categories.includes(action.payload.category)) {
          state.categories.push(action.payload.category);
        }
        saveMenuState(state);
      }
    },
    deleteMenuItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveMenuState(state);
    },
    addCategory(state, action: PayloadAction<string>) {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
        saveMenuState(state);
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((cat) => cat !== action.payload);
      state.items = state.items.map((item) =>
        item.category === action.payload ? { ...item, category: '' } : item,
      );
      saveMenuState(state);
    },
    loadMenuFromStorage(state) {
      const loaded = loadMenuState();
      state.items = loaded.items;
      state.categories = loaded.categories;
    },
  },
});

export const {
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
  addCategory,
  deleteCategory,
  loadMenuFromStorage,
} = menuSlice.actions;
export default menuSlice.reducer;
