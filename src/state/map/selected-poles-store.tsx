import { create } from "zustand";

const MAX_POLES = 3;
export type SelectedPoleType = {
  selectedPoleHardwareId: string;
  isMinimized: boolean;
  // minimal information needed to make selecting a pole view work without relying on data from backend
  deviceSerialNumber: string;
};

type SelectedPolesStoreType = {
  selectedPoles: SelectedPoleType[];
  actions: {
    setSelectedPoleIds: (poles: SelectedPoleType[]) => void;
    checkIfPoleIsSelected: (hardwareId: string) => boolean;
    toggleAddSelectedPole: ({
      hardwareId,
      deviceSerialNumber,
    }: {
      hardwareId: string;
      deviceSerialNumber: string;
    }) => void;
  };
};

const useSelectedPolesStore = create<SelectedPolesStoreType>((set, get) => ({
  selectedPoles: [],
  actions: {
    setSelectedPoleIds: (selectedPoles) => set({ selectedPoles }),
    checkIfPoleIsSelected: (hardwareId) => {
      return Boolean(
        get().selectedPoles.find(
          (selectedPoleId) =>
            selectedPoleId.selectedPoleHardwareId === hardwareId,
        ),
      );
    },
    toggleAddSelectedPole: ({ hardwareId, deviceSerialNumber }) => {
      const selectedPoles = get().selectedPoles;
      const checkIfPoleIsSelected = get().actions.checkIfPoleIsSelected;

      // allowing only three poles to be clicked
      if (!checkIfPoleIsSelected(hardwareId)) {
        if (selectedPoles.length < MAX_POLES) {
          set({
            selectedPoles: [
              ...selectedPoles,
              {
                selectedPoleHardwareId: hardwareId,
                isMinimized: false,
                deviceSerialNumber: deviceSerialNumber,
              },
            ],
          });
        }
      } else {
        // its selected then we remove it hence the name toggleAddSelectedPole
        set({
          selectedPoles: selectedPoles.filter((pole) => {
            return pole.selectedPoleHardwareId !== hardwareId;
          }),
        });
      }
    },
  },
}));

// separate hooks for data
export const useSelectedPoles = () => {
  return useSelectedPolesStore((state) => state.selectedPoles);
};

// separate hook for actions related to the data
export const useSelectedPolesActions = () => {
  return useSelectedPolesStore((state) => state.actions);
};
