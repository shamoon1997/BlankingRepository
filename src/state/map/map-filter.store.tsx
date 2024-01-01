import { create } from "zustand";

export type AppliedFilterType = {
  filter: string;
  operator: string;
  value: string | number;
};

type FilterStoreType = {
  appliedFilters: AppliedFilterType[];
  actions: {
    applyFilter: (filterToApply: AppliedFilterType) => void;
    removeFilter: (index: number) => void;
  };
};

const useFilterStore = create<FilterStoreType>((set) => ({
  appliedFilters: [],
  actions: {
    applyFilter: (payload) => {
      if (payload?.value?.toString().length < 1) return;

      set((state) => {
        if (state.appliedFilters.length < 1)
          return { appliedFilters: [payload] };

        // Replaces operator if a filter exists
        const finalList = state.appliedFilters.map((list) => {
          if (list.filter === payload.filter) return payload;
          return list;
        });

        // checks if a filter exists
        const filterExists = finalList.find(
          (item) => item.filter === payload.filter,
        );

        // If no filter then we add to the final list
        if (!filterExists) finalList.push(payload);

        return { appliedFilters: finalList };
      });
    },

    removeFilter: (payload) => {
      set((state) => {
        const softCopy = [...state.appliedFilters];
        softCopy.splice(payload, 1);
        return { appliedFilters: softCopy };
      });
    },
  },
}));

export const useActiveFilter = () =>
  useFilterStore((state) => state.appliedFilters);
export const useFilterActions = () => useFilterStore((state) => state.actions);
