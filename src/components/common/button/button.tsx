import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  backgroundColor?: string;
  className?: string;
};

// TODO: fix this component
const Button: React.FC<Props> = ({ text, className, ...rest }: Props) => {
  return (
    <button {...rest} className={className}>
      <p>{text}</p>
    </button>
  );
};

export default Button;
