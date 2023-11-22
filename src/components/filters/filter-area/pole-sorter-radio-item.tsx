import * as RadioGroup from "@radix-ui/react-radio-group";

type SortPolesByProps = {
  value: string;
  label: string;
};
export const PoleSorterItem = ({ value, label }: SortPolesByProps) => {
  return (
    <div className="flex items-center gap-2">
      <RadioGroup.Item
        className="h-3 w-3 cursor-pointer rounded-full border-[0.5px] border-solid border-radio-button"
        value={value}
        id={value}
      >
        <RadioGroup.Indicator className="relative block h-3 w-3 cursor-pointer rounded-full bg-radio-button" />
      </RadioGroup.Item>
      <label
        className="relative   w-max cursor-pointer text-xs font-semibold  text-primary-hard"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};
