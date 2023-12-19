import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  backgroundColor?: string;
  className?: string;
};

const Button: React.FC<Props> = ({ text, className }: Props) => {
  return (
    <button className={className}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
