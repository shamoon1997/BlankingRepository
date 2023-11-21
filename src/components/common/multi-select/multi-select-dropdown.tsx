import { ChevronIcon } from "@/assets";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry" },
];

const MultiSelectDropdown: React.FC = () => {
  const [selected, setSelected] = useState([]);
  return (
    <>
      <MultiSelect
        options={options}
        className="[&_.dropdown-container]:border-1 h-[35px] font-mont outline-none [&_.dropdown-container]:border-slate-300 focus-within:[&_.dropdown-container]:!border-slate-300  focus-within:[&_.dropdown-container]:!shadow-none 
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
