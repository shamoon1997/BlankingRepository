import { useState } from "react";
import { PoleViewButton } from "./pole-view-button";

export const PoleItem = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div
      className={`flex h-10 cursor-pointer items-center justify-between pl-4 pr-4 ${
        selected ? "border-[0.3px] border-y-[#DFDFDF] bg-[#F2F2F2]" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      <p className="text-xs font-semibold text-primary">1535142 • GS1245</p>
      <PoleViewButton />
    </div>
  );
};
