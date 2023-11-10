import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  backgroundColor?: string;
};

const Button: React.FC<Props> = ({
  text,
  backgroundColor,
  onClick,
  type,
}: Props) => {
  return (
    <button
      className="w-full h-full cursor-pointer border border-slate-400 rounded-md"
      style={{ backgroundColor }}
      onClick={onClick}
      type={type}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;
