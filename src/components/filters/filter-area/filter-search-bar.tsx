import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterIcon, SearchIcon, CrossIcon } from "@/assets";

interface SearchBarProps {
  toggleFilterActive: () => void;
  filterActive: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  toggleFilterActive,
  filterActive,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      setChips([...chips, searchTerm.trim()]);
      setSearchTerm("");
    }
  };

  const removeChip = (index: number) => {
    const updatedChips = [...chips];
    updatedChips.splice(index, 1);
    setChips(updatedChips);
  };

  return (
    <div className="flex flex-grow">
      <SearchIcon className="mt-1 h-3 w-3 shrink-0" />
      <div className="ml-2.5 flex flex-wrap items-center gap-1">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex min-h-[20px] items-center gap-2 rounded bg-[#DEDEDE] px-1.5 py-[5px]"
          >
            <div className="flex pt-[1px]">
              <span className="font-mont font-semibold leading-[normal] text-[#161616]">
                {chip}
              </span>
            </div>
            <div className="flex">
              <button type="button" onClick={() => removeChip(index)}>
                <div className="[&_svg]:h-1.5 [&_svg]:w-1.5">
                  <CrossIcon />
                </div>
              </button>
            </div>
          </div>
        ))}

        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="ml-1 font-mont font-semibold text-[#161616] outline-none"
        />
      </div>

      <button
        onClick={toggleFilterActive}
        className={`ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          filterActive ? "bg-[#DEDEDE]" : "bg-transparent"
        }`}
      >
        <FilterIcon />
      </button>
    </div>
  );
};
