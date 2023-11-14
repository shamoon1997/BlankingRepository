import { format } from "date-fns";
import React, { useState } from "react";
import {
  DateFormatter,
  DateRange,
  DayPicker,
  ClassNames,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

const classNames: ClassNames = {
  head: "text-lg",
  tbody: "font-thin",
  caption_label: "text-sm text-black/60 px-3",
  day_range_start:
    "outline outline-4 outline-btn-primary outline-offset-[-2px] text-black hover:bg-btn-primary/80 font-bold",
  day_range_end:
    "outline outline-2 outline-btn-primary bg-btn-primary hover:bg-btn-primary/80 font-bold",
  day_range_middle: "bg-btn-primary rounded-none h-5 hover:bg-btn-primary/80",
};

const formatWeekdayName: DateFormatter = (week) => {
  const weekdayName = format(week, "EEEEE");
  return weekdayName;
};

const DateRangeCalendar: React.FC = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        classNames={classNames}
        formatters={{ formatWeekdayName }}
        showOutsideDays
        footer={
          <>
            <button
              className="rounded-md bg-green-100 px-4 py-2 text-sm"
              onClick={() => setRange(undefined)}
            >
              Clear
            </button>
          </>
        }
      />
    </>
  );
};

export default DateRangeCalendar;
