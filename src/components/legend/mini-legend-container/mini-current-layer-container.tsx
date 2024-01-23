import React from "react";

type LegendContainerProps = {
  children: React.ReactNode;
};

function MiniCurrentLayerContainer({ children }: LegendContainerProps) {
  return (
    <div className="shadow-mini-containers absolute left-[8px] top-[8px] z-[10] rounded bg-white">
      {children}
    </div>
  );
}

export default MiniCurrentLayerContainer;
