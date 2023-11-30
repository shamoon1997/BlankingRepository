import React from "react";
import { HistoryIcon, EditIcon, AddIcon } from "@/assets";
import * as Tabs from "@radix-ui/react-tabs";

const NotesData: React.FC = () => {
  const tabs = ["Recent Notes", "Vegetation Notes", "Installation Notes"];
  return (
    <div className="shadow-device-data m-2 flex w-[99%] flex-shrink-0 justify-between">
      <div className="flex flex-col items-center justify-center">
        <Tabs.Root defaultValue="Recent Notes">
          <Tabs.List className="flex items-center justify-center gap-[30px] overflow-x-auto px-6">
            {tabs.map((tab) => {
              return (
                <Tabs.Trigger
                  value={tab}
                  className="whitespace-nowrap border-b border-solid border-transparent py-[7px] font-mont text-[12px] font-semibold leading-[100%] text-[#16161680] data-[state=active]:border-[#628fee] data-[state=active]:text-[#628fee]"
                >
                  {tab}
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          <Tabs.Content value="Recent Notes">
            <div>Recent Notes</div>
          </Tabs.Content>

          <Tabs.Content value="Vegetation Notes">
            <div>Vegetation Notes</div>
          </Tabs.Content>

          <Tabs.Content value="Installation Notes">
            <div>Installation Notes</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div className="flex gap-[20px] px-6">
        <div className="flex flex-shrink-0 items-center justify-center gap-[5px]">
          <div className="[&_svg]:h-[13px] [&_svg]:w-[13px]">
            <HistoryIcon />
          </div>
          <div className="font-mont text-[10px] font-semibold leading-normal tracking-tight text-[#161616]">
            History
          </div>
        </div>

        <div className="flex items-center justify-center gap-[5px]">
          <div className="[&_svg]:h-[13px] [&_svg]:w-[13px]">
            <EditIcon />
          </div>
          <div className="font-mont text-[10px] font-semibold leading-normal tracking-tight text-[#161616]">
            Edit
          </div>
        </div>

        <div className="flex items-center justify-center gap-[5px]">
          <div className="[&_svg]:h-[13px] [&_svg]:w-[13px]">
            <AddIcon />
          </div>
          <div className="font-mont text-[10px] font-semibold leading-normal tracking-tight text-[#161616]">
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesData;
