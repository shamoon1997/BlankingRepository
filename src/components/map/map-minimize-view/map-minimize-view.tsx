import { MapsIcon } from "@/assets/pole-view";

type MapMinimizeProps = {
  selectedPoleId: string;
};

export const MapMinimizeView = ({ selectedPoleId }: MapMinimizeProps) => {
  return (
    <div>
      <div className="w-47 h-47 flex flex-col items-center justify-center rounded-full bg-white p-2 drop-shadow-map-minimize">
        <div className="[&_svg]:w-11.8 [&_svg]:h-18">
          <MapsIcon className="text-[#7537FA]" />
        </div>
        <div className="font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
          {selectedPoleId.slice(0, 6)}
        </div>
      </div>
    </div>
  );
};
