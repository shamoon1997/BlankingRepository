import { create } from "zustand";

type SelectedPoleIdType = {
  selectedPoleId: string;
  isMinimized: boolean;
};

type PoleContextStore = {
  SelectedPoleIds: SelectedPoleIdType[];
  actions: {
    setSelectedPoleIds: (poleIds: SelectedPoleIdType[]) => void;
  };
};

const useSelectedPolesStore = create<PoleContextStore>((set) => ({
  SelectedPoleIds: [],
  actions: {
    setSelectedPoleIds: (SelectedPoleIds) => set({ SelectedPoleIds }),
  },
}));

// separate hooks for data
export const useSelectedPoles = () => {
  return useSelectedPolesStore((state) => state.SelectedPoleIds);
};

// separate hook for actions related to the data
export const useSelectedPolesActions = () => {
  return useSelectedPolesStore((state) => state.actions);
};
