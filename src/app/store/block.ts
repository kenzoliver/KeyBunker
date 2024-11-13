import { create } from "zustand";

type Block = {
  free: boolean;
  setBlock: (isFree: boolean) => void;
};

export const useBlock = create<Block>((set) => ({
  free: false,

  setBlock: (isFree: boolean) => set(() => ({ free: isFree })),
}));
