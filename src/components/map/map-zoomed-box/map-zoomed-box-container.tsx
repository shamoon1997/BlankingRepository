import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MapZoomedBoxContainer = ({ children }: Props) => {
  return (
    <div className="bg-map-zoomed-box shadow-zoomed-box absolute bottom-[-33px] left-[24px]  rounded-sm bg-black p-[6px] text-white">
      {children}
    </div>
  );
};
