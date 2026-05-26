import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSession {
  id: string;
  email: string;
  name: string;
  role: "SUPERADMIN" | "ADMIN" | "OPERATOR" | "AUDITOR";
}

interface AuthState {
  user: UserSession | null;
  token: string | null;
  setSession: (user: UserSession, token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      clearSession: () => set({ user: null, token: null }),
    }),
    { name: "rayanx-auth-engine" }
  )
);
