import { SideNavigation } from "@/components";
import { SelectDropdown } from "@/components/common";
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
          <SelectDropdown />
        </div>

        <button onClick={() => void logout()}>logout</button>
      </div>
    </div>
  );
};
