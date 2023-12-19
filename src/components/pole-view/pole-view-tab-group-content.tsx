import { stripZeros } from "@/utils/strings/strip-zeros.ts";
import { poleView } from "@/api/types/types";

type PoleViewTabProps = {
  poleDevice: poleView;
};

const getNetworkMode = (networkMode: number) => {
  switch (networkMode) {
    case 1:
      return "cellular";
    case 2:
      return "lora";
    case 3:
      return "unknown";
    default:
      return "all";
  }
};
const calculateTimeDifference = (lastHealthReportTimestamp: string): string => {
  const now: Date = new Date();
  const reportTime: Date = new Date(lastHealthReportTimestamp);

  const differenceInMilliseconds: number = now.getTime() - reportTime.getTime();

  const differenceInSeconds: number = Math.floor(
    differenceInMilliseconds / 1000,
  );
  const minutes: number = Math.floor(differenceInSeconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  if (hours > 0) {
    return `${hours} hour ${remainingMinutes}m`;
  } else {
    return `${minutes}m`;
  }
};

const PoleViewTabGroupContent = ({ poleDevice }: PoleViewTabProps) => {
  return (
    <div className="flex gap-x-[30px]">
      <div>
        <div className="flex gap-[15px]">
          <div className="flex h-[45px] w-[106px] flex-col rounded-md border border-default px-[11px] py-[6px]">
            <p className="text-[10px] text-poleViewTextLight/50">
              Connectivity
            </p>
            <div className="inline-flex items-center text-[10px] font-bold">
              <div
                className={`mr-[5px] h-[7px] w-[7px] rounded ${
                  poleDevice.online === 0 ? "bg-offline" : "bg-online"
                }`}
              />
              {poleDevice.online === 0 ? "Offline" : "Online"}
            </div>
          </div>
        </div>

        <div className="mb-[30px] mt-[20px] max-w-[638px]">
          <p className="mb-[15px] text-[12px] font-bold text-poleViewBlue">
            Basic info
          </p>

          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Serial
              </p>
              <p className="text-[12px] font-bold">{poleDevice.device_sn}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Pole
              </p>
              <p className="text-[12px] font-bold">{poleDevice.pole_id}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Orientation
              </p>
              <p className="text-[12px] font-bold">{poleDevice.orientation}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Deployment
              </p>
              <p className="text-[12px] font-bold">{poleDevice.deployment}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Network
              </p>
              <p className="text-[12px] font-bold">
                {getNetworkMode(poleDevice.network_mode)}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Minute last seen
              </p>
              <p className="text-[12px] font-bold">
                {calculateTimeDifference(poleDevice.last_health_report)}
              </p>
            </div>
          </div>
        </div>

        {/* Below is the meta data */}

        <div className="max-w-[638px]">
          <p className="mb-[15px] text-[12px] font-bold text-poleViewBlue">
            Meta data
          </p>

          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[20px]">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                ICCID
              </p>
              <p className="text-[12px] font-bold">{poleDevice.iccid}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                IMEI
              </p>
              <p className="text-[12px] font-bold">{poleDevice.imei}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                DeviceEUI
              </p>
              <p className="text-[12px] font-bold">{poleDevice.dev_eui}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                PCB SN
              </p>
              <p className="text-[12px] font-bold">{poleDevice.pcb_sn}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                FW Version
              </p>
              <p className="text-[12px] font-bold">{poleDevice.fw_version}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                FW Hash
              </p>
              <p className="text-[12px] font-bold">{poleDevice.fw_hash}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Vibrometer
              </p>
              <p className="text-[12px] font-bold">{poleDevice.vibrometer}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Temperature
              </p>
              <p className="text-[12px] font-bold">{poleDevice.temperature}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Electrometer
              </p>
              <p className="text-[12px] font-bold">{poleDevice.electrometer}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Longitude
              </p>
              <p className="text-[12px] font-bold">{poleDevice.longitude}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Latitude
              </p>
              <p className="text-[12px] font-bold">{poleDevice.latitude}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Altitude
              </p>
              <p className="text-[12px] font-bold">{poleDevice.altitude}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                Accuracy
              </p>
              <p className="text-[12px] font-bold">{poleDevice.accuracy}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-poleViewTextLight/50">
                PCB Rev
              </p>
              <p className="text-[12px] font-bold">{poleDevice.pcb_rev}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-[15px] text-[12px] font-bold text-poleViewBlue">
          Installation photo
        </p>
        <div>
          <img
            src={poleDevice.installation_photos[0]}
            alt="Your Pole"
            className="h-[338px] w-[242px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PoleViewTabGroupContent;
