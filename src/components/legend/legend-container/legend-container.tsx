import React from "react";

type LegendContainerProps = {
  children: React.ReactNode;
  width?: number;
};

function LegendContainer({ children, width = 270 }: LegendContainerProps) {
  return (
    <div
      style={{ width }}
      className="absolute bottom-[15px] right-[15px] flex rounded border-[0.5px] border-solid  border-default bg-white shadow-tooltip"
    >
      {children}
    </div>
  );
}

export default LegendContainer;
