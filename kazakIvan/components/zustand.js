import { create } from "zustand";

export const useTasksStore = create((set) => ({
  randomNumber: 1, // Изначальное значение
  setRandomNumber: (number) => set({ randomNumber: number }),
}));