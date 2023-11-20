import { MapToolTipContainer } from "../map-tooltip";
import { MapsIcon } from "@/assets/pole-view";
import { StatusIcon, ElectrometerIcon } from "@/assets/pole-hover";
import { Button } from "@/components/common";

function MapHoverMenu() {
  return (
    <MapToolTipContainer>
      <div className="flex flex-col">
        <div className="flex gap-6">
          <div className="flex">
            <div className="font-mont text-sm font-semibold leading-normal text-[#5B5B5B]">
              <MapsIcon className="border-l-fuchsia-600" />
            </div>
            <div className="font-Mont text-xs font-normal normal-case leading-normal text-black">
              1533. GS526
            </div>
          </div>

          <div className="flex">
            <div className="[&_svg]:h-[20px] [&_svg]:w-[20px]">
              <StatusIcon />
            </div>
            <div className="font-Mont flex text-xs font-normal normal-case leading-normal text-black">
              online
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="[&_svg]:h-[20px] [&_svg]:w-[20px]">
            <ElectrometerIcon />
          </div>
          <div>Electromemter Drop</div>
          <div>19 min.ago</div>
        </div>

        <div className="flex">
          <div className="[&_svg]:h-[20px] [&_svg]:w-[20px]">
            <ElectrometerIcon />
          </div>
          <div>Electromemter Drop</div>
          <div>19 min.ago</div>
        </div>
        <div className="max-w-199 bg-popUpHoverColor h-0.5" />

        <Button text="Pole View" backgroundColor="#FF176B" color="#FFFFFF" />
      </div>
    </MapToolTipContainer>
  );
}

export default MapHoverMenu;
