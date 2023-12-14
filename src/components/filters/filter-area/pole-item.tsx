import { useState } from "react";
import { PoleViewButton } from "./pole-view-button";
import { Device } from "@/api/types/types";

type Props = {
  device: Device;
};

export const PoleItem: React.FC<Props> = ({ device }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const { device_sn } = device;

  return (
    <div
      className={`flex h-10 cursor-pointer items-center justify-between pl-4 pr-4 ${
        selected ? "border-[0.3px] border-y-[#DFDFDF] bg-[#F2F2F2]" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      <p className="text-xs font-semibold text-primary">{device_sn}</p>

      <PoleViewButton onClick={(e) => e.stopPropagation()} />
    </div>
  );
};
