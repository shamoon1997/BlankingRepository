import { create } from "zustand";

type selectedPhotoType = {
  photo_url: string;
  recorded_at: string;
};

type PoleContextStore = {
  SelectedPhotos: selectedPhotoType[];
  actions: {
    setSelectedPhotos: (photos: selectedPhotoType[]) => void;
  };
};

const useSelectedPhotosStore = create<PoleContextStore>((set) => ({
  SelectedPhotos: [],
  actions: {
    setSelectedPhotos: (SelectedPhotos) => set({ SelectedPhotos }),
  },
}));

// separate hooks for data
export const useSelectedPhotos = () => {
  return useSelectedPhotosStore((state) => state.SelectedPhotos);
};

// separate hook for actions related to the data
export const useSelectedPhotosActions = () => {
  return useSelectedPhotosStore((state) => state.actions);
};
