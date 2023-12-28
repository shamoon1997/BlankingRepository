import { FilterSelectItemProps } from "@/utils/filters";
import { ItemText, SelectItem } from "@radix-ui/react-select";

export const FilterSelectItem = ({ value, label }: FilterSelectItemProps) => {
  return (
    <SelectItem
      value={value}
      className="w-[var(--radix-select-trigger-width)] cursor-pointer rounded p-[6px] capitalize hover:bg-[#F2F2F2]"
    >
      <ItemText>{label}</ItemText>
    </SelectItem>
  );
};
