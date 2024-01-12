import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { useCalendarTimeZone } from "@/state";
import { DateFormatOptions } from "@/utils/date";

export const Time = () => {
  const timeZone = useCalendarTimeZone();
  const [time, setTime] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(Date.now());
      //  update every 1 minute
    }, 1000 * 60);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <p className="mb-[15px] ml-[11px] mr-[11px] mt-[13px] text-[11px]">
      <span className="text-[#16161680]">Current Time: </span>
      <span>
        {formatInTimeZone(
          time,
          timeZone,
          DateFormatOptions.timerTimeWithTimeZone,
          {
            locale: enUS,
          },
        )}
      </span>
    </p>
  );
};
