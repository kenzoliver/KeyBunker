import { create } from "zustand";
import { Appearance } from "react-native";

type Colors = {
  background: string;
  background_reverse: string;

  setTheme: () => void;
};

export const useColors = create<Colors>((set) => ({
  background: Appearance.getColorScheme() === "dark" ? "#1C1C1C" : "#F5F5F5", 
  background_reverse: Appearance.getColorScheme() === "dark" ? "#F5F5F5" : "#1C1C1C", 

  setTheme: () =>
    set((state) => ({
      background: state.background_reverse,
      background_reverse: state.background,
    })),
}));
