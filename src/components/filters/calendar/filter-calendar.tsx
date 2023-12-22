import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  getUnixTime,
  isSameDay,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  parse,
  startOfDay,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { ChevronIcon } from "@/assets";
import { useCalendarUrlState } from "@/hooks/calendar";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Time } from "@/components/filters/calendar/time.tsx";
import {
  maxRange,
  TimeSlider,
} from "@/components/filters/calendar/time-slider.tsx";
import * as Tooltip from "@radix-ui/react-tooltip";

type FilterCalendarProps = {
  onApply: () => void;
};

/*
Important
All times are set in unix seconds from 1970
all times are read and converted to milliseconds where needed
 */

const generatePrevDays = (selectedDayRange: number[]): number[] => {
  // go back  by one day from 'from' date
  // convert unix seconds to milliseconds
  let prevDay = sub(selectedDayRange[0] * 1000, { days: 1 });
  const monthDay = new Date(selectedDayRange[0] * 1000);

  // If prev day is not part of this month it must mean that prev day is the last day of the prev month
  // If I select 1st jan, then prev day must be 31st december
  const isMonthSame = isSameMonth(prevDay, monthDay);

  console.log(isMonthSame);

  if (!isMonthSame) {
    prevDay = lastDayOfMonth(prevDay);
  }

  // start and end range of prev day
  const prevDayStartUnix = getUnixTime(startOfDay(prevDay));
  const prevDayEndUnix = getUnixTime(endOfDay(prevDay));

  return [prevDayStartUnix, prevDayEndUnix];
};

