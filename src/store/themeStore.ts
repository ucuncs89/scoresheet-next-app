import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggleColorMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

// Simplified version without persist middleware for now
export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  toggleColorMode: () => set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setMode: (mode: ThemeMode) => set({ mode }),
}));