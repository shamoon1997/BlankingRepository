import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MapToolTipContainer = ({ children }: Props) => {
  return (
    <div className="absolute h-[238px] w-[188px] rounded border-[0.5px] border-solid border-[rgba(91,91,91,0.50)] bg-white bg-opacity-90 pb-3 pl-2 pr-2 pt-3 shadow-tooltip">
      {children}
    </div>
  );
};
