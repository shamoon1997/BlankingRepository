import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { navigationTabs } from "../../constants/sidebar.constants";

const SideNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(
    location.pathname.substring(1),
  );
  const [isOpen, setIsOpen] = useState(selectedItem?.length > 0 ? true : false);

  const handleItemClick = (item: string) => {
    setIsOpen(true);
    setSelectedItem(item);
  };

  const renderContent = (heading: string) => {
    return <Header heading={heading} />;
  };

  return (
    <div>
      <div className="bg-customSideColor h-screen w-56 p-4 text-white">
        <h3 className="mb-4 text-left font-mont text-xl font-bold">ADMIN</h3>

        <ul>
          {navigationTabs.map((tab) => {
            return (
              <li
                className={`mb-2 flex cursor-pointer items-center py-2 pl-2 pr-4 transition ${
                  selectedItem === tab.name.toLowerCase()
                    ? "rounded-md border-gray-700 bg-gray-700"
                    : "hover:rounded-md hover:border-gray-700 hover:bg-gray-700"
                }`}
              >
                <Link
                  to={tab.path}
                  className="flex items-center"
                  onClick={() => handleItemClick(tab.name.toLowerCase())}
                >
                  <div className="mr-4 h-5 w-5 [&_svg]:h-[20px] [&_svg]:w-[20px]">
                    <tab.icon />
                  </div>

                  <span>{tab.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed left-56 right-0 top-0 bg-gray-200 p-10 text-black"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          {renderContent(selectedItem)}
        </div>
      )}
    </div>
  );
};

export default SideNavigation;
