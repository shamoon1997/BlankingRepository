import * as RadioGroup from "@radix-ui/react-radio-group";

type SortPolesByProps = {
  value: string;
  label: string;
};
export const PoleSorterItem = ({ value, label }: SortPolesByProps) => {
  return (
    <div className="flex items-center gap-2">
      <RadioGroup.Item
        className="border-radio-button h-3 w-3 cursor-pointer rounded-full border-[0.5px] border-solid"
        value={value}
        id={value}
      >
        <RadioGroup.Indicator className="bg-radio-button relative block h-3 w-3 cursor-pointer rounded-full" />
      </RadioGroup.Item>
      <label
        className="text-primary-hard   relative w-max cursor-pointer text-xs  font-semibold"
        htmlFor={value}
      >
        {label}
      </label>
    </div>
  );
};
