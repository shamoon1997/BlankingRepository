import { create } from "zustand";

type FilterStoreType<T> = {
  metricDeviceFilter: string;
  mapControl: string;
  selectedMetrics: T[]; // Since we're not sure what to store in the selected yet
  actions: {
    applyMetricDeviceFilterType: (val: string) => void;
  };
};

const useMetricDataStore = create<FilterStoreType<unknown>>((set) => ({
  metricDeviceFilter: "",
  mapControl: "",
  selectedMetrics: [
    { name: "GS124• 4024 • Lora" },
    { name: "GS124• 4024 • Cellular" },
    { name: "GS124• 4024 • Network" },
  ],

  actions: {
    applyMetricDeviceFilterType: (val) => {
      set((state) => ({ ...state, metricDeviceFilter: val }));
    },
  },
}));

export const useMetricDataState = () => useMetricDataStore((state) => state);
export const useMetricDataActions = () =>
  useMetricDataStore((state) => state.actions);
