import { formateDate, dateFormats } from "@/utils/date";
import React from "react";
import {
  ClassNames,
  DateFormatter,
  DateRange,
  DayPicker,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useSearchParams } from "react-router-dom";

const classNames: ClassNames = {
  root: "m-0",
  head: "text-lg",
  head_cell: "font-bold text-[8px]",
  day: "w-[26px] h-[26px] border border-2 border-transparent rounded-full",
  tbody: "font-thin text-[8px]",
  caption_label: "px-3 text-sm text-black/60",
  day_range_start:
    "rounded-full font-bold text-black border border-2 border-btn-primary hover:bg-btn-primary/80",
  day_range_end:
    "rounded-full bg-btn-primary font-bold border border-2 border-btn-primary hover:bg-btn-primary/80",
  day_range_middle:
    "h-[18px] bg-btn-primary hover:bg-btn-primary/80 rounded-none",
  nav_button_previous: "[&_svg]:h-3 [&_svg]:w-3",
  nav_button_next: "[&_svg]:h-3 [&_svg]:w-3",
};

type Props = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

const DateRangeCalendar: React.FC<Props> = ({ range, setRange }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const formatWeekdayName: DateFormatter = (week) => {
    const weekdayName = formateDate(week, dateFormats.weekMini);
    return weekdayName;
  };

  return (
    <>
      <DayPicker
        mode="range"
        defaultMonth={range?.from ?? new Date()}
        selected={range}
        onSelect={(rangeFromClick, currentDay) => {
          if (range?.to !== undefined)
            return setRange({ from: currentDay, to: undefined });
          setRange(rangeFromClick);
        }}
        classNames={classNames}
        formatters={{ formatWeekdayName }}
        showOutsideDays
        footer={
          <>
            <div className="flex justify-end gap-2">
              <button
                className="rounded-md bg-btn-secondary/70 px-4 py-2 text-xs font-bold"
                onClick={() => setRange(undefined)}
              >
                Clear
              </button>
              <button
                onClick={() => {
                  if (!range) return;
                  const { to, from } = range;
                  if (to && from) {
                    searchParams.delete("type");
                    searchParams.set("from", `${from.getTime()}`);
                    searchParams.set("to", `${to.getTime()}`);
                    searchParams.set("custom", "true");
                    setSearchParams(searchParams);
                  }
                }}
                className="rounded-md bg-btn-primary px-4 py-2 text-xs font-bold text-white hover:bg-btn-primary/70"
              >
                Apply
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default DateRangeCalendar;
