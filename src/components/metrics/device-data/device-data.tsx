import * as Tabs from "@radix-ui/react-tabs";
import MetricsDataTab from "./metric-data/metrics-data-tab";
import { BlobTable } from "@/components/blob/blob-table/blob-table";
import {
  useDeviceDataControlActions,
  useDeviceDataControlState,
} from "@/state/device-data";

const tabOptionsList: { title: string; key: string }[] = [
  { title: "Metric Data", key: "metric" },
  { title: "Per-Blob Data", key: "per-blob-data" },
  { title: "High-res Data", key: "high-res-data" },
  { title: "Photos", key: "photos" },
];

export const DeviceData = () => {
  const { currentTab } = useDeviceDataControlState();
  const { setCurrentTab } = useDeviceDataControlActions();

  return (
    <div className="flex h-screen flex-col font-mont text-[#161616]">
      <div className="flex px-[26px] pb-[10px] pt-[20px]">
        <div className="text-[15px] font-semibold leading-normal tracking-tight">
          Device Data
        </div>
      </div>

      <div className="h-[0.5px] w-full bg-[#D9D9D9]" />

      <div className="flex">
        <Tabs.Root
          defaultValue="metric"
          className="w-full"
          onValueChange={(e) => setCurrentTab(e)}
          value={currentTab}
        >
          <Tabs.List className="flex gap-x-[30px] px-4 pt-2">
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

          <div className="mt-[6px] h-[0.5px] w-full bg-[#D9D9D9]" />

          <Tabs.Content className="w-full pb-5" value="metric">
            <MetricsDataTab />
          </Tabs.Content>

          <Tabs.Content className="w-full px-4" value="per-blob-data">
            <BlobTable />
          </Tabs.Content>

          <Tabs.Content className="w-full px-4" value="high-res-data">
            <div>high res data</div>
          </Tabs.Content>

          <Tabs.Content className="w-full px-4" value="photos">
            <div>photos</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};
