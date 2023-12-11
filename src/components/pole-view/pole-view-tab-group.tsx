import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import PoleViewTabGroupContent from "./pole-view-tab-group-content";

const PoleViewTabGroup: React.FC = () => {
  return (
    <>
      <Tabs.Root
        className="flex w-[300px] flex-col font-mont"
        defaultValue="tab1"
      >
        <Tabs.List
          className="flex shrink-0 gap-[7px] border-b"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md bg-white px-[15px] text-[12px] leading-none text-poleViewBlue outline-none"
            value="tab1"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-blue-500 group-data-[state=inactive]:hidden" />
            {/* TO BE ADDED AS THAT CURVY BORDER */}
            {/* <div className="absolute bottom-0 right-0 h-[4px] w-[4px] bg-red-500 group-data-[state=inactive]:hidden" /> */}
          </Tabs.Trigger>
          <Tabs.Trigger
            className="group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md bg-poleViewRed px-[15px] text-[12px] leading-none text-white outline-none"
            value="tab2"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-white group-data-[state=inactive]:hidden" />
          </Tabs.Trigger>
          <Tabs.Trigger
            className="group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md bg-poleViewGreed px-[15px] text-[12px] leading-none text-white outline-none"
            value="tab3"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-white group-data-[state=inactive]:hidden" />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="min-h-[613px] w-[958px] grow gap-x-[31px] rounded-md rounded-tl-none bg-white px-[26px] py-[22px] shadow-md"
          value="tab1"
        >
          <PoleViewTabGroupContent />
        </Tabs.Content>
        <Tabs.Content
          className="min-h-[613px] w-[958px] grow gap-x-[31px] rounded-md rounded-tl-none bg-white px-[26px] py-[22px] shadow-md"
          value="tab2"
        >
          <PoleViewTabGroupContent />
        </Tabs.Content>
        <Tabs.Content
          className="min-h-[613px] w-[958px] grow gap-x-[31px] rounded-md rounded-tl-none bg-white px-[26px] py-[22px] shadow-md"
          value="tab3"
        >
          <PoleViewTabGroupContent />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default PoleViewTabGroup;
