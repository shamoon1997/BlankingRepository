import { useRef } from "react";

type Props = {
  setValue?: React.Dispatch<React.SetStateAction<string>>;
};

// eslint-disable-next-line react/prop-types
export const FilterInputControl: React.FC<Props> = ({ setValue }) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (setValue && ref.current?.value) {
          setValue && setValue(ref.current?.value);
        }
      }}
    >
      <div className="flex justify-between text-xs font-semibold">
        <p className="w-1/2 text-primary-hard">Value</p>
        <input
          ref={ref}
          className="w-1/2 text-primary outline-none"
          placeholder="Enter a value"
        />
      </div>
    </form>
  );
};
