import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import {
  TimeFieldStateOptions,
  useTimeFieldState,
} from "@react-stately/datepicker";
import { TimeValue, useTimeField } from "@react-aria/datepicker";
import { DateSegmentComponent } from "./date-segment";

export const TimeField = (
  props: Omit<TimeFieldStateOptions<TimeValue>, "locale">,
) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <span className="flex max-w-min flex-col items-start border-b-[1px] border-b-[#5283ED] font-mont font-thin">
      <span {...labelProps} className="text-sm text-gray-800">
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
