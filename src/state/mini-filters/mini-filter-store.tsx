import { create } from "zustand";

type MiniFilterSearchStoreType = {
  searchText: string;
  actions: {
    setSearch: (value: string) => void;
  };
};

const useMiniFilterSearchStore = create<MiniFilterSearchStoreType>((set) => {
  return {
    searchText: "",
    actions: {
      setSearch: (searchValue) => {
        set({
          searchText: searchValue,
        });
      },
    },
  };
});

export const useMiniFilterSearchValue = () => {
  return useMiniFilterSearchStore((state) => state.searchText);
};

// separate hook for actions related to the data
export const useMiniFilterSearchActions = () => {
  return useMiniFilterSearchStore((state) => state.actions);
};
