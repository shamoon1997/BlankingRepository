import { create } from "zustand";

export type AppliedFilterType = {
  filter: string;
  operator: string;
  value: string | number;
};

type FilterStoreType = {
  applied: AppliedFilterType[];
  actions: {
    applyFilter: (filterToApply: AppliedFilterType) => void;
    removeFilter: (index: number) => void;
  };
};

const useFilterStore = create<FilterStoreType>((set) => ({
  applied: [],
  actions: {
    applyFilter: (payload) => {
      if (payload?.value?.toString().length < 1) return;

      set((state) => {
        if (state.applied.length < 1) return { applied: [payload] };

        // Replaces operator if a filter exists
        const finalList = state.applied.map((list) => {
          if (list.filter === payload.filter) return payload;
          return list;
        });

        // checks if a filter exists
        const filterExists = finalList.find(
          (item) => item.filter === payload.filter,
        );

        // If no filter then we add to the final list
        if (!filterExists) finalList.push(payload);

        return { applied: finalList };
      });
    },

    removeFilter: (payload) => {
      set((state) => {
        const softCopy = [...state.applied];
        softCopy.splice(payload, 1);
        return { applied: softCopy };
      });
    },
  },
}));

export const useActiveFilter = () => useFilterStore((state) => state.applied);
export const useApplyFilter = () =>
  useFilterStore((state) => state.actions.applyFilter);

export const useRemoveFilter = () =>
  useFilterStore((state) => state.actions.removeFilter);
