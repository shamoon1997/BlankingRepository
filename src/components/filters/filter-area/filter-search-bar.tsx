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
    <div className="flex items-center space-x-2">
      <SearchIcon className="h-5 w-5" />
      <div className="flex flex-wrap items-center space-x-1">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-md bg-[#DEDEDE] p-2"
          >
            <div>
              <span className="font-mont text-xs font-semibold leading-normal text-[#161616]">
                {chip}
              </span>
            </div>
            <div>
              <button type="button" onClick={() => removeChip(index)}>
                <div className="[&_svg]:h-[10px] [&_svg]:w-[10px]">
                  <CrossIcon />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="ml-1 mr-1 flex-1 text-xs font-semibold text-primary-hard outline-none"
      />
      <button
        onClick={toggleFilterActive}
        className={`flex h-7 w-7 items-center justify-center rounded-full ${
          filterActive ? "bg-[#DEDEDE]" : "bg-transparent"
        }`}
      >
        <FilterIcon className="h-7 w-7" />
      </button>
    </div>
  );
};
