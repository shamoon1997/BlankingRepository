export type FilterSelectItemProps = {
  value: string;
  label: string;
};

export enum FilterEnum {
  pole = "pole",
  sr_no = "sr-no",
  hid = "hid",
  pcb_rev = "pcb-rev",
  deployment = "deployment",
  firmware = "firmware",
  network = "network",
}

export enum OperatorValueEnum {
  contains = "contains",
  equals = "=",
  greater_than = ">",
  less_than = "<",
}

export const filtersList: FilterSelectItemProps[] = [
  { label: "Pole", value: FilterEnum.pole },
  { label: "Serial No.", value: FilterEnum.sr_no },
  { label: "Hardware ID", value: FilterEnum.hid },
  { label: "PCB Rev", value: FilterEnum.pcb_rev },
  { label: "Deployment", value: FilterEnum.deployment },
  { label: "Firmware", value: FilterEnum.firmware },
  { label: "Network", value: FilterEnum.network },
];

export const operatorsList: Record<string, FilterSelectItemProps[]> = {
  [FilterEnum.pole]: [
    {
      label: "Contain",
      value: OperatorValueEnum.contains,
    },
  ],

  [FilterEnum.sr_no]: [
    {
      label: "Contain",
      value: OperatorValueEnum.contains,
    },
  ],

  [FilterEnum.hid]: [
    {
      label: "Contain",
      value: OperatorValueEnum.contains,
    },
  ],

  [FilterEnum.pcb_rev]: [
    { label: "Contain", value: OperatorValueEnum.contains },
    { label: "Equals", value: OperatorValueEnum.equals },
    { label: "Is Greater than", value: OperatorValueEnum.greater_than },
    { label: "Is Less than", value: OperatorValueEnum.less_than },
  ],

  [FilterEnum.deployment]: [
    { label: "Contain", value: OperatorValueEnum.contains },
  ],

  [FilterEnum.firmware]: [
    { label: "Contain", value: OperatorValueEnum.contains },
    { label: "Equals", value: OperatorValueEnum.equals },
    { label: "Is Greater than", value: OperatorValueEnum.greater_than },
    { label: "Is Less than", value: OperatorValueEnum.less_than },
  ],

  [FilterEnum.network]: [
    { label: "Contain", value: OperatorValueEnum.contains },
  ],
};

export const filtersListNetworkOptions = [
  { label: "cellular", value: "1" },
  { label: "lora", value: "2" },
  { label: "unknown", value: "0" },
];
