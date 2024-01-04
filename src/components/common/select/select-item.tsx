import React, { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      ...props
    }: {
      value: string;
      children: ReactNode;
      className?: string | undefined;
      disabled?: boolean;
    },
    forwardedRef?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Item
        className={className}
        {...props}
        value={value}
        ref={forwardedRef}
      >
        {children}
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default SelectItem;
