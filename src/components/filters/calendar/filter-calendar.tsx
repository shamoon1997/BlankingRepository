import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  fromUnixTime,
  getUnixTime,
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
import { useLocalStorage } from "@uidotdev/usehooks";

type FilterCalendarProps = {
  onApply: () => void;
};
export const FilterCalendar = ({ onApply }: FilterCalendarProps) => {
  const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();

  const [, saveDate] = useLocalStorage<
    {
      from: number;
      to: number;
    }[]
  >("absolute-dates", []);

  // unix time stamps
  const [selectedFrom, setSelectedFrom] = useState(() => {
    if (typeof validatedCalendarUrlState.from === "number") {
      return fromUnixTime(validatedCalendarUrlState.from);
    } else {
      // TODO: convert from to strings to their corresponding date objects
      return startOfToday();
    }
  });
  const [selectedTo, setSelectedTo] = useState(() => {
    if (typeof validatedCalendarUrlState.to === "number") {
      return fromUnixTime(validatedCalendarUrlState.to);
    } else {
      // TODO: convert from to strings to their corresponding date objects
      return endOfToday();
    }
  });

  const [currentMonth, setCurrentMonth] = useState(
    format(selectedFrom, "MMMM-yyyy"),
  );

  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());

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
    const today = new Date()
    setCurrentMonth(format(today, "MMMM-yyyy"));
    setSelectedTo(endOfDay(today));
    setSelectedFrom(startOfDay(today));
  };

  const daysOfThisMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });

  return (
    <>

        <div className="flex gap-2 justify-between">
          <p className="font-semibold text-[#5B5B5B]">
            {format(firstDayOfCurrentMonth, "MMMM yyyy")}
          </p>
          <div className="flex items-center gap-[5px] text-[10px]">
            <button className="rounded-[2px] bg-[#F3F3F3] pl-1 pr-1" onClick={jumpToToday}>Jump to Today</button>

            <button
                onClick={prevMonth}
                className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
            >
              <ChevronIcon className={"-rotate-90"}/>
            </button>
            <button
                onClick={nextMonth}
                className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
            >
              <ChevronIcon className={"rotate-90"}/>
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
                !isToday(day) && !isSameMonth(day, firstDayOfCurrentMonth)
              }
              onClick={() => {
                setSelectedTo(endOfDay(day));
                setSelectedFrom(startOfDay(day));
              }}
              className={`flex h-[35px] w-full items-start justify-start rounded-[2px] border-[0.5px] border-solid  pl-[5px]  text-[11px] font-normal
                          ${
                            !isToday(day) &&
                            !isSameMonth(day, firstDayOfCurrentMonth)
                              ? "cursor-not-allowed text-gray-300"
                              : ""
                          }
                          ${
                            isSameDay(day, selectedFrom)
                              ? "border-btn-primary bg-[#F78E8D] text-white"
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
      <button
        onClick={() => {
          saveDate((prev) => {
            if (prev.length === 3) {
              return [
                {
                  from: getUnixTime(selectedFrom),
                  to: getUnixTime(selectedTo),
                },
                ...prev.slice(0, 2),
              ];
            } else {
              return [
                {
                  from: getUnixTime(selectedFrom),
                  to: getUnixTime(selectedTo),
                },
                ...prev,
              ];
            }
          });
          setSearchParams((params) => {
            params.set("from", String(getUnixTime(selectedFrom)));
            params.set("to", String(getUnixTime(selectedTo)));
            return params;
          });
          onApply();
        }}
        className="flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white"
      >
        Confirm
      </button>
    </>
  );
};
