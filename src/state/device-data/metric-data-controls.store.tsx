import { mapIconColors } from "@/utils/styleguide";
import { create } from "zustand";

type SelectedMetricType = { name: string; id: string; assignedColor?: string };

type FilterStoreType = {
  colorsList: string[];
  readyForExfil: SelectedMetricType[]; // Since we're not sure what to store in the selected yet
  selectedMetrics: SelectedMetricType[]; // Since we're not sure what to store in the selected yet
  actions: {
    removeFromSelected: (id: string) => void;
    addToSelected: (metric: SelectedMetricType) => void;
    toggleReadyForExfil: (item: SelectedMetricType) => void;
  };
};

const shiftLeft = (arr: string[]): string[] => {
  const colorArrayShift = [...arr];
  const popped = colorArrayShift.shift();
  if (popped) colorArrayShift.push(popped);

  return colorArrayShift;
};

const spliceAndUnshift = (arr: string[], colorToSplice?: string): string[] => {
  const colorIndex = arr.indexOf(colorToSplice ?? "");
  arr.splice(colorIndex, 1);
  if (colorToSplice) arr.unshift(colorToSplice);

  return arr;
};

const MAX_DEVICES = 3;
const useMetricDataStore = create<FilterStoreType>((set, get) => ({
  colorsList: [...mapIconColors],

  selectedMetrics: [],

  readyForExfil: [
    { id: "3", name: "GS456• 4024 • Network", assignedColor: mapIconColors[3] },
  ],

  actions: {
    removeFromSelected: (id) => {
      //
      const itemToRemove = get().selectedMetrics.find(
        (item) => item?.id !== id,
      );

      const filteredList = get().selectedMetrics.filter(
        (item) => item?.id !== id,
      );

      // COLORS SETUP ==================================
      if (itemToRemove) {
        const colorsArrShift = spliceAndUnshift([...get().colorsList]);
        set((state) => ({ ...state, colorsList: colorsArrShift }));
      }
      // ===============================================

      set((state) => ({ ...state, selectedMetrics: filteredList }));

      // RESET COLOR ARR IF NO DEVICE SELECTED ====================
      if (get().selectedMetrics.length === 0)
        set((state) => ({ ...state, colorsList: mapIconColors }));
      // ==========================================================
    },

    addToSelected: ({ name, id }: SelectedMetricType) => {
      if (get().selectedMetrics.length === MAX_DEVICES) return;

      const withDeviceAdded = [...get().selectedMetrics];
      withDeviceAdded.push({ name, id, assignedColor: get().colorsList[0] });
      set((state) => ({ ...state, selectedMetrics: withDeviceAdded }));

      // SETS COLORS ==================================
      const colorArrayShift = shiftLeft([...get().colorsList]);
      set((state) => ({ ...state, colorsList: colorArrayShift }));
      // ==============================================
    },

    toggleReadyForExfil: (item) => {
      const device = get().readyForExfil.find(
        (selected) => selected.id === item.id,
      );

      if (device) {
        const filtered = get().readyForExfil.filter(
          (selected) => selected.id !== item.id,
        );
        set({ readyForExfil: filtered });
      }
      if (!device) {
        const added = [...get().readyForExfil];
        added.push(item);
        set({ readyForExfil: added });
      }

      return;
    },
  },
}));

export const useMetricDataState = () => useMetricDataStore((state) => state);
export const useMetricDataActions = () =>
  useMetricDataStore((state) => state.actions);
