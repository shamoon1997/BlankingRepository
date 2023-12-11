import React from "react";

type LegendContainerProps = {
  children: React.ReactNode;
};

function LegendContainer({ children }: LegendContainerProps) {
  return (
    <div className="absolute bottom-[15px] right-[15px] flex flex-col gap-2.5  rounded border-[0.5px] border-solid  border-default bg-white  p-[12px] text-[12px] shadow-tooltip">
      {children}
    </div>
  );
}

export default LegendContainer;
