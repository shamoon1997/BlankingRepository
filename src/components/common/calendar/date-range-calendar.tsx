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
  caption_label: "px-3 text-sm text-black/60",
  day_range_start:
    "font-bold text-black outline outline-4 outline-offset-[-2px] outline-btn-primary hover:bg-btn-primary/80",
  day_range_end:
    "bg-btn-primary font-bold outline outline-2 outline-btn-primary hover:bg-btn-primary/80",
  day_range_middle: "h-5 rounded-none bg-btn-primary hover:bg-btn-primary/80",
  nav_button_previous: "[&_svg]:h-3 [&_svg]:w-3",
  nav_button_next: "[&_svg]:h-3 [&_svg]:w-3",
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
