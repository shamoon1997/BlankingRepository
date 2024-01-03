import { ChevronIcon, CrossIcon, SearchIcon } from "@/assets";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { LocationIcon } from "@/assets/pole-view";

const MetricsDataTab: React.FC = () => {
  return (
    <>
      <div className="mt-[12px] flex w-full justify-between px-4">
        <div className="flex gap-x-[10px]">
          <div className="grid h-[30px] w-[30px] cursor-pointer place-content-center rounded border-[2px] p-[10px]">
            <SearchIcon className="h-[12px] w-[12px]" />
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div>
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div>
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">Device</div>
            <div className="text-[10px] font-semibold text-black">Map(#)</div>
          </div>

          <div className="flex w-[120px] items-center justify-between rounded border-[2px] px-[10px]">
            <div className="text-[10px] text-[#8B8B8B]">All data types</div>
            <div className="rotate-180 [&_svg]:h-[12px] [&_svg]:w-[12px]">
              <ChevronIcon />
            </div>
          </div>

          <div className="w-[154px]">
            <ToggleGroup.Root
              className="inline-flex h-[30px] w-full justify-between rounded-sm "
              type="single"
              defaultValue="center"
              aria-label="Text alignment"
            >
              <ToggleGroup.Item
                value="1"
                className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
                aria-label="Left aligned"
              >
                1
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="2"
                className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
                aria-label="Center aligned"
              >
                2
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="3"
                className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
                aria-label="Center aligned"
              >
                3
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="4"
                className="grid w-full place-content-center border-[2px] bg-white p-[10px] text-base first:rounded-l last:rounded-r hover:bg-blue-100 focus:outline-none data-[state=on]:border-[#5283ED] data-[state=on]:bg-[#DBE6FF]"
                aria-label="Right aligned"
              >
                4
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>

        <button className="grid h-[32px] w-[130px] place-content-center rounded-sm bg-[#EDEDED] text-[8px]">
          Exfil Per-Blob
        </button>
      </div>

      <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

      {/* ACCORDIONS */}

      <Accordion.Root
        className="mt-[15px] flex w-full flex-col gap-[10px] rounded-md  px-4"
        type="multiple"
      >
        <Accordion.Item
          className="bg-[#F5F5F5] px-[12px] py-[10px] text-[12px]"
          value="item-1"
        >
          <Accordion.Trigger className="group">
            <div className="flex items-center gap-[20px]">
              <div className="h-[12px] w-[12px] group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0">
                <ChevronIcon />
              </div>
              Is it accessible?
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="mt-[12px] h-[0.5px] w-full bg-[#D9D9D9]" />

            <div className="flex justify-between">
              <img src="/images/mock-metric-data-img.png" alt="" />

              <div className="flex w-[207px] flex-col">
                <h3 className="mb-[8px]">Graph View</h3>

                <div className="mb-[8px] flex items-center gap-[5px]">
                  <input
                    className="h-[25px] w-[180px] rounded-md border-[0.8px] border-[#CCCCCC] px-[10px] py-[6px] text-[8px]"
                    type="text"
                    placeholder="Search to add device"
                  />
                  <button className="grid h-[25px] w-[25px] place-content-center rounded-md bg-[#3B3C4F]">
                    <div className="h-[12px] w-[12px] [&_path]:fill-white [&circle]:stroke-white ">
                      <SearchIcon />
                    </div>
                  </button>
                </div>

                <h3 className="mb-[3px] text-[8px]">
                  Deployment: Birmingham (10)
                </h3>

                <div>
                  {/* SELECTED HERE */}

                  <div className="mb-[8px] flex items-center gap-[5px]">
                    <div className="flex h-[25px] w-[180px] items-center overflow-hidden rounded-md border-[0.8px] border-[#CCCCCC] bg-white text-[8px]">
                      <div className="grid h-[25px] w-[25px] place-content-center bg-blue-400 [&_path]:fill-white">
                        <LocationIcon />
                      </div>

                      <p className="ml-[6px] font-medium">GS124• 4024 • Lora</p>
                    </div>
                    <button className="grid h-[25px] w-[25px] place-content-center rounded-md border-[0.8px] border-[#CCCCCC] bg-white">
                      <div className="grid h-[12px] w-[12px] rotate-45 place-content-center ">
                        <CrossIcon />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          className="bg-[#F5F5F5] px-[12px] py-[10px] text-[12px]"
          value="item-2"
        >
          <Accordion.Trigger className="group">
            <div className=" flex items-center gap-[20px]">
              <div className="h-[12px] w-[12px] group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0">
                <ChevronIcon />
              </div>
              Is it unstyled?
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            Yes. It's unstyled by default, giving you freedom over the look and
            feel.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          className="bg-[#F5F5F5] px-[12px] py-[10px] text-[12px]"
          value="item-3"
        >
          <Accordion.Trigger className="group">
            <div className="flex items-center gap-[20px]">
              <div className="h-[12px] w-[12px] group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0">
                <ChevronIcon />
              </div>
              Can it be animated?
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            Yes! You can animate the Accordion with CSS or JavaScript.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
};

export default MetricsDataTab;
