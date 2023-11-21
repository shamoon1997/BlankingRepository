import { GridScopeIcon } from "@/assets";
import { SideNavigation } from "@/components";
import { MultiSelectDropdown, SelectDropdown } from "@/components/common";
import { poleStatusOptions3 } from "@/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

export const DashboardPage = () => {
  const { logout } = useAuth0();

  return (
    <div className="flex">
      <SideNavigation />
      <div>
        <Outlet />
        <p>Dashboard page</p>

        <div className="mx-12 min-w-[150px]">
          <SelectDropdown
            placeholder="Select Status"
            dropdownIcon={
              <>
                <span className="mr-1 [&_svg]:h-[18px] [&_svg]:w-[18px]">
                  {/* <FilterIcon /> */}
                  <GridScopeIcon />
                </span>
              </>
            }
            options={poleStatusOptions3}
          />
        </div>
        <div className="mx-12 min-w-[150px] max-w-[150px]">
          <MultiSelectDropdown />
        </div>

        <button onClick={() => void logout()}>logout</button>
      </div>
    </div>
  );
};
