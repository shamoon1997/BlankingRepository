import { DateFormatOptions, metricDateCalendarOptions } from "@/utils/date";
import { useState } from "react";
import { useCalendarUrlState } from "@/hooks/calendar";
import { ValidStringTimes } from "@/utils/validation-schemas";
import { format } from "date-fns";

type Props = {
  onApply: () => void;
};
export const MetricCalendarCustomRange = ({ onApply }: Props) => {
  const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();

  const [selectedFromOption, setSelectedFromOption] =
    useState<ValidStringTimes | null>(() => {
      const { from } = validatedCalendarUrlState;

      if (typeof from === "string") return from;
      else return null;
    });

  return (
    <form
      className=" py-[11px]"
      onChange={(e) => {
        console.log(e.currentTarget);
        const formData = new FormData(e.currentTarget);
        const from = formData.get("custom-time");
        const to = "now";
        if (from && typeof from === "string") {
          setSearchParams((params) => {
            params.set("from", from);
            params.set("to", to);
            return params;
          });
          onApply();
        }
      }}
    >
      <ul className="grid  grid-cols-2 place-content-center gap-x-[16px] gap-y-[14px] px-[9px] pb-[8px]">
        {metricDateCalendarOptions.map((option) => {
          return (
            <li
              className="flex items-center gap-[10px] text-[10px]"
              key={option.title}
            >
              <input
                type="radio"
                value={option.type}
                id={option.type}
                onChange={(e) => {
                  // @ts-expect-error if value is not a string
                  setSelectedFromOption(e.target.value);
                }}
                name="custom-time"
                className="cursor-pointer accent-primary-blue"
                checked={selectedFromOption === option.type}
                aria-label={option.type}
              />

              <label className="cursor-pointer" htmlFor={option.type}>
                {option.title}
              </label>
            </li>
          );
        })}
      </ul>

      <div className="h-[0.5px] w-full  bg-[#D9D9D9]" />

      <div className="px-[9px]">
        <div className="flex justify-between pb-[9px] pt-[10px]">
          <p className="text-[8px]">Current time</p>
          <p className="text-custom-green text-[8px]">
            {format(Date.now(), DateFormatOptions.standardTime)}
          </p>
        </div>

        <div className="pb-[8px] text-[8px]">
          <p>America/Los_Angles</p>
          <p className="text-primary-soft">United States, PST</p>
        </div>
      </div>
    </form>
  );
};
