import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import Header from "../Header";
import {
  DeploymentsIcon,
  AlertsIcon,
  TicketsIcon,
  DevicesIcon,
  PolesIcon,
  PhotosIcon,
  SensorBlobsIcon,
  CustomerReportsIcon,
  OrganizationsIcon,
  UsersIcon,
} from "@/assets";

const navigationTabs = [
  {
    name: "Deployments",
    path: "/deployments",
    icon: DeploymentsIcon,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: AlertsIcon,
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: TicketsIcon,
  },
  {
    name: "Devices",
    path: "/devices",
    icon: DevicesIcon,
  },
  {
    name: "Poles",
    path: "/poles",
    icon: PolesIcon,
  },
  {
    name: "Photos",
    path: "/photos",
    icon: PhotosIcon,
  },
  {
    name: "Sensor Blobs",
    path: "/sensor-blobs",
    icon: SensorBlobsIcon,
  },
  {
    name: "Customer Reports",
    path: "/customer-reports",
    icon: CustomerReportsIcon,
  },
  {
    name: "Oragnizations",
    path: "/organizations",
    icon: OrganizationsIcon,
  },
  {
    name: "Users",
    path: "/users",
    icon: UsersIcon,
  },
];

const SideNavigation = () => {
  const [selectedItem, setSelectedItem] = useState(
    location.pathname.substring(1),
  );
  const [isOpen, setIsOpen] = useState(selectedItem.length > 0 ? true : false);

  useEffect(() => {
    setTimeout(() => (document.body.style.pointerEvents = ""), 0);
  }, []);

  const handleItemClick = (item: string) => {
    setIsOpen(true);
    setSelectedItem(item);
    setTimeout(() => (document.body.style.pointerEvents = ""), 0);
  };

  const renderContent = (heading: string) => {
    return <Header heading={heading} />;
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger>
          <div
            className="h-screen w-56 bg-side-nav p-4 text-white"
            style={{ zIndex: 9999 }}
          >
            <h3 className="mb-4 text-left font-mont text-xl font-bold">
              ADMIN
            </h3>

            <ul>
              {navigationTabs.map((tab) => {
                return (
                  <li
                    className={`mb-2 flex cursor-pointer items-center px-4 py-2 transition ${
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
                      <span className="mr-2 h-5 w-5">
                        <tab.icon />
                      </span>

                      <span>{tab.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </DialogTrigger>

        <DialogContent
          className="fixed left-56 right-0 top-0 bg-gray-200 p-10 text-black"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          {renderContent(selectedItem)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SideNavigation;
