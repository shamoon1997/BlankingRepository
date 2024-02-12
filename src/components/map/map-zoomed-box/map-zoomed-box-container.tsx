import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MapZoomedBoxContainer = ({ children }: Props) => {
  return (
    <div className="absolute bottom-[-50px] left-[26px] rounded-sm bg-black  bg-map-zoomed-box p-[6px] text-white shadow-zoomed-box">
      {children}
    </div>
  );
};
