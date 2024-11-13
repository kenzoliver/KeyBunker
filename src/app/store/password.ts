import { create } from "zustand";

type SimpleStore = {
  value: boolean;
  setValue: () => void;
};

export const useSimpleStore = create<SimpleStore>((set) => ({
  value: true,

  setValue: () => set((state) => ({ value: !state.value })),
}));