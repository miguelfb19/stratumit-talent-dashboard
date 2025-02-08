import { IoAnalytics, IoBrowsersOutline, IoDesktop, IoPerson } from "react-icons/io5";
import { BiSolidUserRectangle } from "react-icons/bi";



export const menuItemsDashboard =[
  {
    path: "/dashboard/profile",
    title: "Profile",
    icon: <BiSolidUserRectangle size={27}/>,
    subtitle: 'User information'
  },
  {
    path: "/admin",
    title: "Admin",
    icon: <IoDesktop size={27}/>,
    subtitle: 'Go to admin dashboard'
  
  }
]

export const menuItemsAdmin = [
  {
    path: "/admin/profile",
    title: "Profile",
    icon: <BiSolidUserRectangle size={27}/>,
    subtitle: 'Admin information'
  },
  {
    path: "/admin/users",
    title: "Users",
    icon: <IoPerson size={27}/>,
    subtitle: 'View users'
  },
  {
    path: "/admin/analitycs",
    title: "Analitycs",
    icon: <IoAnalytics size={27}/>,
    subtitle: 'View analitycs'
  },
  {
    path: "/dashboard",
    title: "Dasboard",
    icon: <IoBrowsersOutline size={27}/>,
    subtitle: 'Go back to dashboard'
  },
]