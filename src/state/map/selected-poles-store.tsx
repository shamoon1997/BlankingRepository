import { create } from "zustand";

type PoleContextStore = {
  poleIds: string[];
  actions: {
    setPoleIds: (poleIds: string[]) => void;
  };
};

const useSelectedPolesStore = create<PoleContextStore>((set) => ({
  poleIds: [],
  actions: {
    setPoleIds: (poleIds) => set({ poleIds }),
  },
}));

// separate hooks for data
export const useSelectedPoles = () => {
  return useSelectedPolesStore((state) => state.poleIds);
};

// separate hook for actions related to the data
export const useSelectedPolesActions = () => {
  return useSelectedPolesStore((state) => state.actions);
};
