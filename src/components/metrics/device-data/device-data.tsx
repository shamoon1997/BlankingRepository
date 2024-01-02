import { SearchIcon } from "@/assets";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";

const tabOptionsList: { title: string; key: string }[] = [
  { title: "Metric Data", key: "metric" },
  { title: "Per-Blob Data", key: "per-blob-data" },
  { title: "High-res Data", key: "high-res-data" },
  { title: "Photos", key: "photos" },
];

export const DeviceData = () => {
  const [currentTab, setCurrentTab] = useState<string>("");

  return (
    <div className="flex h-screen w-screen flex-col font-mont text-[#161616]">
      <div className="flex p-4">
        <div className="text-[15px] font-semibold leading-normal tracking-tight">
          Device Data
        </div>
      </div>
      <div className="mt-2 h-[0.5px] w-screen bg-[#D9D9D9]" />
      <div className="flex px-4">
        <Tabs.Root
          defaultValue="metric"
          onValueChange={(e) => setCurrentTab(e)}
          value={currentTab}
        >
          <Tabs.List className="flex gap-x-[30px] pt-2">
            {tabOptionsList.map((tab) => {
              const { key, title } = tab;
              return (
                <Tabs.Trigger
                  className="group flex justify-center"
                  value={key}
                  key={key}
                >
                  <span className="inline-block h-[22px] min-w-min border-b-[2px] border-transparent text-[12px] font-semibold text-primary-soft  group-data-[state=active]:text-primary-blue">
                    {title}
                  </span>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <div className="ml-[-16px] mt-2 h-[0.5px] w-screen bg-[#D9D9D9]" />

          <div className="flex gap-x-[30px]">
            <div className="mt-1 w-[30px] rounded border-[2px] p-1">
              <SearchIcon className="mt-[5.4px] h-[18px] w-[18px] shrink-0 self-start" />
            </div>

            <div className="mt-1 flex w-[120px] gap-x-[20px] rounded border-[2px] p-1">
              <div className="text-[10px] text-[#8B8B8B]">Device</div>
              <div className="text-[10px] text-[#8B8B8B]">Map(#)</div>
            </div>
          </div>

          <Tabs.Content value="default">
            <div>as</div>
          </Tabs.Content>

          <Tabs.Content value="per-blob-data">
            <div>per blob data</div>
          </Tabs.Content>

          <Tabs.Content value="high-res-data">
            <div>high res data</div>
          </Tabs.Content>

          <Tabs.Content value="photos">
            <div>photos</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};
