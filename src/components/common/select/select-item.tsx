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
        {/* {icon && <span className="inline-flex">{icon}</span>} */}
        {/* <span className="overflow-hidden text-ellipsis whitespace-nowrap"> */}
        {children}
        {/* </span> */}

        {/* <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center"> */}
        {/* CHECK ICON HERE */}
        {/* </Select.ItemIndicator> */}
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default SelectItem;
