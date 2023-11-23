import { NotificationIcon, ProfileIcon } from "@/assets";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <div className="flex min-h-[40px] w-full justify-between bg-slate-100 px-2 py-4">
      <div className="grid place-content-center">
        <h1 className="text-2xl">{heading}</h1>
      </div>
      <div className="flex gap-2">
        <div className="grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
          <NotificationIcon />
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <div className="grid h-[28px] w-[28px] place-content-center rounded-full bg-slate-200 [&_svg]:h-[12px] [&_svg]:w-[12px]">
              <ProfileIcon />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="z-[3] rounded-md border border-blue-400 bg-white p-[5px]"
              sideOffset={5}
            >
              <DropdownMenu.Item className="relative flex h-[25px] cursor-pointer items-center rounded-[3px] px-4 text-[13px] outline-none hover:bg-slate-200">
                Sign out
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Header;
