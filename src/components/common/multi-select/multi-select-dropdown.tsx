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
        className="h-[35px] font-mont text-[13px] outline-none 
        [&_.dropdown-container]:flex [&_.dropdown-container]:!h-[35px] [&_.dropdown-container]:items-center [&_.dropdown-container]:!rounded-lg [&_.dropdown-container]:!border-slate-600 focus-within:[&_.dropdown-container]:!border-slate-600  focus-within:[&_.dropdown-container]:!shadow-none
        [&_.item-renderer]:flex [&_.item-renderer]:items-center [&_.item-renderer]:rounded-lg
        [&_.panel-content]:p-2
        [&_.select-item.selected]:bg-none
        [&_.select-item]:my-1 [&_.select-item]:rounded-lg
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
