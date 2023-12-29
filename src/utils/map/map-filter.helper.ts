/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Device } from "@/api/types/types";
import { AppliedFilterType } from "@/state/map";
import { FilterEnum, OperatorValueEnum } from "../filters";

export const getFilterBadgeText = (
  filter: string,
  operator: string,
  value: string | number,
): string => {
  let newVal: string = value.toString();

  if (filter === FilterEnum.network) {
    switch (newVal) {
      case "0":
        newVal = "unknown";
        break;

      case "1":
        newVal = "cellular";
        break;

      case "2":
        newVal = "lora";
        break;

      default:
        break;
    }
  }

  return `${filter} ${operator} ${newVal}`;
};

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

    case FilterEnum.network:
      keyToFilter = "network_mode";
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

// Can be used on any dropdown menu
export const getSelectDefaultVal = (
  currentVal: string,
  list: { label: string; value: string }[],
) => {
  const valExists = list.find((item) => item.value === currentVal);
  if (!valExists) return list[0].value;
  else return currentVal;
};
