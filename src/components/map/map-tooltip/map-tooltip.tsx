import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MapToolTipContainer = ({ children }: Props) => {
  return (
    <div className="w-full max-w-[188px] rounded border border-solid border-[rgba(91,91,91,0.50)] bg-white/90 shadow-tooltip">
      {children}
    </div>
  );
};
