import { create } from "zustand";

type AppliedFilterType = {
  filter: string | null;
  operator: string | null;
  value: string | null;
};

type FilterStoreType = {
  applied: AppliedFilterType[];

  applyFilter: (filterToApply: AppliedFilterType) => void;
};

const useFilterStore = create<FilterStoreType>((set) => ({
  applied: [],

  applyFilter: (payload) => {
    // For safe keeping
    console.log(payload);
    if (payload?.value?.length < 1) {
      console.log("YO DUDE");
      return;
    }

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
}));

export const useActiveFilter = () => useFilterStore((state) => state.applied);
export const useApplyFilter = () =>
  useFilterStore((state) => state.applyFilter);
