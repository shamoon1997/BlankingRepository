import { CalendarIcon, ChevronIcon } from "@/assets";
import { dateFormats, defaultDateDropdownOptions } from "@/constants";
import { formateDate, subtractFromCurrentDate } from "@/utils/helpers";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tabs from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { DateRangeCalendar } from "..";

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

  useEffect(() => {
    const fromDate = Number(searchParams.get(RangeParams.from));
    const toDate = Number(searchParams.get(RangeParams.to));
    const isCustom = searchParams.get(RangeParams.custom) === "true";

    if (fromDate && toDate && isCustom)
      return setRange({ from: new Date(+fromDate), to: new Date(+toDate) });

    if (!isCustom) setRange(undefined);
  }, [searchParams]);

  const fromDate = range?.from && formateDate(range.from, dateFormats.ddmmyyyy);
  const toDate = range?.to && formateDate(range.to, dateFormats.ddmmyyyy);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="inline-flex min-h-[37px] min-w-[200px] cursor-pointer items-center rounded-lg border border-slate-300 py-1">
            <div className="flex w-full items-center px-0">
              <div className="px-2 [&_svg]:h-[15px] [&_svg]:w-[15px]">
                <CalendarIcon />
              </div>

              {defaultFilter?.length && (
                <div>
                  <p className="text-left text-[8px] font-semibold text-blue-400">
                    {
                      defaultDateDropdownOptions?.find(
                        (item) => item?.type === defaultFilter,
                      )?.title
                    }
                  </p>
                  <p className="text-left text-[10px]">
                    {formateDate(new Date(), dateFormats.ddmmyyyy)}
                  </p>
                </div>
              )}

              {!defaultFilter?.length && (
                <div>
                  <p className="text-left text-[8px] font-semibold text-blue-400">
                    From
                  </p>
                  <p className="text-[10px]">{fromDate ?? "DD/MM/YYYY"}</p>
                </div>
              )}
            </div>

            {!defaultFilter?.length && (
              <div className="px-4">
                <p className="text-left text-[8px] font-semibold text-blue-400">
                  To
                </p>
                <p className="text-[10px]">{toDate ?? "DD/MM/YYYY"}</p>
              </div>
            )}
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

                      subtractFromCurrentDate(value);

                      searchParams.delete(RangeParams.from);
                      searchParams.delete(RangeParams.to);
                      searchParams.delete(RangeParams.custom);

                      searchParams.set(RangeParams.type, `${label}`);
                      setSearchParams(searchParams);
                    }}
                  >
                    {defaultDateDropdownOptions.map((option) => {
                      return (
                        <li
                          className="flex items-center gap-2 py-1"
                          key={option.title}
                        >
                          <input
                            type="radio"
                            value={JSON.stringify(option.duration)}
                            name="custom-time"
                            defaultChecked={
                              searchParams.get("type") === option.type
                            }
                            aria-label={option.type}
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
