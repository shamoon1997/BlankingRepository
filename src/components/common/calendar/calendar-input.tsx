import { CalendarIcon, ChevronIcon } from "@/assets";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangeCalendar } from "..";
import { format, sub } from "date-fns";
import { useSearchParams } from "react-router-dom";

enum RangeParams {
  from = "from",
  to = "to",
  custom = "custom",
}

const defaultDateOptions = [
  { title: "Last 30 minutes", duration: { minutes: 30 } },
  { title: "Last hour", duration: { hours: 1 } },
  { title: "Last 3 hours", duration: { hours: 3 } },
  { title: "Last 6 hours", duration: { hours: 6 } },
  { title: "Last 12 hours", duration: { hours: 12 } },
  { title: "Today", duration: { hours: 24 } },
  { title: "Last 7 days", duration: { days: 7 } },
];

const getTimeDifference = (amount: Duration) => {
  const subtractedDate = sub(new Date(), amount);
  return subtractedDate;
};

const CalendarInput: React.FC = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [defaultSelected, setDefaultSelected] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fromDate = Number(searchParams.get(RangeParams.from));
    const toDate = Number(searchParams.get(RangeParams.to));
    const isCustom = Boolean(searchParams.get(RangeParams.custom));

    if (fromDate && toDate && isCustom)
      return setRange({ from: new Date(+fromDate), to: new Date(+toDate) });

    if (!isCustom) setRange(undefined);
  }, [searchParams]);

  const fromDate = range?.from && format(range.from, "dd/MM/yyyy");
  const toDate = range?.to && format(range.to, "dd/MM/yyyy");
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300  py-1">
            <div className="flex items-center px-0">
              <div className="px-2 [&_svg]:h-[15px] [&_svg]:w-[15px]">
                <CalendarIcon />
              </div>

              <div>
                <p className="text-left text-[8px] font-semibold text-blue-400">
                  From
                </p>
                <p className="text-[10px]">{fromDate ?? "DD/MM/YYYY"}</p>
              </div>
            </div>
            <div className="px-4">
              <p className="text-left text-[8px] font-semibold text-blue-400">
                To
              </p>
              <p className="text-[10px]">{toDate ?? "DD/MM/YYYY"}</p>
            </div>
            <div className="px-2 [&_svg]:rotate-180">
              <ChevronIcon />
            </div>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-2 w-full min-w-[360px] rounded-lg border border-slate-200 bg-white shadow-xl">
            <Tabs.Root defaultValue="1">
              <Tabs.List className="mb-2 flex justify-center gap-4 border-b-2 border-slate-200 pt-2">
                <Tabs.Trigger
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                  value="1"
                >
                  Default
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                  value="2"
                >
                  Custom
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content className="px-6 py-2" value="1">
                <ul>
                  <form
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const label = target.ariaLabel;

                      const value: Duration = JSON.parse(
                        target.value,
                      ) as Duration;

                      getTimeDifference(value);

                      setSearchParams({
                        from: String(getTimeDifference(value).getTime()),
                        to: String(new Date().getTime()),
                      });

                      setDefaultSelected(label ?? "");
                    }}
                  >
                    {defaultDateOptions.map((option) => {
                      return (
                        <li
                          className="flex items-center gap-2 py-1"
                          key={option.title}
                        >
                          <input
                            type="radio"
                            value={JSON.stringify(option.duration)}
                            name="custom-time"
                            checked={defaultSelected === option.title}
                            aria-label={option.title}
                          />
                          <p>{option.title}</p>
                        </li>
                      );
                    })}
                  </form>
                </ul>
              </Tabs.Content>
              <Tabs.Content
                className="grid place-content-center px-6 py-2"
                value="2"
              >
                <DateRangeCalendar range={range} setRange={setRange} />
              </Tabs.Content>
            </Tabs.Root>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  );
};

export default CalendarInput;
