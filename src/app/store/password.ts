import { create } from "zustand";

type SimpleStore = {
  value: string;
  setValue: (newValue: string) => void;
};

export const useSimpleStore = create<SimpleStore>((set) => ({
  value: "",

  setValue: (newValue) => set({ value: newValue }),
}));