/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Device } from "@/api/types/types";
import { AppliedFilterType } from "@/stores/map-filter.store";
import { FilterEnum, OperatorValueEnum } from "../filters";

export const applyFilterFunc = (
  devices: Device[],
  filterObj: AppliedFilterType,
): Device[] => {
  if (!filterObj?.value || !filterObj.filter) return devices;
  let keyToFilter: keyof Device;

  switch (filterObj.filter) {
    case FilterEnum.pole:
      keyToFilter = "pole_id";
      break;

    case FilterEnum.sr_no:
      keyToFilter = "device_sn";
      break;

    case FilterEnum.hid:
      keyToFilter = "hardware_id";
      break;

    case FilterEnum.deployment:
      keyToFilter = "deployment";
      break;

    default:
      break;
  }

  if (filterObj?.operator === OperatorValueEnum.contains) {
    const includesArr = devices?.filter((device) => {
      return device?.[keyToFilter]?.toString().includes(`${filterObj?.value}`);
    });
    return includesArr;
  }

  if (filterObj?.operator === OperatorValueEnum.equals) {
    const equalsArr = devices?.filter((device) => {
      return (
        device?.[keyToFilter]?.toString().toLowerCase() ===
        `${filterObj?.value.toString().toLowerCase()}`
      );
    });
    return equalsArr;
  }

  if (filterObj?.operator === OperatorValueEnum.greater_than) {
    const greaterThanArr = devices?.filter((device) => {
      return +device?.[keyToFilter] > +filterObj?.value;
    });
    return greaterThanArr;
  }

  if (filterObj?.operator === OperatorValueEnum.less_than) {
    const lessThanArr = devices?.filter((device) => {
      return +device?.[keyToFilter] < +filterObj?.value;
    });
    return lessThanArr;
  }

  return devices;
};
