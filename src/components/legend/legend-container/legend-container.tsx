import React from "react";

type LegendContainerProps = {
  children: React.ReactNode;
};

function LegendContainer({ children }: LegendContainerProps) {
  return (
    <div className="absolute bottom-[15px] right-[15px] rounded border-[0.5px] border-solid  border-default bg-white shadow-tooltip">
      {children}
    </div>
  );
}

export default LegendContainer;
