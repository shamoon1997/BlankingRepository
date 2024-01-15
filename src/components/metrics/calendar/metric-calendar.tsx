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
  parse,
  startOfDay,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { ChevronIcon } from "@/assets";
import { useCalendarUrlState } from "@/hooks/calendar";
import { DateFormatOptions, defaultDateDropdownOptions } from "@/utils/date";

type Props = { onApply: () => void };

type DayRangeType = {
  currentDay: number[];
  prevDay: number[];
};

/*
Important
All times are set in unix seconds from 1970
all times are read and converted to milliseconds where needed
 */
const maskDate = (value: string) => {
  let cleanedValue = value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{0,2}).*/, "$1:$2");

  const hours = parseInt(cleanedValue.slice(0, 2));
  const minutes = parseInt(cleanedValue.slice(3));

  if (hours > 23) cleanedValue = "23";
  if (minutes > 59) cleanedValue = cleanedValue.slice(0, 3) + "59";

  console.log(cleanedValue);

  return cleanedValue;
};

export const MetricDataCalendar: React.FC<Props> = () => {
  // const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();
  const { validatedCalendarUrlState } = useCalendarUrlState();

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const [selectedDayRange, setSelectedDayRange] = useState<DayRangeType>(() => {
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

    const startOfDayUnix = getUnixTime(startOfDay(fromUnixTime(to)));
    const endOfDayUnix = getUnixTime(endOfDay(fromUnixTime(to)));

    const day = [startOfDayUnix, endOfDayUnix];

    return { currentDay: day, prevDay: day };
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

      <div className="flex gap-[18px] px-[7px] text-[8px]">
        <div className="flex h-[13px] w-1/2 items-center gap-[5px]">
          <p>Starts</p>
          <input
            value={startTime}
            onChange={(e) => setStartTime(maskDate(e.target.value))}
            className="w-[40px] rounded-md border-[1px] px-[5px] py-[2.5px] outline-none focus:border-device-data-border-blue focus:text-device-data-border-blue"
            type="text"
          />
        </div>
        <div className="flex h-[13px] w-1/2 items-center gap-[5px]">
          <p>Ends</p>
          <input
            value={endTime}
            onChange={(e) => setEndTime(maskDate(e.target.value))}
            className="w-[40px] rounded-md border-[1px] px-[5px] py-[2.5px] outline-none focus:border-device-data-border-blue focus:text-device-data-border-blue"
            type="text"
            // onBlur={() => {
            //   console.log("YAAAAAA");
            // }}
          />
        </div>
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