export const FilterCalendar = ({ onApply }: FilterCalendarProps) => {
  const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();

  const [selectedDayRange, setSelectedDayRange] = useState<{
    currentDay: number[];
    prevDay: number[];
  }>(() => {
    let from;
    let to;
    if (typeof validatedCalendarUrlState.from === "number") {
      // already in unix time seconds from 1970
      from = validatedCalendarUrlState.from;
    } else {
      // TODO: convert from to strings to their corresponding date objects
      from = getUnixTime(startOfToday());
    }

    if (typeof validatedCalendarUrlState.to === "number") {
      to = validatedCalendarUrlState.to;
    } else {
      // TODO: convert from to strings to their corresponding date objects
      to = getUnixTime(endOfToday());
    }

    return {
      currentDay: [from, to],
      prevDay: generatePrevDays([from, to]),
    };
  });

  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDayRange.currentDay[0] * 1000, "MMMM-yyyy"),
  );

  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const [timeRange, setTimeRange] = useState<number[]>(() => {
    return [selectedDayRange.currentDay[0], selectedDayRange.currentDay[1]];
  });

  const [, saveDate] = useLocalStorage<
    {
      from: number;
      to: number;
    }[]
  >("absolute-dates", []);

  const nextMonth = () => {
    const parsedMonth = parse(currentMonth, "MMMM-yyyy", new Date());
    const nextMonth = add(parsedMonth, { months: 1 });
    setCurrentMonth(format(nextMonth, "MMMM-yyyy"));
  };

  const prevMonth = () => {
    const parsedMonth = parse(currentMonth, "MMMM-yyyy", new Date());
    const prevMonth = sub(parsedMonth, { months: 1 });
    setCurrentMonth(format(prevMonth, "MMMM-yyyy"));
  };

  const jumpToToday = () => {
    const today = new Date();
    setCurrentMonth(format(today, "MMMM-yyyy"));
    setSelectedDayRange({
      currentDay: [
        getUnixTime(startOfDay(today)),
        getUnixTime(endOfDay(today)),
      ],
      prevDay: generatePrevDays([
        getUnixTime(startOfDay(today)),
        getUnixTime(endOfDay(today)),
      ]),
    });

    setTimeRange([
      getUnixTime(startOfDay(today)),
      getUnixTime(endOfDay(today)),
    ]);
  };

  const daysOfThisMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });

  const currentRange = timeRange[1] - timeRange[0];

  return (
    <>
      <div className="flex justify-between gap-2">
        <p className="font-semibold text-[#5B5B5B]">
          {format(firstDayOfCurrentMonth, "MMMM yyyy")}
        </p>
        <div className="flex items-center gap-[5px] text-[10px]">
          <button
            className="rounded-[2px] bg-[#F3F3F3] pl-1 pr-1"
            onClick={jumpToToday}
          >
            Today
          </button>

          <button
            onClick={prevMonth}
            className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
          >
            <ChevronIcon className={"-rotate-90"} />
          </button>
          <button
            onClick={nextMonth}
            className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
          >
            <ChevronIcon className={"rotate-90"} />
          </button>
        </div>
      </div>

      <div className="mt-[11px] grid grid-cols-7 text-center text-[10px] font-semibold">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div className="mb-4 grid grid-cols-7 gap-x-[4px] gap-y-[3px]">
        {daysOfThisMonth.map((day) => {
          return (
            <button
              disabled={
                (!isToday(day) && !isSameMonth(day, firstDayOfCurrentMonth)) ||
                day > new Date()
              }
              onClick={() => {
                setSelectedDayRange({
                  currentDay: [
                    getUnixTime(startOfDay(day)),
                    getUnixTime(endOfDay(day)),
                  ],
                  prevDay: generatePrevDays([
                    getUnixTime(startOfDay(day)),
                    getUnixTime(endOfDay(day)),
                  ]),
                });

                setTimeRange([
                  getUnixTime(startOfDay(day)),
                  getUnixTime(endOfDay(day)),
                ]);
              }}
              className={`flex h-[35px] w-full items-start justify-start rounded-[2px] border-[0.5px] border-solid  pl-[5px]  text-[11px] font-normal
                          ${
                            (!isToday(day) &&
                              !isSameMonth(day, firstDayOfCurrentMonth)) ||
                            day > new Date()
                              ? "cursor-not-allowed text-gray-300"
                              : ""
                          }
                          ${
                            isSameDay(
                              day,
                              selectedDayRange.currentDay[0] * 1000,
                            ) &&
                            isSameMonth(
                              selectedDayRange.currentDay[0] * 1000,
                              firstDayOfCurrentMonth,
                            )
                              ? "border-btn-primary bg-[#F78E8D] text-white"
                              : " border-[#F2F2F2]"
                          }
                          
                          ${
                            isSameDay(
                              day,
                              selectedDayRange.prevDay[0] * 1000,
                            ) &&
                            isSameMonth(
                              selectedDayRange.prevDay[0] * 1000,
                              firstDayOfCurrentMonth,
                            )
                              ? "border-btn-primary bg-[#F78E8D]  text-white"
                              : " border-[#F2F2F2]"
                          }
                          
                          
                         
                       
                          `}
              key={day.toString()}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>
          );
        })}
      </div>

      <TimeSlider
        values={timeRange}
        setValues={setTimeRange}
        // in seconds
        min={selectedDayRange.prevDay[0]}
        max={selectedDayRange.currentDay[1]}
      />

      <Time />

      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              disabled={currentRange > maxRange}
              onClick={() => {
                saveDate((prev) => {
                  if (prev.length === 3) {
                    return [
                      {
                        from: timeRange[0],
                        to: timeRange[1],
                      },
                      ...prev.slice(0, 2),
                    ];
                  } else {
                    return [
                      {
                        from: timeRange[0],
                        to: timeRange[1],
                      },
                      ...prev,
                    ];
                  }
                });

                setSearchParams((params) => {
                  params.set("from", String(timeRange[0]));
                  params.set("to", String(timeRange[1]));
                  return params;
                });
                onApply();
              }}
              className="flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Confirm
            </button>
          </Tooltip.Trigger>

          <Tooltip.Portal>
            {currentRange > maxRange && (
              <Tooltip.Content
                className="z-50 rounded border-[0.5px] border-default bg-white p-2 text-xs shadow-tooltip"
                sideOffset={5}
              >
                Only a maximum range of 24 hours is allowed.
              </Tooltip.Content>
            )}
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
};
