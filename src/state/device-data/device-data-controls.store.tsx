import { create } from "zustand";

type StoreType = {
  dates: number[];
  deviceFilter: string;
  graphControl: string;

  actions: {
    setDates: (val: number[]) => void;
    setDeviceFilter: (val: string) => void;
    setGraphControl: (val: string) => void;
  };
};

const useDeviceDataControlsStore = create<StoreType>((set /* get */) => ({
  dates: [],
  deviceFilter: "",
  graphControl: "",

  actions: {
    setDates: (val) => set({ dates: val }),
    setDeviceFilter: (val) => set({ deviceFilter: val }),
    setGraphControl: (val) => set({ graphControl: val }),
  },
}));

export const useDeviceDataControlState = () =>
  useDeviceDataControlsStore((state) => state);

export const useDeviceDataControlActions = () =>
  useDeviceDataControlsStore((state) => state.actions);
