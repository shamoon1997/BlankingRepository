import React from "react";

type MapStatusContainerProps = {
  children: React.ReactNode;
};

function MiniMapStatusContainer({ children }: MapStatusContainerProps) {
  return (
    <div className="absolute bottom-[8px] right-[8px] z-[10] flex flex-col items-end">
      {children}
    </div>
  );
}

export default MiniMapStatusContainer;
