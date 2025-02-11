import {
  IoAnalytics,
  IoBrowsersOutline,
  IoDesktop,
  IoPeople,
  IoPeopleCircle,
  IoPerson,
} from "react-icons/io5";
import { BiSolidUserRectangle } from "react-icons/bi";

export const menuItemsDashboard = [
  {
    path: "/dashboard/profile",
    title: "Profile",
    icon: <BiSolidUserRectangle size={27} />,
    subtitle: "User information",
  },
  {
    path: "/admin",
    title: "Admin",
    icon: <IoDesktop size={27} />,
    subtitle: "Go to admin dashboard",
  },
];

export const menuItemsAdmin = [
  {
    path: "/admin/profile",
    title: "Profile",
    icon: <BiSolidUserRectangle size={27} />,
    subtitle: "Admin information",
  },
  {
    path: "/admin/manage-users",
    title: "Users",
    icon: <IoPeople size={27} />,
    subtitle: "View users",
  },
  {
    path: "/admin/manage-roles",
    title: "Roles",
    icon: <IoPeopleCircle size={27} />,
    subtitle: "Manage roles",
  },
  {
    path: "/admin/analitycs",
    title: "Analitycs",
    icon: <IoAnalytics size={27} />,
    subtitle: "View analitycs",
  },
  {
    path: "/dashboard",
    title: "Dasboard",
    icon: <IoBrowsersOutline size={27} />,
    subtitle: "Go back to dashboard",
  },
];
