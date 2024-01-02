import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import MetricsDataTab from "./metrics-data-tab";

const tabOptionsList: { title: string; key: string }[] = [
  { title: "Metric Data", key: "metric" },
  { title: "Per-Blob Data", key: "per-blob-data" },
  { title: "High-res Data", key: "high-res-data" },
  { title: "Photos", key: "photos" },
];

export const DeviceData = () => {
  const [currentTab, setCurrentTab] = useState<string>("metric");

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

          <Tabs.Content value="metric">
            <MetricsDataTab />
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
