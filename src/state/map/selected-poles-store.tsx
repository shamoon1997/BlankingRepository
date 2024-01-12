import { mapIconColors } from "@/utils/styleguide";
import { create } from "zustand";

const MAX_POLES = 3;
export type SelectedPoleType = {
  selectedPoleHardwareId: string;
  isMinimized: boolean;
  // minimal information needed to make selecting a pole view work without relying on data from backend
  deviceSerialNumber: string;
  assignedColor: string;
};

type SelectedPolesStoreType = {
  selectedPoles: SelectedPoleType[];
  colorsList: string[];
  actions: {
    setSelectedPoleIds: (poles: SelectedPoleType[]) => void;
    checkIfPoleIsSelected: (hardwareId: string) => SelectedPoleType | undefined;
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
  colorsList: [...mapIconColors],
  actions: {
    setSelectedPoleIds: (selectedPoles) => set({ selectedPoles }),
    checkIfPoleIsSelected: (hardwareId) => {
      return get().selectedPoles.find(
        (selectedPoleId) =>
          selectedPoleId.selectedPoleHardwareId === hardwareId,
      );
    },
    toggleAddSelectedPole: ({ hardwareId, deviceSerialNumber }) => {
      const selectedPoles = get().selectedPoles;

      if (selectedPoles.length === 0) set({ colorsList: [...mapIconColors] });

      const checkIfPoleIsSelected = get().actions.checkIfPoleIsSelected;

      // allowing only three poles to be clicked
      if (!checkIfPoleIsSelected(hardwareId)) {
        if (selectedPoles.length < MAX_POLES) {
          const updatedList = [...get().colorsList];
          const colorGiven = updatedList.shift();
          if (colorGiven) updatedList.push(colorGiven);

          set({
            selectedPoles: [
              ...selectedPoles,
              {
                selectedPoleHardwareId: hardwareId,
                isMinimized: false,
                deviceSerialNumber: deviceSerialNumber,
                assignedColor: colorGiven ?? "",
              },
            ],
            colorsList: updatedList,
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
