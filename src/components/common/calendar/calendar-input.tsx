import {
  CalendarIcon,
  ChevronIcon,
  ThickCalendarIcon,
  TimeIcon,
} from "@/assets";
import { dateFormats, defaultDateDropdownOptions } from "@/utils/date";
import { formatDate, subtractFromCurrentDate } from "@/utils/date";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { DateRangeCalendar } from "..";
import { Button } from "@/components/common";
import * as Slider from "@radix-ui/react-slider";

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  sub,
} from "date-fns";
import { da } from "date-fns/locale";

enum RangeParams {
  from = "from",
  to = "to",
  custom = "custom",
  type = "type",
}

const CalendarInput: React.FC = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilter = searchParams.get(RangeParams.type);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fromDate = Number(searchParams.get(RangeParams.from));
    const toDate = Number(searchParams.get(RangeParams.to));
    const isCustom = searchParams.get(RangeParams.custom) === "true";

    if (fromDate && toDate && isCustom)
      return setRange({ from: new Date(+fromDate), to: new Date(+toDate) });

    if (!isCustom) setRange(undefined);
  }, [searchParams]);

  const fromDate = range?.from && formatDate(range.from, dateFormats.ddmmyyyy);
  const toDate = range?.to && formatDate(range.to, dateFormats.ddmmyyyy);

  const today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMMM-yyyy"));

  const firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date());
  console.log(currentMonth);

  const nextMonth = () => {
    const next = parse(currentMonth, "MMMM-yyyy", new Date());
    const r = add(next, { months: 1 });
    setCurrentMonth(format(r, "MMMM-yyyy"));
  };

  const prevMonth = () => {
    const next = parse(currentMonth, "MMMM-yyyy", new Date());
    const r = sub(next, { months: 1 });
    setCurrentMonth(format(r, "MMMM-yyyy"));
  };

  const daysOfThisMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  });

  return (
    <>
      {/*trigger*/}
      <div
        onClick={() => setOpen(!open)}
        className={`flex  shrink-0 flex-col rounded border-[0.5px] border-default   bg-white font-mont tracking-[-0.5px]  shadow-dropdown `}
      >
        <div className="flex h-[38px] min-h-[38px] flex-1 cursor-pointer items-center pl-2 pr-2">
          <div className="mr-[11px] [&_svg]:h-[15px] [&_svg]:w-[15px]">
            <TimeIcon />
          </div>

          {!defaultFilter?.length && (
            <div className="flex flex-col self-start">
              <p className="tracking-[-0.4px]; h-[12px] text-left text-[10px] font-semibold text-primary-blue">
                From
              </p>
              <div className="flex items-center gap-1 font-normal text-primary-hard">
                <p className="min-w-[64px]  text-[12px]">
                  {fromDate ?? "DD/MM/YYYY"}
                </p>

                <ThickCalendarIcon className="mb-[1px] w-[9px]" />
              </div>
            </div>
          )}

          <div className="ml-[31px] shrink-0 self-start text-primary-hard">
            <div className="h-[12px]" />
            <p className="self-center text-[12px] font-normal">11:40 PM</p>
          </div>

          {!defaultFilter?.length && (
            <div className="ml-[17px] flex flex-col self-start">
              <p className="tracking-[-0.4px]; h-[12px] text-left text-[10px] font-semibold text-primary-blue">
                To
              </p>
              <div className="flex items-center gap-1 font-normal  text-primary-hard">
                <p className="min-w-[64px] text-[12px]">
                  {toDate ?? "DD/MM/YYYY"}
                </p>
                <ThickCalendarIcon className="mb-[1px] w-[9px]" />
              </div>
            </div>
          )}

          <div className="ml-[31px] shrink-0 self-start">
            <div className="h-[12px]" />
            <p className="self-center text-[12px] font-normal">11:54 PM</p>
          </div>

          {/*<div className="self-start">*/}
          {/*  <div className="h-[14px]" />*/}
          {/*  <div className="ml-2 mr-2 h-4 w-4 shrink-0">*/}
          {/*    <ChevronIcon className={`${open ? "rotate-0" : "rotate-180"}`} />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {open && (
          <div className="w-full rounded bg-white">
            <Tabs.Root
              defaultValue="default"
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
              <Tabs.Content className="px-[9px] py-[11px]" value="default">
                <form
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(e);
                    const target = e.target as HTMLInputElement;
                    const label = target.ariaLabel;

                    const value: Duration = JSON.parse(
                      target.value,
                    ) as Duration;

                    subtractFromCurrentDate(value);

                    searchParams.delete(RangeParams.from);
                    searchParams.delete(RangeParams.to);
                    searchParams.delete(RangeParams.custom);

                    searchParams.set(RangeParams.type, `${label}`);
                    setSearchParams(searchParams);
                  }}
                >
                  <ul className="grid w-[95%] grid-cols-2 gap-x-4 gap-y-1">
                    {defaultDateDropdownOptions.map((option) => {
                      return (
                        <li
                          className="flex items-center gap-[10px] px-[10px] py-[5px] text-[12px]"
                          key={option.title}
                        >
                          <input
                            type="radio"
                            value={option.type}
                            id={option.type}
                            name="custom-time"
                            className="cursor-pointer accent-primary-blue"
                            defaultChecked={
                              searchParams.get("type") === option.type
                            }
                            aria-label={option.type}
                          />

                          <label htmlFor={option.type}>{option.title}</label>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mb-[15px] ml-[11px] mr-[11px] mt-[13px] text-[11px]">
                    <span className="text-[#16161680]">Current Time: </span>
                    <span>12/01/2023 11:45</span>
                  </p>
                </form>
                <button className="flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white">
                  Confirm
                </button>
              </Tabs.Content>
              <Tabs.Content value="custom">
                <div className="px-[8px] py-[7px]">
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <p className="font-semibold text-[#5B5B5B]">
                        {format(firstDayOfCurrentMonth, "MMMM yyyy")}
                      </p>
                      <div className="flex items-center gap-[5px] text-[10px]">
                        <button
                          onClick={prevMonth}
                          className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
                        >
                          <ChevronIcon className={"-rotate-90"} />
                        </button>
                        <button
                          onClick={nextMonth}
                          className="h-[16px] w-[16px] rounded-[2px] bg-[#F3F3F3]"
                        >
                          <ChevronIcon className={"rotate-90"} />
                        </button>
                      </div>
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
                      console.log({ day });
                      return (
                        <button
                          className={`flex h-[35px] w-full items-start justify-start rounded-[2px] border-[0.5px] border-solid  pl-[5px]  text-[11px] font-normal
                          ${
                            !isToday(day) &&
                            !isSameMonth(day, firstDayOfCurrentMonth)
                              ? "text-gray-300"
                              : ""
                          }
                          ${
                            isToday(day)
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

                  <p className="mb-[5px] text-center text-[11px] font-semibold text-primary-blue">
                    Time Selector
                  </p>
                  <div className="flex items-center justify-between text-center text-[11px] font-semibold text-btn-primary">
                    <p>12/09/2023 10:34 PM</p>
                    <div className="h-[1px] w-[5px] bg-black" />
                    <p>12/09/2023 11:45 PM</p>
                  </div>

                  <Slider.Root
                    min={0}
                    max={100}
                    defaultValue={[25, 75]}
                    minStepsBetweenThumbs={5}
                    className="relative flex h-[28px] w-full touch-none select-none items-center rounded border-[0.5px] border-solid border-[#D9D9D9] bg-white"
                  >
                    <Slider.Track>
                      <Slider.Range className="absolute  top-0  h-[27px]  rounded-[3px] border-b-[1px] border-t-[1px] border-btn-primary bg-[#F11F1F80] " />
                    </Slider.Track>
                    <Slider.Thumb className=" flex h-[27px] w-3 cursor-grab items-center justify-center gap-[2px] rounded-bl-[3px] rounded-tl-[3px] bg-btn-primary">
                      <div className="h-[10px] w-[1px] bg-white" />
                      <div className="h-[10px] w-[1px] bg-white" />
                    </Slider.Thumb>
                    <Slider.Thumb className="flex h-[27px] w-3  cursor-grab items-center justify-center gap-[2px] rounded-br-[3px] rounded-tr-[3px] bg-btn-primary">
                      <div className="h-[10px] w-[1px] bg-white" />
                      <div className="h-[10px] w-[1px] bg-white" />
                    </Slider.Thumb>
                  </Slider.Root>

                  <p className="mb-[15px] ml-[11px] mr-[11px] mt-[13px] text-[11px]">
                    <span className="text-[#16161680]">Current Time: </span>
                    <span>12/01/2023 11:45</span>
                  </p>
                  <button className="flex h-7 w-full items-center justify-center rounded-[5px] bg-btn-primary text-xs font-semibold text-white">
                    Confirm
                  </button>
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
