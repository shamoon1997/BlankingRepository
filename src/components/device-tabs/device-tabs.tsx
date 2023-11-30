import * as Tabs from "@radix-ui/react-tabs";

const DeviceTabs: React.FC = () => {
  const tabs = [
    "Alerts",
    "Metric Data",
    "Per-Blob Stats",
    "High-res Data",
    "Photos",
  ];

  return (
    /* Have given width 99% and m-2 so that box shadow is visible for testing*/
    <div className="shadow-device-data m-2 box-border flex w-[99%] flex-shrink-0 flex-col rounded-md bg-white">
      <div className=" flex w-full flex-shrink-0  p-4 px-5">
        <div className="ml-1 font-mont text-[15px] font-semibold leading-normal tracking-wide text-[#161616]">
          Device Data
        </div>
      </div>
      <div className="mb-2 h-[0.5px] w-full border-b border-solid border-[#d9d9d9]"></div>
      <div className="mt-1">
        <Tabs.Root defaultValue="Alerts">
          <Tabs.List className="flex gap-[30px] overflow-x-auto px-6">
            {tabs.map((tab) => {
              return (
                <Tabs.Trigger
                  value={tab}
                  className="whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[12px] font-semibold leading-[100%] text-[#16161680] data-[state=active]:text-[#628fee]"
                >
                  {tab}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>
          <div className="mt-2 h-[0.5px] w-full border-b border-solid border-[#d9d9d9]"></div>

          <Tabs.Content value="Alerts">
            <div className="p-1 font-mont text-[10px] font-normal text-[#5B5B5B]">
              Sample Alerts
            </div>
          </Tabs.Content>

          <Tabs.Content value="Metric Data">
            <div className="p-1 font-mont text-[10px] font-normal text-[#5B5B5B]">
              Metric Data
            </div>
          </Tabs.Content>

          <Tabs.Content value="Per-Blob Stats">
            <div className="p-1 font-mont text-[10px] font-normal text-[#5B5B5B]">
              Per-Blob Stats
            </div>
          </Tabs.Content>

          <Tabs.Content value="High-res Data">
            <div className="p-1 font-mont text-[10px] font-normal text-[#5B5B5B]">
              High-res Data
            </div>
          </Tabs.Content>

          <Tabs.Content value="Photos">
            <div className="p-1 font-mont text-[10px] font-normal text-[#5B5B5B]">
              Photos
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default DeviceTabs;
