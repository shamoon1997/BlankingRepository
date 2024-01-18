import { ChevronIcon } from "@/assets";
import { useCalendarUrlState } from "@/hooks/calendar";
import { useGetDeploymentMetrics } from "@/hooks/metrics";
import { useCalendarTimeZone } from "@/state";
import { DateFormatOptions, defaultDateDropdownOptions } from "@/utils/date";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfToday,
  endOfWeek,
  format,
  getUnixTime,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz";
import { useMemo, useState } from "react";

type Props = { onApply: () => void };

// To make sure time entered is in HH:mm format
const timeRegex = /^(?:[01]\d|2[0-4]):[0-5]\d$/;

const maskDate = (value: string) => {
  let cleanedValue = value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{0,2}).*/, "$1:$2");

  const hours = parseInt(cleanedValue.slice(0, 2));
  const minutes = parseInt(cleanedValue.slice(3));

  if (hours > 23) cleanedValue = "23";
  if (minutes > 59) cleanedValue = cleanedValue.slice(0, 3) + "59";

  return cleanedValue;
};

export const MetricDataCalendar: React.FC<Props> = () => {
  const { validatedCalendarUrlState, setSearchParams } = useCalendarUrlState();
  const timezone = useCalendarTimeZone();

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const [selectedDay, setSelectedDay] = useState<number[]>(() => {
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
      } else {
        from = getUnixTime(zonedTimeToUtc(startOfToday(), timezone));
      }
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
      } else {
        to = getUnixTime(zonedTimeToUtc(endOfToday(), timezone));
      }
    }

    return [from, to];
  });

  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDay[0] * 1000, "MMMM-yyyy"),
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

  const daysOfThisMonth = eachDayOfInterval({
    start: zonedTimeToUtc(startOfWeek(firstDayOfCurrentMonth), timezone),
    end: zonedTimeToUtc(
      endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
      timezone,
    ),
  });

  const setDateInURL = (day: number) => {
    const dateFormat = DateFormatOptions.standardDateNoTime;
    const dateSelected = format(day * 1000, dateFormat);

    const trueTimeStart = zonedTimeToUtc(
      dateSelected + `T${startTime}`,
      timezone,
    );

    const trueTimeEnd = zonedTimeToUtc(dateSelected + `T${endTime}`, timezone);

    const start = getUnixTime(trueTimeStart);
    const end = getUnixTime(trueTimeEnd);

    setSelectedDay([start, end]);

    setSearchParams((params) => {
      params.set("from", String(start));
      params.set("to", String(end));
      return params;
    });
  };

  const setTimeInURL = (time: string, type: "to" | "from") => {
    const dateFormat = DateFormatOptions.standardDateNoTime;
    let currentTimestamp: number;
    if (type === "from") currentTimestamp = selectedDay[0] * 1000;
    else currentTimestamp = selectedDay[1] * 1000;

    const formattedDate = formatInTimeZone(
      currentTimestamp,
      timezone,
      dateFormat,
    );

    const theirTimeToMyTime = zonedTimeToUtc(
      formattedDate + `T${time}`,
      timezone,
    );

    const timeInUnix = format(new Date(theirTimeToMyTime), "t");

    const newArray = [...selectedDay];
    if (type === "from") newArray[0] = +timeInUnix;
    if (type === "to") newArray[1] = +timeInUnix;

    setSelectedDay(newArray);

    setSearchParams((params) => {
      params.set(type, String(timeInUnix));
      return params;
    });
  };

  const datesToQuery = useMemo(() => {
    const format = DateFormatOptions.dateTimeFormatForSever;

    const start = formatInTimeZone(selectedDay[0] * 1000, timezone, format);
    const end = formatInTimeZone(selectedDay[1] * 1000, timezone, format);

    return { start, end };
  }, [selectedDay, timezone]);

  datesToQuery;

  const { data } = useGetDeploymentMetrics({
    t1: datesToQuery.start,
    t2: datesToQuery.end,
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
          const selectedUnix = selectedDay[0] * 1000;

          // sub is a hacky solution for highlighting selected date on calendar
          // can't find another way for now sadly
          const modifiedSelectedDate = sub(
            zonedTimeToUtc(selectedUnix, timezone),
            { days: 1 },
          );
          const modifiedDay = zonedTimeToUtc(day, timezone);
          const modified1stDayCurMonth = zonedTimeToUtc(
            firstDayOfCurrentMonth,
            timezone,
          );

          // BOOLEANS  =========================
          const shouldDisable =
            (!isToday(day) && !isSameMonth(day, firstDayOfCurrentMonth)) ||
            day > new Date();

          const dayIsSelected =
            isSameDay(modifiedDay, modifiedSelectedDate) &&
            isSameMonth(modifiedSelectedDate, modified1stDayCurMonth);
          // ===================================

          return (
            <button
              disabled={shouldDisable}
              onClick={() => {
                setDateInURL(getUnixTime(zonedTimeToUtc(day, timezone)));
              }}
              className={`flex h-[22px] w-full items-start justify-start rounded-[2px] border-[0.5px] border-solid  pl-[5px]  text-[11px] font-normal
                          ${shouldDisable && "cursor-not-allowed text-gray-300"}
                          ${
                            dayIsSelected &&
                            "border-device-data-border-blue bg-device-data-blue text-device-data-border-blue "
                          }
                          ${!dayIsSelected && "border-[#F2F2F2]"}
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
            onBlur={(e) => {
              const { value } = e.target;
              if (timeRegex.test(value)) {
                setStartTime(value);
                setTimeInURL(value, "from");
              }
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter" && timeRegex.test(startTime))
                setTimeInURL(startTime, "from");
            }}
          />
        </div>
        <div className="flex h-[13px] w-1/2 items-center gap-[5px]">
          <p>Ends</p>
          <input
            value={endTime}
            onChange={(e) => {
              setEndTime(maskDate(e.target.value));
            }}
            className="w-[40px] rounded-md border-[1px] px-[5px] py-[2.5px] outline-none focus:border-device-data-border-blue focus:text-device-data-border-blue"
            type="text"
            onBlur={(e) => {
              const { value } = e.target;
              if (timeRegex.test(value)) {
                setEndTime(value);
                setTimeInURL(value, "to");
              }
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter" && timeRegex.test(endTime))
                setTimeInURL(endTime, "to");
            }}
          />
        </div>
      </div>

      <div className=" flex min-w-[190px] justify-between pb-[9px] pt-[10px]">
        <p className="text-[8px]">Current time</p>
        <p className="text-[8px] text-custom-green">
          {formatInTimeZone(
            Date.now(),
            timezone,
            DateFormatOptions.standardTime24Hr,
          )}
        </p>
      </div>

      <div className="pb-[8px] text-[8px]">
        <p>{timezone}</p>
        <p className="text-primary-soft">United States, PST</p>
      </div>
    </>
  );
};
