import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getUnixTime,
  fromUnixTime,
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
import { getDay } from "date-fns/fp";
import { DateFormatOptions, defaultDateDropdownOptions } from "@/utils/date";

type Props = {
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
  let prevDay = sub(selectedDayRange[0] * 1000, { hours: 24 });
  const monthDay = new Date(selectedDayRange[0] * 1000);

  // If prev day is not part of this month it must mean that prev day is the last day of the prev month
  // If I select 1st jan, then prev day must be 31st december
  const isMonthSame = isSameMonth(prevDay, monthDay);

  if (!isMonthSame) prevDay = lastDayOfMonth(prevDay);

  // start and end range of prev day
  const prevDayStartUnix = getUnixTime(startOfDay(prevDay));
  const prevDayEndUnix = getUnixTime(endOfDay(prevDay));

  return [prevDayStartUnix, prevDayEndUnix];
};

export const MetricDataCalendar: React.FC<Props> = () => {
  // const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();
  const { validatedCalendarUrlState } = useCalendarUrlState();

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
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        from = getUnixTime(fromToDate.from);
      } else from = getUnixTime(startOfToday());
    }

    if (typeof validatedCalendarUrlState.to === "number") {
      to = validatedCalendarUrlState.to;
    } else {
      // TODO: convert from to strings to their corresponding date objects
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        to = getUnixTime(fromToDate.to);
      } else to = getUnixTime(startOfToday());
    }

    const startDay = getDay(fromUnixTime(from));
    const endDay = getDay(fromUnixTime(to));

    const spansTwoDays = startDay !== endDay;

    const startOfDayUnix = getUnixTime(startOfDay(fromUnixTime(to)));
    const endOfDayUnix = getUnixTime(endOfDay(fromUnixTime(to)));

    if (spansTwoDays) {
      // 18 and 19 are the 'from' and 'to' dates, so I'm spanning two days and the current day should be 'to' and the previous day should be
      // generated from 'to' day i.e. 19 becomes the current day and 18 becomes the previous day as 'from' and 'to' dates lie in those days

      return {
        // the current day should be to i.e. the ending day
        currentDay: [startOfDayUnix, endOfDayUnix],
        // and the previous day should be generated from the to day as well
        prevDay: generatePrevDays([startOfDayUnix, endOfDayUnix]),
      };
    } else {
      return {
        currentDay: [getUnixTime(startOfDay(fromUnixTime(from))), endOfDayUnix],
        prevDay: generatePrevDays([
          getUnixTime(startOfDay(fromUnixTime(from))),
          endOfDayUnix,
        ]),
      };
    }
  });

  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDayRange.currentDay[0] * 1000, "MMMM-yyyy"),
  );

  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

  const [, setTimeRange] = useState<number[]>(() => {
    let from, to;

    if (typeof validatedCalendarUrlState.from === "number") {
      // already in unix time seconds from 1970
      from = validatedCalendarUrlState.from;
    } else {
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        from = getUnixTime(fromToDate.from);
      } else from = getUnixTime(startOfToday());
    }

    if (typeof validatedCalendarUrlState.to === "number") {
      to = validatedCalendarUrlState.to;
    } else {
      const option = defaultDateDropdownOptions.find(
        (i) => i.type === validatedCalendarUrlState.from,
      );

      if (option) {
        const fromToDate = option.getDates();
        to = getUnixTime(fromToDate.to);
      } else to = getUnixTime(startOfToday());
    }

    return [from, to];
  });

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

  const daysOfThisMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });

  return (
    <>
      <div className="flex justify-between gap-2">
        <p className="text-[8px] font-semibold text-radio-button">
          {format(firstDayOfCurrentMonth, "MMMM yyyy")}
        </p>
        <div className="flex items-center gap-[5px] text-[10px]">
          <button
            onClick={prevMonth}
            className="h-[16px] w-[16px] rounded-[2px] bg-custom-side-color"
          >
            <ChevronIcon className={"-rotate-90 [&_path]:stroke-white"} />
          </button>
          <button
            onClick={nextMonth}
            className="h-[16px] w-[16px] rounded-[2px] bg-custom-side-color"
          >
            <ChevronIcon className={"rotate-90 [&_path]:stroke-white"} />
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
                const start = getUnixTime(startOfDay(day));
                const end = getUnixTime(endOfDay(day));

                const range = [start, end];
                setSelectedDayRange({ currentDay: range, prevDay: range });

                setTimeRange([getUnixTime(start), getUnixTime(end)]);
              }}
              className={`flex h-[22px] w-full items-start justify-start rounded-[2px] border-[0.5px] border-solid  pl-[5px]  text-[11px] font-normal
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
                              ? "border-device-data-border-blue bg-device-data-blue text-device-data-border-blue "
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
                              ? "border-device-data-border-blue bg-device-data-blue  text-white"
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

      <div className=" flex min-w-[190px] justify-between pb-[9px] pt-[10px]">
        <p className="text-[8px]">Current time</p>
        <p className="text-custom-green text-[8px]">
          {format(Date.now(), DateFormatOptions.standardTime)}
        </p>
      </div>

      <div className="pb-[8px] text-[8px]">
        <p>America/Los_Angles</p>
        <p className="text-primary-soft">United States, PST</p>
      </div>
    </>
  );
};
