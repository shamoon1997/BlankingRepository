import { MapsIcon } from "@/assets/pole-view";

type MapMinimizeProps = {
  selectedPoleId: string;
};

export const MapMinimizedView = ({ selectedPoleId }: MapMinimizeProps) => {
  return (
    <div>
      <div className="flex h-[70px] w-[70px] min-w-0 flex-col items-center justify-center rounded-full bg-white p-2 drop-shadow-map-minimize">
        <div className="[&_svg]:w-11.8 [&_svg]:h-18">
          <MapsIcon className="text-[#7537FA]" />
        </div>
        <div className="mt-1 flex w-full min-w-0 justify-center overflow-hidden text-ellipsis whitespace-nowrap font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
          {selectedPoleId}
        </div>
      </div>
    </div>
  );
};
