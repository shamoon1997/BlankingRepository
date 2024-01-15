import { create } from "zustand";

type SelectedMetricType = { name: string; id: string };

type FilterStoreType = {
  metricDeviceFilter: string;
  mapControl: string;
  selectedMetrics: SelectedMetricType[]; // Since we're not sure what to store in the selected yet
  actions: {
    applyMetricDeviceFilterType: (val: string) => void;
    removeFromSelected: (id: string) => void;
    addToSelected: (metric: SelectedMetricType) => void;
  };
};

const useMetricDataStore = create<FilterStoreType>((set, get) => ({
  metricDeviceFilter: "",
  mapControl: "",
  selectedMetrics: [
    { id: "1", name: "GS124• 4024 • Lora" },
    { id: "2", name: "GS124• 4024 • Cellular" },
    { id: "3", name: "GS124• 4024 • Network" },
  ],

  actions: {
    applyMetricDeviceFilterType: (val) => {
      set((state) => ({ ...state, metricDeviceFilter: val }));
    },

    removeFromSelected: (id) => {
      const filteredList = get().selectedMetrics.filter(
        (item) => item?.id !== id,
      );
      set((state) => ({ ...state, selectedMetrics: filteredList }));
    },

    addToSelected: ({ name, id }: SelectedMetricType) => {
      const withDeviceAdded = [...get().selectedMetrics];
      withDeviceAdded.push({ name, id });
      set((state) => ({ ...state, selectedMetrics: withDeviceAdded }));
    },
  },
}));

export const useMetricDataState = () => useMetricDataStore((state) => state);
export const useMetricDataActions = () =>
  useMetricDataStore((state) => state.actions);
