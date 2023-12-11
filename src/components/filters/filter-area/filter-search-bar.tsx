import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterIcon, SearchIcon, CrossIcon } from "@/assets";
import { debounce } from "lodash";
import { getDeploymentsAPI } from "@/api/deployments";

interface SearchBarProps {
  toggleFilterActive: () => void;
  filterActive: boolean;
}

const listDeployments = debounce(async () => {
  const { data } = await getDeploymentsAPI();
  return data;
}, 2000);

export const SearchBar: React.FC<SearchBarProps> = ({
  toggleFilterActive,
  filterActive,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chips, setChips] = useState<string[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    try {
      const deploymentList = await listDeployments();

      if (deploymentList?.length) {
        deploymentList?.filter((item) =>
          item.name.toLowerCase().includes(e.target.value),
        );
        console.log("BOOO");
      }
    } catch (err) {
      // Handle Err here
    }
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
    <div className="flex items-center">
      <SearchIcon className="mt-[5.4px] h-[18px] w-[18px] shrink-0 self-start" />
      <div className="ml-1 mr-1 flex min-w-0  flex-1 flex-wrap gap-1 ">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex min-w-0 items-center gap-2 rounded bg-[#DEDEDE] px-1.5 py-[5px]"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-primary-hard">
              {chip}
            </span>

            <button
              className="[&_svg]:h-2 [&_svg]:w-2"
              onClick={() => removeChip(index)}
            >
              <CrossIcon />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            void handleInputChange(e);
          }}
          onKeyDown={handleKeyPress}
          className="ml-1 flex-1 text-xs font-semibold text-primary-hard outline-none"
        />
      </div>

      <button
        onClick={toggleFilterActive}
        className={`flex h-7 w-7 shrink-0 items-center justify-center self-start rounded-full ${
          filterActive ? "bg-[#DEDEDE]" : "bg-transparent"
        }`}
      >
        <FilterIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
