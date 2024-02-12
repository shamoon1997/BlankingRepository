import { useRef } from "react";
import {
  DateFieldStateOptions,
  useDateFieldState,
} from "@react-stately/datepicker";
import { DateValue, useDateField } from "@react-aria/datepicker";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { DateSegmentComponent } from "@/components/filters/calendar/date-segment.tsx";

export const DateField = (
  props: Omit<DateFieldStateOptions<DateValue>, "locale" | "createCalendar">,
) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    // <div className={`flex flex-col items-start ${props.className || ""}`}>
    <span className="flex  flex-col items-start border-b-[1px] border-b-[#5283ED] font-mont font-thin">
      <span {...labelProps} className="mb-[-4px] text-[8px] text-[#5283ED]">
        {props.label}
      </span>
      <div {...fieldProps} ref={ref} className="flex uppercase text-[#5283ED]">
        {state.segments.map((segment, i) => (
          <DateSegmentComponent key={i} segment={segment} state={state} />
        ))}
      </div>
    </span>
  );
};
