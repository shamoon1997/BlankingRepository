import { useRef } from "react";
import {
  DateFieldState,
  DateSegment,
  TimeFieldState,
} from "@react-stately/datepicker";
import { useDateSegment } from "@react-aria/datepicker";

export const DateSegmentComponent = ({
  segment,
  state,
}: {
  state: TimeFieldState | DateFieldState;
  segment: DateSegment;
}) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        // minWidth:
        //   segment.maxValue != null && String(segment.maxValue).length + "ch",
      }}
      className={`group  text-center text-[10px] outline-none focus:bg-[#5283ED] focus:text-white ${
        !segment.isEditable ? "text-gray-500" : "text-[#5283ED]"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center text-[10px] text-[#5283ED] group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};
