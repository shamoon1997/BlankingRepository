import { SideNavigation } from "@/components";
import { MultiSelectDropdown } from "@/components/common";
import { poleEquipmentOptions } from "@/constants";
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
          <div className="mx-12 min-w-[180px] max-w-[180px]">
            <MultiSelectDropdown options={poleEquipmentOptions} />
          </div>

          <button onClick={() => void logout()}>logout</button>
        </div>
      </div>
    </div>
  );
};
