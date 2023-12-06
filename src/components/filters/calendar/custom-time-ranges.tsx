import { defaultDateDropdownOptions } from "@/utils/date";
import { useState } from "react";
import { useCalendarUrlState } from "@/hooks/calendar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { format, fromUnixTime, getUnixTime } from "date-fns";

type CustomTimeRangesProps = {
  onApply: () => void;
};
export const CustomTimeRanges = ({ onApply }: CustomTimeRangesProps) => {
  const [savedDates, saveDate] = useLocalStorage<
    {
      from: number;
      to: number;
    }[]
  >("absolute-dates", []);

  const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();
  const [selectedOption, setSelectedOption] = useState(() => {
    if (typeof validatedCalendarUrlState.from === "string") {
      return validatedCalendarUrlState.from;
    } else {
      return null;
    }
  });

  return (
    <form
      className="px-[9px] py-[11px]"
      onSubmit={(e) => {
        e.preventDefault();

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
        // setOpen(false);
      }}
    >
      <ul className="grid w-[95%] grid-cols-2 gap-x-4 gap-y-1">
        {defaultDateDropdownOptions.map((option) => {
          return (
            <li
              className="flex items-center gap-[10px] px-[10px] py-[5px] text-[12px]"
              key={option.title}
            >
              <input
                type="radio"
                value={option.type}
                id={option.type}
                onChange={(e) => {
                  // @ts-expect-error if value is not a string
                  setSelectedOption(e.target.value);
                }}
                name="custom-time"
                className="cursor-pointer accent-primary-blue"
                checked={selectedOption === option.type}
                aria-label={option.type}
              />

              <label className="cursor-pointer" htmlFor={option.type}>
                {option.title}
              </label>
            </li>
          );
        })}
      </ul>

      <div className=" h-[0.5px]  bg-[#D9D9D9]" />
      <div className="px-[9px] py-[11px]">
        <p className="mb-[5px] text-[11px] font-normal">
          Recently used absolute ranges
        </p>
        <div className="flex  flex-col gap-[5px] text-[11px]">
          {savedDates.length === 0 && (
            <p className="w-[300px]">
              It looks like you haven&apos;t used the custom calendar before. As
              soon as you enter some time intervals, recently used intervals
              will appear here.
            </p>
          )}
          {savedDates.map((date) => {
            console.log(date);
            return (
              <div
                onClick={() => {
                  const from = getUnixTime(date.from);
                  const to = getUnixTime(date.to);
                  saveDate((prev) => {
                    if (prev.length === 3) {
                      return [
                        {
                          from,
                          to,
                        },
                        ...prev.slice(0, 2),
                      ];
                    } else {
                      return [
                        {
                          from,
                          to,
                        },
                        ...prev,
                      ];
                    }
                  });
                  setSearchParams((params) => {
                    params.set("from", String(from));
                    params.set("to", String(to));
                    return params;
                  });
                  onApply();
                }}
                key={date.from}
                className="flex w-[340px] cursor-pointer items-center gap-2"
              >
                <>
                  <div>From</div>
                  <div className="flex items-center  justify-center rounded-sm bg-[#F2F2F2] p-1 text-primary-blue">
                    {format(fromUnixTime(date.from), "yyyy-MM-dd HH:mm:ss")}
                  </div>
                  <div>To</div>
                  <div className="flex items-center  justify-center rounded-sm bg-[#F2F2F2] p-1 text-primary-blue">
                    {format(fromUnixTime(date.to), "yyyy-MM-dd HH:mm:ss")}
                  </div>
                </>
              </div>
            );
          })}
        </div>
      </div>

      <button
        disabled={
          typeof validatedCalendarUrlState.from !== "string" &&
          selectedOption === null
        }
        type="submit"
        className="flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Apply Time Range
      </button>
    </form>
  );
};
