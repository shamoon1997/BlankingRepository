import * as Slider from "@radix-ui/react-slider";

import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { useCalendarTimeZone } from "@/state";

// in seconds
export const MAX_RANGE = 24 * 60 * 60;
const MIN_STEPS_BETWEEN_THUMBS = 60 * 5; // minutes
const STEP = 1;

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
  const timeZone = useCalendarTimeZone();

  return (
    <>
      <p className="mb-[5px] text-center text-[11px] font-semibold text-primary-blue">
        Time Selector{" "}
      </p>
      <div className="flex items-center justify-between text-center text-[11px] font-semibold text-btn-primary">
        <p>
          {formatInTimeZone(
            values[0] * 1000,
            timeZone,
            "MM/dd/yyyy hh:mm a zzz",
            {
              locale: enUS,
            },
          )}
        </p>
        <div className="h-[1px] w-[5px] bg-black" />
        <p>
          {formatInTimeZone(
            values[1] * 1000,
            timeZone,
            "MM/dd/yyyy hh:mm a zzz",
            {
              locale: enUS,
            },
          )}
        </p>
      </div>

      <Slider.Root
        onValueChange={(values) => {
          const newValues = values.slice();
          setValues(newValues);
        }}
        min={min}
        max={max}
        value={values}
        step={STEP}
        minStepsBetweenThumbs={MIN_STEPS_BETWEEN_THUMBS}
        className="relative flex h-[28px] w-full touch-none select-none items-center rounded border-[0.5px] border-solid border-[#D9D9D9] bg-white"
      >
        <Slider.Track>
          <Slider.Range
            className={`absolute  top-0  h-[27px]  rounded-[3px] border-b-[1px] border-t-[1px] ${
              currentRange > MAX_RANGE
                ? "border-gray-600"
                : "border-btn-primary"
            }  ${
              currentRange > MAX_RANGE
                ? "bg-gray-500 bg-opacity-50"
                : "bg-[#F11F1F80]"
            }`}
          />
        </Slider.Track>
        <Slider.Thumb
          className={`flex h-[27px] w-3 cursor-grab items-center justify-center gap-[2px] rounded-bl-[3px] rounded-tl-[3px]  ${
            currentRange > MAX_RANGE ? "bg-gray-600" : "bg-btn-primary"
          }`}
        >
          <div className="h-[10px] w-[1px] bg-white" />
          <div className="h-[10px] w-[1px] bg-white" />
        </Slider.Thumb>
        <Slider.Thumb
          className={`flex h-[27px] w-3  cursor-grab items-center justify-center gap-[2px] rounded-br-[3px] rounded-tr-[3px]  ${
            currentRange > MAX_RANGE ? "bg-gray-600" : "bg-btn-primary"
          }`}
        >
          <div className="h-[10px] w-[1px] bg-white" />
          <div className="h-[10px] w-[1px] bg-white" />
        </Slider.Thumb>
      </Slider.Root>
    </>
  );
};
