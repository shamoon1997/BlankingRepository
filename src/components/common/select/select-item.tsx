import React, { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      value,
      icon,
      ...props
    }: {
      value: string;
      children: ReactNode;
      icon?: ReactNode;
      className?: string | undefined;
      disabled?: boolean;
    },
    forwardedRef?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Select.Item
        className={
          className ??
          "data-[disabled]:text-mauve8 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-slate-600 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet-900 data-[highlighted]:text-white data-[highlighted]:outline-none"
        }
        {...props}
        value={value}
        ref={forwardedRef}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
          {/* CHECK ICON HERE */}
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

SelectItem.displayName = "SelectItem";

export default SelectItem;
