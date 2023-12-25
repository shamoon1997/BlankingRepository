import { useRef } from "react";

type Props = {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};

export const FilterInputControl: React.FC<Props> = ({ setValue }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex justify-between text-xs font-semibold">
      <p className="w-1/2 text-primary-hard">Value</p>
      <input
        className="w-1/2 text-primary outline-none"
        placeholder="Enter a value"
        ref={ref}
        onChange={() => {
          if (setValue && ref.current?.value) {
            setValue && setValue(ref.current?.value);
          }
        }}
      />
    </div>
  );
};
