import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useSearchParams } from "react-router-dom";
import PoleViewTabGroupContent from "./pole-view-tab-group-content";
import { useGetPoleView } from "@/api/hooks/poles/use-get-pole-view";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";

const PoleViewTabGroup: React.FC = () => {
  const [deviceIds, setDeviceIds] = useState<string[]>([]);
  const { data, isLoading } = useGetPoleView(deviceIds);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const deviceIdFromSearchParams = searchParams.getAll("deviceId");

    if (deviceIdFromSearchParams.length > 0) {
      setDeviceIds(deviceIdFromSearchParams);
    }
  }, [searchParams]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <Tabs.Root className="flex w-full flex-col font-mont">
      <Tabs.List className="flex gap-[7px]">
        {data?.map((poleDevice) => {
          return (
            <Tabs.Trigger
              className="group relative flex h-[40px] max-w-min select-none flex-col justify-center rounded-t-md bg-white px-[15px] text-[14px] leading-none text-poleViewBlue outline-none"
              value={poleDevice.device_sn}
            >
              <p className="mb-[1px] font-semibold">{poleDevice.device_sn}</p>
              <p className="text-[8px]">{stripZeros(poleDevice.hardware_id)}</p>
              <div className="absolute left-0 h-[18px] w-[2px] rounded-r-lg bg-blue-500 group-data-[state=active]:visible group-data-[state=inactive]:invisible" />
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
      {data?.map((poleDevice) => {
        return (
          <Tabs.Content
            className="w-full grow rounded-md rounded-tl-none bg-white px-[26px] py-[22px] shadow-tab"
            value={poleDevice.device_sn}
          >
            <PoleViewTabGroupContent poleDevice={poleDevice} />
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
};

export default PoleViewTabGroup;
