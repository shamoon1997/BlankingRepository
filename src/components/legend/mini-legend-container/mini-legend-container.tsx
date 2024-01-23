import React from "react";

type LegendContainerProps = {
  children: React.ReactNode;
};

function MiniLegendContainer({ children }: LegendContainerProps) {
  return (
    <div className="absolute bottom-[8px] right-[8px] z-[10] rounded border-[0.5px] border-solid  border-default bg-white shadow-tooltip">
      {children}
    </div>
  );
}

export default MiniLegendContainer;
