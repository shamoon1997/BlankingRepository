import { NotificationIcon, ProfileIcon } from "@/assets";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-[124px] w-full justify-between bg-slate-100 px-[20px] py-[45px]">
      <div className="grid place-content-center">
        <h1 className="text-[24px] font-bold">{heading}</h1>
      </div>
      <div className="flex gap-[8px]">
        <div className="grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
          <NotificationIcon />
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="h-[28px] w-[28px] focus-visible:outline-none">
            <div className="relative grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
              <div className="absolute bottom-0 right-0 h-[8px] w-[8px] rounded-full bg-online" />
              <ProfileIcon />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-[3] rounded-md bg-white p-1 font-mont shadow-lg"
              sideOffset={5}
            >
              <DropdownMenu.Item
                className="relative flex cursor-pointer items-center rounded-[3px] px-4 py-1 text-[10px] font-semibold outline-none hover:bg-slate-200"
                onClick={() => void handleLogout()}
              >
                Sign out
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-white shadow-lg" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Header;
