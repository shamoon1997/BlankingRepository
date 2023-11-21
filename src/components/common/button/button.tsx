import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  backgroundColor?: string;
  className?: string;
};

const Button: React.FC<Props> = ({ text, type, className }: Props) => {
  return (
    <button className={className} type={type}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
