import { MapsIcon } from "@/assets/pole-view";

function MapMinimizeView() {
  return (
    <div className="absolute bottom-2 left-[50%]">
      <div className="drop-shadow-map-minimize w-47 h-47 flex flex-col items-center justify-center rounded-full bg-white p-2">
        <div className="[&_svg]:w-11.8 [&_svg]:h-18">
          <MapsIcon className="text-[#7537FA]" />
        </div>
        <div className="font-mont text-sm font-normal leading-normal text-[#5B5B5B]">
          GS527
        </div>
      </div>
    </div>
  );
}

export default MapMinimizeView;
