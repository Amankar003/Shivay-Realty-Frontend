// UI state store — global UI state management

import { create } from "zustand";

interface UIState {
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  isLoading: boolean;
  hasPlayedHeroAnimation: boolean;

  // Actions
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setScrolled: (scrolled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setHasPlayedHeroAnimation: (played: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isScrolled: false,
  isLoading: false,
  hasPlayedHeroAnimation: false,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
  setLoading: (loading) => set({ isLoading: loading }),
  setHasPlayedHeroAnimation: (played) => set({ hasPlayedHeroAnimation: played }),
}));
