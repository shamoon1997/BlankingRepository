import { ThickCalendarIcon, TimeIcon } from "@/assets";
import * as Tabs from "@radix-ui/react-tabs";
import React, { useState } from "react";
import { FilterCalendar } from "@/components/filters/calendar/filter-calendar.tsx";
import { fromUnixTime } from "date-fns";
import { useCalendarUrlState } from "@/hooks/calendar";
import { toSentenceCase } from "js-convert-case";
import { CustomTimeRanges } from "@/components/filters/calendar/custom-time-ranges.tsx";
import { formatInTimeZone } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import { useCalendarTimeZone } from "@/state";

const CalendarInput: React.FC = () => {
  const { validatedCalendarUrlState } = useCalendarUrlState();
  const [currentTab, setCurrentTab] = useState<"custom" | "default">("default");
  const [open, setOpen] = useState(false);
  const timeZone = useCalendarTimeZone();

  let from;
  if (typeof validatedCalendarUrlState.from === "number") {
    from = formatInTimeZone(
      fromUnixTime(validatedCalendarUrlState.from),
      timeZone,
      "MM/dd/yyyy hh:mm a",
      { locale: enUS },
    );
  } else {
    from = toSentenceCase(validatedCalendarUrlState.from);
  }

  let to;
  if (typeof validatedCalendarUrlState.to === "number") {
    to = formatInTimeZone(
      fromUnixTime(validatedCalendarUrlState.to),
      timeZone,
      "MM/dd/yyyy hh:mm a",
      { locale: enUS },
    );
  } else {
    to = toSentenceCase(validatedCalendarUrlState.to);
  }

  return (
    <>
      {/*trigger*/}
      <div
        onClick={() => setOpen(!open)}
        className={`pointer-events-auto flex  shrink-0 flex-col rounded border-[0.5px] border-default   bg-white font-mont tracking-[-0.5px]  shadow-dropdown `}
      >
        <div className="flex h-[38px] min-h-[38px] flex-1 cursor-pointer items-center pl-2 pr-2">
          <div className="mr-[11px] [&_svg]:h-[15px] [&_svg]:w-[15px]">
            <TimeIcon />
          </div>

          <div className="flex flex-col self-start">
            <p className="tracking-[-0.4px]; h-[12px] text-left text-[10px] font-semibold text-primary-blue">
              From
            </p>
            <div className="flex items-center gap-1 font-normal text-primary-hard">
              <p className="w-[130px] text-[12px]">{from ?? "DD/MM/YYYY"}</p>
              <ThickCalendarIcon className="mb-[1px]  w-[9px]" />
            </div>
          </div>

          <div className="ml-[17px] flex flex-col self-start">
            <p className="tracking-[-0.4px]; h-[12px] text-left text-[10px] font-semibold text-primary-blue">
              To
            </p>
            <div className="flex items-center gap-1 font-normal  text-primary-hard">
              <p className="w-[130px] text-[12px]">{to ?? "DD/MM/YYYY"}</p>
              <ThickCalendarIcon className="mb-[1px]  w-[9px]" />
            </div>
          </div>
          {/*TODO: maybe put back*/}
          {/*<div className="self-start">*/}
          {/*  <div className="h-[14px]" />*/}
          {/*  <div className="ml-3 mr-2 h-4 w-4 shrink-0">*/}
          {/*    <ChevronIcon className={`${open ? "rotate-0" : "rotate-180"}`} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {open && (
          <div className="w-full rounded bg-white">
            <Tabs.Root
              onValueChange={(e) => {
                setCurrentTab(e as "default" | "custom");
              }}
              value={currentTab}
              onClick={(e) => e.stopPropagation()}
            >
              <Tabs.List className="flex border-b-[0.5px] border-slate-200 pt-2">
                <Tabs.Trigger
                  className="group flex-1 justify-center"
                  value="default"
                >
                  <span className="inline-block h-[22px] min-w-min border-b-[2px] border-transparent text-[11px] font-semibold group-data-[state=active]:border-b-[1.5px] group-data-[state=active]:border-primary-blue group-data-[state=active]:text-primary-blue">
                    Default
                  </span>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="group flex-1 justify-center"
                  value="custom"
                >
                  <span className="inline-block h-[22px] min-w-min border-b-[2px] border-transparent text-[11px] font-semibold  group-data-[state=active]:border-b-[1.5px] group-data-[state=active]:border-primary-blue group-data-[state=active]:text-primary-blue">
                    Custom
                  </span>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="default">
                <CustomTimeRanges onApply={() => setOpen(false)} />
              </Tabs.Content>
              <Tabs.Content value="custom">
                <div className="px-[8px] py-[7px]">
                  <FilterCalendar onApply={() => setOpen(false)} />
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        )}
      </div>

      {/*content*/}
      {}
    </>
  );
};

export default CalendarInput;
