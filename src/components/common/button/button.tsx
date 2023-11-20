import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  backgroundColor?: string;
};

const Button: React.FC<Props> = ({
  text,
  backgroundColor,
  color,
  onClick,
  type,
}: Props) => {
  return (
    <button
      className="h-full w-full cursor-pointer rounded-md border border-slate-400"
      style={{ backgroundColor, color }}
      onClick={onClick}
      type={type}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
