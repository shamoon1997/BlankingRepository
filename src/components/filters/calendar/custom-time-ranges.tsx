import { DateFormatOptions, defaultDateDropdownOptions } from "@/utils/date";
import { useState } from "react";
import { useCalendarUrlState } from "@/hooks/calendar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { fromUnixTime } from "date-fns";
import { ValidStringTimes } from "@/utils/validation-schemas";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { useCalendarTimeZone } from "@/state";

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
  const [selectedFromOption, setSelectedFromOption] =
    useState<ValidStringTimes | null>(() => {
      if (typeof validatedCalendarUrlState.from === "string") {
        return validatedCalendarUrlState.from;
      } else {
        return null;
      }
    });

  const timeZone = useCalendarTimeZone();

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

      <div className=" h-[0.5px]  bg-[#D9D9D9]" />
      <div className="px-[9px] py-[11px]">
        <p className="mb-[5px] text-[11px] font-normal">
          Recently used absolute ranges
        </p>
        <div className="flex  flex-col gap-[5px] text-[11px]">
          {(!savedDates || savedDates?.length === 0) && (
            <p className="w-[300px]">
              It looks like you haven&apos;t used the custom calendar before. As
              soon as you enter some time intervals, recently used intervals
              will appear here.
            </p>
          )}
          {savedDates?.map((date) => {
            console.log(date);
            return (
              <div
                onClick={() => {
                  // https://stackoverflow.com/questions/73698467/why-getunixtime-fuction-from-date-fns-returns-1970
                  const from = date.from;
                  const to = date.to;
                  saveDate((prev) => {
                    // limit to three entries
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
                className="flex  cursor-pointer items-center gap-2"
              >
                <>
                  <div>From</div>
                  <div className="flex items-center  justify-center rounded-sm bg-[#F2F2F2] p-1 text-primary-blue">
                    {formatInTimeZone(
                      fromUnixTime(date.from),
                      timeZone,
                      DateFormatOptions.dateTimeFormatForSever,
                      {
                        locale: enUS,
                      },
                    )}
                  </div>
                  <div>To</div>
                  <div className="flex items-center  justify-center rounded-sm bg-[#F2F2F2] p-1 text-primary-blue">
                    {formatInTimeZone(
                      fromUnixTime(date.to),
                      timeZone,
                      DateFormatOptions.dateTimeFormatForSever,
                      {
                        locale: enUS,
                      },
                    )}
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
          selectedFromOption === null
        }
        type="submit"
        className="mb-3 flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Apply Time Range
      </button>

      {/*  This is constant pst america time zone for now but will be dynamic later on, the client only wants it
      to be usa time zone for now*/}
      <div className=" h-[0.5px]  bg-[#D9D9D9]" />
      <div className="flex items-center gap-1 pt-[9px] text-[#161616]">
        <p>America/Los_Angles</p>
        <p className="text-[#16161680]">United States, PST</p>
        <div className="ml-auto flex items-center justify-center rounded-sm bg-[#F2F2F2] p-[3px] pl-[4px] pr-[4px]">
          PST-08:00
        </div>
      </div>
    </form>
  );
};
