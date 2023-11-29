import { SettingIcon } from "@/assets/pole-view";

function MapPowerEquipmentInfo() {
  return (
    <div className="flex flex-grow flex-col ">
      <div className="flex flex-grow items-start gap-[5px]">
        <div className="flex h-3.5 w-3.5 items-center justify-center">
          <SettingIcon className="mt-[2px] h-[8px] w-[8px]" />
        </div>
        <div className="flex max-w-[140px] flex-wrap gap-[4px]">
          <div className="font-mont text-[8px] font-normal leading-normal text-[#161616]">
            Transformer
          </div>
          <div className="font-mont text-[8px] font-normal leading-normal text-[#161616]">
            Fuse Cutouts
          </div>
          <div className="font-mont text-[8px] font-normal leading-normal text-[#161616]">
            Switch
          </div>
          <div className="font-mont text-[8px] font-normal leading-normal text-[#161616]">
            Trip Saver
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPowerEquipmentInfo;
