import { create } from "zustand";

type FilterStoreType<T> = {
  deviceTypeFilter: string;
  mapControl: string | number;
  selectedItems: T[]; // Since we're not sure what to store in the selected yet
  actions: {
    applyDeviceFilterType: (val: string) => void;
  };
};

const useDeviceDataStore = create<FilterStoreType<unknown>>((set) => ({
  deviceTypeFilter: "",
  mapControl: "",
  selectedItems: [],

  actions: {
    applyDeviceFilterType: (val) => {
      set((state) => ({ ...state, deviceTypeFilter: val }));
    },
  },
}));

export const useDeviceDataState = () => useDeviceDataStore((state) => state);
export const useDeviceDataActions = () =>
  useDeviceDataStore((state) => state.actions);
