import { create } from "zustand";

type StoreType = {
  dates: number[];
  deviceFilter: string;
  graphControl: string;
  startTime: string;
  endTime: string;
  currentTab: string;

  actions: {
    setDates: (val: number[]) => void;
    setDeviceFilter: (val: string) => void;
    setGraphControl: (val: string) => void;
    setTime: (val: string, type: "start" | "end") => void;
    setCurrentTab: (val: string) => void;
  };
};

export const useDeviceDataControlsStore = create<StoreType>(
  (set /* get */) => ({
    currentTab: "metric",
    dates: [],
    deviceFilter: "",
    graphControl: "",
    startTime: "00:00",
    endTime: "23:59",

    actions: {
      setDates: (val) => set({ dates: val }),
      setDeviceFilter: (val) => set({ deviceFilter: val }),
      setGraphControl: (val) => set({ graphControl: val }),
      setCurrentTab: (val) => set({ currentTab: val }),
      setTime: (val, type) => {
        if (type === "start") set({ startTime: val });
        if (type === "end") set({ endTime: val });
      },
    },
  }),
);

export const useDeviceDataControlState = () =>
  useDeviceDataControlsStore((state) => state);

export const useDeviceDataControlActions = () =>
  useDeviceDataControlsStore((state) => state.actions);
