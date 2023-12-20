import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useSearchParams } from "react-router-dom";
import PoleViewTabGroupContent from "./pole-view-tab-group-content";
import { useGetPoleView } from "@/api/hooks/poles/use-get-pole-view";
import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { PoleViewResponse } from "@/api/types/types";
import { useSelectedPoles } from "@/state";

const PoleViewTabGroup: React.FC = () => {
  const [deviceIds, setDeviceIds] = useState<string[]>();
  const { data, error, isLoading } = useGetPoleView(deviceIds);
  const [poleDevices, setPoleDevices] = useState<
    PoleViewResponse | undefined
  >();
  const poleIds = useSelectedPoles();

  console.log("data", data);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Get all values for the 'deviceId' key using getAll

    const deviceIdFromSearchParams = searchParams.getAll("deviceId");

    if (deviceIdFromSearchParams.length > 0) {
      // Now you can pass the deviceIds to your custom component for making the API call
      console.log("Device IDs:", deviceIdFromSearchParams);
      setDeviceIds(deviceIdFromSearchParams);
      // Example: Call your API component with the deviceIds
      // <YourApiCallComponent deviceIds={deviceIdFromSearchParams} />
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log("data: ", data);
      setPoleDevices(data);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    console.log("poleIds:", poleIds);
  }, [poleIds]);

  return (
    <div>
      <Tabs.Root className="flex w-[300px] flex-col font-mont">
        <Tabs.List
          className="flex shrink-0 gap-[7px] border-b"
          aria-label="Manage your account"
        >
          {poleDevices?.map((poleDevice) => {
            return (
              <Tabs.Trigger
                className="group relative flex h-[31px] flex-1 select-none flex-col justify-center rounded-t-md bg-white px-[15px] text-[12px] leading-none text-poleViewBlue outline-none"
                value={poleDevice.device_sn}
              >
                <p className="mb-[1px] font-semibold">{poleDevice.device_sn}</p>
                <p className="text-[6px]">
                  {stripZeros(poleDevice.hardware_id)}
                </p>
                <div className="absolute left-0 h-[17px] w-[2px] rounded-r-lg bg-blue-500 group-data-[state=inactive]:hidden" />
                {/* TO BE ADDED AS THAT CURVY BORDER */}
                <div className="absolute bottom-0 right-0 h-[4px] w-[4px] bg-red-500 group-data-[state=inactive]:hidden" />
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {poleDevices?.map((poleDevice) => {
          return (
            <Tabs.Content
              className="min-h-[613px] w-[958px] grow gap-x-[31px] rounded-md rounded-tl-none bg-white px-[26px] py-[22px] shadow-md"
              value={poleDevice.device_sn}
            >
              <PoleViewTabGroupContent poleDevice={poleDevice} />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </div>
  );
};

export default PoleViewTabGroup;
