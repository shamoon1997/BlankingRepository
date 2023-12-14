import { BaseLayerResponse } from "@/api/types/types.ts";

type AreaSummaryProps = {
  data: BaseLayerResponse | undefined;
};

export const AreaSummary = ({ data }: AreaSummaryProps) => {
  return (
    <div className="border-b-solid border-b-[0.5px] border-b-[#D9D9D9]  pb-4 pl-4 pr-4">
      <p className="mb-4 font-semibold text-[#161616]">Area Summary</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <p className="flex justify-between  text-xs font-semibold text-primary">
          <p>Total devices</p>
          <p>{data?.summary.total}</p>
        </p>

        <p className="flex justify-between text-xs font-semibold text-primary">
          <p>Alert</p>
          <p>{data?.summary.spotty}</p>
        </p>

        <p className="flex justify-between text-xs font-semibold text-primary">
          <p>Online</p>
          <p>{data?.summary.online}</p>
        </p>

        <p className="flex justify-between text-xs font-semibold text-primary">
          <p>Lora</p>
          <p>{data?.summary.lora}</p>
        </p>

        <p className="flex justify-between text-xs font-semibold text-primary">
          <p>Offline</p>
          <p>{data?.summary.offline}</p>
        </p>

        <p className="flex justify-between text-xs font-semibold text-primary">
          <p>Cellular</p>
          <p>{data?.summary.cellular}</p>
        </p>
      </div>
    </div>
  );
};
