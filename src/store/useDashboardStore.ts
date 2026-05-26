import { create } from 'zustand';

interface DashboardState {
  pin: string | null;
  status: 'online' | 'offline';
  setPin: (pin: string) => void;
  setStatus: (status: 'online' | 'offline') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  pin: null,
  status: 'offline',
  setPin: (pin) => set({ pin }),
  setStatus: (status) => set({ status }),
}));
