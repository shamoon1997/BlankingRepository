import { ChevronIcon } from "@/assets";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: <h1>Grapes</h1> },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry" },
];

const MultiSelectDropdown: React.FC = () => {
  const [selected, setSelected] = useState([]);

  return (
    <>
      <MultiSelect
        options={options}
        className="h-[35px] font-mont text-[13px] outline-none 
        [&_.dropdown-container]:flex [&_.dropdown-container]:!h-[35px] [&_.dropdown-container]:items-center [&_.dropdown-container]:!rounded-lg [&_.dropdown-container]:!border-slate-600 focus-within:[&_.dropdown-container]:!border-slate-600  focus-within:[&_.dropdown-container]:!shadow-none
        [&_.panel-content]:p-2
        [&_.select-item.selected]:bg-slate-300
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
