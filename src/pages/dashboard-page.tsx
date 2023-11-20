import { SideNavigation } from "@/components";
import { useAuth0 } from "@auth0/auth0-react";

export const DashboardPage = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <SideNavigation />
      <p>Dashboard page</p>

      <button onClick={() => void logout()}>logout</button>
    </div>
  );
};
