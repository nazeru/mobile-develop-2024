import { create } from 'zustand';

export const useClicksStore = create((set) => ({
  clicks: 0,
  incrementClicks: () => set((state) => ({ clicks: state.clicks + 1 })),
}));
