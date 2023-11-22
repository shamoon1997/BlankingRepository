export const AppRoutes = {
  notFound: "*",
  root: "/",
  deployments: "/dashboard/deployments",
  alerts: "/dashboard/alerts",
  tickets: "/dashboard/tickets",
  devices: "/dashboard/devices",
  poles: "/dashboard/poles",
  photos: "/dashboard/photos",
  sensorBlobs: "/dashboard/sensor-blobs",
  customerReports: "/dashboard/customer-reports",
  organizations: "/dashboard/organizations",
  users: "/dashboard/users",
  callback: "/callback",
};

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

export const navigationTabs = [
  {
    name: "Deployments",
    path: AppRoutes.deployments,
    icon: DeploymentsIcon,
  },
  {
    name: "Alerts",
    path: AppRoutes.alerts,
    icon: AlertsIcon,
  },
  {
    name: "Tickets",
    path: AppRoutes.tickets,
    icon: TicketsIcon,
  },
  {
    name: "Devices",
    path: AppRoutes.devices,
    icon: DevicesIcon,
  },
  {
    name: "Poles",
    path: AppRoutes.poles,
    icon: PolesIcon,
  },
  {
    name: "Photos",
    path: AppRoutes.photos,
    icon: PhotosIcon,
  },
  {
    name: "Sensor Blobs",
    path: AppRoutes.sensorBlobs,
    icon: SensorBlobsIcon,
  },
  {
    name: "Customer Reports",
    path: AppRoutes.customerReports,
    icon: CustomerReportsIcon,
  },
  {
    name: "Organizations",
    path: AppRoutes.organizations,
    icon: OrganizationsIcon,
  },
  {
    name: "Users",
    path: AppRoutes.users,
    icon: UsersIcon,
  },
];
