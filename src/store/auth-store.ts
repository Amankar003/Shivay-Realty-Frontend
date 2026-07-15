// Auth state store for admin authentication

import { create } from "zustand";
import type { Admin } from "@/types";

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;

  // Actions
  setAdmin: (admin: Admin) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isAuthenticated: false,

  setAdmin: (admin) => set({ admin, isAuthenticated: true }),
  logout: () => set({ admin: null, isAuthenticated: false }),
}));
