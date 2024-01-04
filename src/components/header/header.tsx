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
    <div className=" flex h-[80px] w-full justify-between bg-[#EDEDED] px-[20px]">
      <h1 className="self-center text-[24px] font-semibold">{heading}</h1>
      <div className=" mt-3 flex gap-[8px] self-start">
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
              className="z-[3] rounded-md border-[0.5px] border-solid border-[rgba(91,91,91,0.50)] bg-white p-1 font-mont"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                className="relative flex cursor-pointer items-center rounded-[3px] px-4 py-1 text-xs font-semibold outline-none hover:bg-slate-200"
                onClick={() => void handleLogout()}
              >
                Sign out
              </DropdownMenu.Item>

              <DropdownMenu.Arrow asChild className="relative top-[-0.5px]">
                <svg
                  className="fill-white"
                  width="10"
                  height="5"
                  viewBox="0 0 30 13"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="15"
                    y2="10"
                    stroke="rgba(91, 91, 91, 0.5)"
                    strokeWidth="3"
                  />
                  <line
                    x1="30"
                    y1="0"
                    x2="15"
                    y2="10"
                    stroke="rgba(91, 91, 91, 0.5)"
                    strokeWidth="3"
                  />

                  {/* Bottom stroke */}
                  <line
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="0"
                    stroke="rgba(91, 91, 91, 0.5)"
                    strokeWidth="3"
                  />

                  {/* Filled triangle */}
                  <polygon
                    points="0,0 30,0 15,10"
                    fill="white"
                    strokeWidth="0"
                  />
                </svg>
              </DropdownMenu.Arrow>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Header;
