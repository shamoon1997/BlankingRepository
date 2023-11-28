import { ChevronIcon } from "@/assets";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSearchParams } from "react-router-dom";

type OptionType = {
  value: string;
  label: string;
  key?: string;
  disabled?: boolean;
};

type Props = {
  options: OptionType[];
};

const MultiSelectDropdown: React.FC<Props> = ({ options }) => {
  const [selected, setSelected] = useState<OptionType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const stringData = [...selected].map((item) => `${item?.value}`).join(",");
    searchParams.set("equipment", stringData);
    setSearchParams(searchParams);
  }, [selected]);

  return (
    <>
      <MultiSelect
        options={options}
        className="h-[35px] font-mont text-[10px] outline-none 
        [&_.dropdown-container]:flex [&_.dropdown-container]:h-[35px]  [&_.dropdown-container]:items-center [&_.dropdown-container]:!rounded-lg [&_.dropdown-container]:!border-[#5B5B5B80]/50  focus-within:[&_.dropdown-container]:!border-[#5B5B5B80]/50  focus-within:[&_.dropdown-container]:!shadow-none
        [&_.item-renderer]:flex [&_.item-renderer]:!items-center [&_.item-renderer]:gap-[8px] [&_.item-renderer]:rounded-lg [&_.item-renderer_input]:!m-0
        [&_.panel-content]:px-[5px] [&_.panel-content]:py-[5px] [&_.panel-content]:text-[8px]
        [&_.select-item.selected]:bg-none
         [&_.select-item]:rounded-lg
        "
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
        hasSelectAll={false}
        disableSearch={true}
        ClearIcon={false}
        ClearSelectedIcon={null}
        ArrowRenderer={() => (
          <div className="rotate-180">
            <ChevronIcon />
          </div>
        )}
      />
    </>
  );
};

export default MultiSelectDropdown;
