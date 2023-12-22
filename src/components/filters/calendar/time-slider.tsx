import * as Slider from "@radix-ui/react-slider";

import format from "date-fns/format";

export const maxRange = 24 * 60 * 60;

type TimeSliderProps = {
  min: number;
  max: number;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
};
export const TimeSlider = ({
  values,
  setValues,
  min,
  max,
}: TimeSliderProps) => {
  const currentRange = values[1] - values[0];

  return (
    <>
      <p className="mb-[5px] text-center text-[11px] font-semibold text-primary-blue">
        Time Selector{" "}
      </p>
      <div className="flex items-center justify-between text-center text-[11px] font-semibold text-btn-primary">
        <p>{format(values[0] * 1000, "MM/dd/yyyy hh:mm a")}</p>
        <div className="h-[1px] w-[5px] bg-black" />
        <p>{format(values[1] * 1000, "MM/dd/yyyy hh:mm a")}</p>
      </div>

      <Slider.Root
        onValueChange={(values) => {
          const newValues = values.slice();
          setValues(newValues);
        }}
        min={min}
        max={max}
        value={values}
        step={60}
        minStepsBetweenThumbs={60 * 2}
        className="relative flex h-[28px] w-full touch-none select-none items-center rounded border-[0.5px] border-solid border-[#D9D9D9] bg-white"
      >
        <Slider.Track>
          <Slider.Range
            className={`absolute  top-0  h-[27px]  rounded-[3px] border-b-[1px] border-t-[1px] ${
              currentRange > maxRange ? "border-gray-600" : "border-btn-primary"
            }  ${
              currentRange > maxRange
                ? "bg-gray-500 bg-opacity-50"
                : "bg-[#F11F1F80]"
            }`}
          />
        </Slider.Track>
        <Slider.Thumb
          className={`flex h-[27px] w-3 cursor-grab items-center justify-center gap-[2px] rounded-bl-[3px] rounded-tl-[3px]  ${
            currentRange > maxRange ? "bg-gray-600" : "bg-btn-primary"
          }`}
        >
          <div className="h-[10px] w-[1px] bg-white" />
          <div className="h-[10px] w-[1px] bg-white" />
        </Slider.Thumb>
        <Slider.Thumb
          className={`flex h-[27px] w-3  cursor-grab items-center justify-center gap-[2px] rounded-br-[3px] rounded-tr-[3px]  ${
            currentRange > maxRange ? "bg-gray-600" : "bg-btn-primary"
          }`}
        >
          <div className="h-[10px] w-[1px] bg-white" />
          <div className="h-[10px] w-[1px] bg-white" />
        </Slider.Thumb>
      </Slider.Root>
    </>
  );
};
