import { HistoryIcon, EditIcon, AddIcon } from "@/assets";
import * as Tabs from "@radix-ui/react-tabs";

type NotesTabProps = {
  vegetationNotes: string;
  installationNotes: string;
};

const NoteTabs = ({ vegetationNotes, installationNotes }: NotesTabProps) => {
  const tabs = ["Recent Notes", "Vegetation Notes", "Installation Notes"];
  return (
    <div className="mt-[10px] w-full">
      <div className="relative flex">
        <Tabs.Root defaultValue="Recent Notes" className="w-full">
          <div className="overflow-x-auto overflow-y-hidden">
            <Tabs.List className="flex w-full items-center gap-[30px] border-b-2 border-solid border-[#D9D9D9] pr-[190px]">
              {tabs.map((tab) => {
                return (
                  <Tabs.Trigger
                    value={tab}
                    className="relative whitespace-nowrap py-[11px] font-mont text-xs font-semibold leading-normal tracking-[-0.6px] text-[#8a8a8a] before:absolute before:bottom-[-2px] before:left-0 before:right-0 before:z-[1] before:h-0.5 before:bg-transparent data-[state=active]:border-[#628fee] data-[state=active]:text-[#628fee] data-[state=active]:before:bg-[#628fee]"
                  >
                    {tab}
                  </Tabs.Trigger>
                );
              })}
            </Tabs.List>
          </div>

          <Tabs.Content value="Recent Notes" className="py-5">
            <div className="font-mont text-xs font-semibold leading-[normal] tracking-[-0.6px] text-[#161616]">
              Recent Notes
            </div>
          </Tabs.Content>

          <Tabs.Content value="Vegetation Notes" className="py-5">
            <div className="font-mont text-xs font-semibold leading-[normal] tracking-[-0.6px] text-[#161616]">
              {vegetationNotes}
            </div>
          </Tabs.Content>

          <Tabs.Content value="Installation Notes" className="py-5">
            <div className="font-mont text-xs font-semibold leading-[normal] tracking-[-0.6px] text-[#161616]">
              {installationNotes}
            </div>
          </Tabs.Content>
        </Tabs.Root>
        <div className="absolute right-0 top-[13px] flex items-center gap-5 bg-white pl-3">
          <div className="flex items-center gap-[5px]">
            <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
              <HistoryIcon />
            </div>
            <div className="font-mont text-[10px] font-semibold leading-normal tracking-[-0.5px] text-[#161616]">
              History
            </div>
          </div>

          <div className="flex items-center gap-[5px]">
            <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
              <EditIcon />
            </div>
            <div className="font-mont text-[10px] font-semibold leading-normal tracking-[-0.5px] text-[#161616]">
              Edit
            </div>
          </div>

          <div className="flex items-center gap-[5px]">
            <div className="[&_svg]:h-2.5 [&_svg]:w-2.5">
              <AddIcon />
            </div>
            <div className="font-mont text-[10px] font-semibold leading-normal tracking-[-0.5px] text-[#161616]">
              Add
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteTabs;
