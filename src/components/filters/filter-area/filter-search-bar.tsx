import React, { useState, ChangeEvent } from "react";
import { FilterIcon, SearchIcon, CrossIcon } from "@/assets";
import { DeploymentResponse } from "@/api/types/types";
import { useFetchDeployments } from "@/api/hooks/deployments/use-fetch-deployments";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Fuse from "fuse.js";
import { useMapUrlState } from "@/hooks";

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

  // FOR SEARCH FILTERING
  const [searchSuggestions, setSearchSuggestions] = useState<
    DeploymentResponse[]
  >([]);
  const { data: deployments } = useFetchDeployments();
  const fuse = new Fuse(deployments?.data ?? [], {
    keys: ["name"],
    threshold: 0.6,
  });
  const { setSearchParams } = useMapUrlState();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchTerm(text);

    if (text.trim().length === 0) return setSearchSuggestions([]);

    if (deployments?.data.length) {
      const filteredDeployments: DeploymentResponse[] = fuse
        .search<DeploymentResponse>(text)
        .map((item) => item.item);
      setSearchSuggestions(filteredDeployments);
      console.log(filteredDeployments);
    }
  };

  // SINCE WE'RE DROPPING THE ENTER BTN FUNCTIONALITY FOR NOW
  // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  // if (e.key === "Enter" && searchTerm.trim() !== "") {
  //   setChips([...chips, searchTerm.trim()]);
  //   setSearchTerm("");
  // }
  // };

  const removeChip = (index: number) => {
    const updatedChips = [...chips];
    updatedChips.splice(index, 1);
    setChips(updatedChips);
  };

  return (
    <div className="flex flex-col gap-[2px]">
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
      <div>
        {searchSuggestions?.length > 0 && (
          <ScrollArea.Root className="overflow-hidden">
            <ScrollArea.Viewport className="z-10 mt-[6px] max-h-[100px]">
              <ul>
                {searchSuggestions?.map((item) => {
                  const { latitude, longitude } = item;
                  return (
                    <li
                      key={item?.name}
                      className="cursor-pointer rounded-md px-[4px] py-[6px] text-[12px] text-primary hover:bg-selected"
                      onClick={() => {
                        setChips([item?.name]);
                        setSearchTerm("");
                        setSearchSuggestions([]);
                        setSearchParams((searchParams) => {
                          searchParams.set("lat", `${latitude}`);
                          searchParams.set("lng", `${longitude}`);
                          return searchParams;
                        });
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="mt-[6px] w-1"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="rounded bg-[#1616164D]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </div>
    </div>
  );
};
