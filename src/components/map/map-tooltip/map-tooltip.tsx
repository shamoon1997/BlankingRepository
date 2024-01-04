import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const MapToolTipContainer = ({ children, className }: Props) => {
  return (
    <div
      className={`absolute rounded-[6px] border-[0.5px] border-solid border-[rgba(91,91,91,0.50)] bg-white/90 shadow-tooltip ${className}`}
    >
      {children}
    </div>
  );
};
