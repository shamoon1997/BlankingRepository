import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

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
            className="text-poleViewBlue group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md bg-white px-[15px] text-[12px] leading-none outline-none"
            value="tab1"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-blue-500 group-data-[state=inactive]:hidden" />
            <div className="absolute bottom-0 right-0 h-[4px] w-[4px] bg-red-500 group-data-[state=inactive]:hidden" />
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-poleViewRed group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md px-[15px] text-[12px] leading-none text-white outline-none"
            value="tab2"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-white group-data-[state=inactive]:hidden" />
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-poleViewGreed group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md px-[15px] text-[12px] leading-none text-white outline-none"
            value="tab3"
          >
            <p className="mb-[1px] font-semibold">GS1245</p>
            <p className="text-[6px]">15351421535142</p>
            <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-white group-data-[state=inactive]:hidden" />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="min-h-[613px] w-[958px] grow rounded-md bg-slate-100 px-[26px] py-[22px]"
          value="tab1"
        >
          <div className="flex gap-[15px]">
            {[...Array(4)]?.map((_, i) => {
              return (
                <div
                  className="flex h-[45px] w-[106px] flex-col rounded-md border border-[#5B5B5B80] px-[11px] py-[6px]"
                  key={`stats-${i}`}
                >
                  <p className="text-[10px] text-[#16161680]/50">
                    Connectivity
                  </p>
                  <div className="inline-flex items-center text-[10px] font-bold">
                    <div className="mr-[5px] h-[7px] w-[7px] rounded bg-online" />{" "}
                    Online
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-[30px] mt-[20px] max-w-[638px]">
            <p className="text-poleViewBlue mb-[15px] text-[12px] font-bold">
              Basic info
            </p>

            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
              {[...Array(7)]?.map((_, i) => {
                return (
                  <div className="flex flex-col" key={`info-${i}`}>
                    <p className="text-[10px] font-bold text-[#16161680]/50">
                      Serial
                    </p>
                    <p className="text-[12px] font-bold">GS1245</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="max-w-[638px]">
            <p className="text-poleViewBlue mb-[15px] text-[12px] font-bold">
              Meta data
            </p>

            <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
              {[...Array(14)]?.map((_, i) => {
                return (
                  <div className="flex flex-col" key={`info-${i}`}>
                    <p className="text-[10px] font-bold text-[#16161680]/50">
                      ICCID
                    </p>
                    <p className="text-[12px] font-bold">123687219046891121</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content
          className="min-h-[613px] w-[958px] grow rounded-md bg-slate-100 px-[26px] py-[22px]"
          value="tab2"
        >
          <p>Hi</p>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default PoleViewTabGroup;
