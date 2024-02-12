import React from "react";

type MapStatusContainerProps = {
  children: React.ReactNode;
};

function MapStatusContainer({ children }: MapStatusContainerProps) {
  return (
    <div className="absolute bottom-[15px] right-[15px] flex flex-col items-end">
      {children}
    </div>
  );
}

export default MapStatusContainer;
