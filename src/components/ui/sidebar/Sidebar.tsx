import Image from "next/image";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { LogoutButton } from './LogoutButton';
import { MenuItems } from "@/interfaces/menu-items";

type bgVariant = 'bg-slate-700' | 'bg-slate-500' | 'bg-slate-900' | 'bg-slate-600'

interface Props {
  menuItems: MenuItems[]
  bgVariant?: bgVariant
}

export async function Sidebar({menuItems, bgVariant='bg-slate-600'}:Props) {
  const session = await auth();
  if (!session) redirect("/auth/login");
  const { user } = session;

 

  return (
    <div
      id="sidebar"
      style={{ width: "400px" }}
      className={`grid grid-rows-[1fr_auto] ${bgVariant} z-10 text-slate-300 w-64 left-0 h-screen overflow-y-auto`}
    >
      <div id="superior-section">
        <div id="logo" className="my-4 px-6">
          <h1 className="text-lg md:text-2xl font-bold text-white flex items-center">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your actions and activities
          </p>
        </div>
        <div id="profile" className="px-6 py-10">
          <span className="inline-flex space-x-2 items-center">
            <span>
              <Image
                className="rounded-full w-12 h-12"
                src={
                  user.profile?.imageUrl
                    ? user.profile.imageUrl
                    : "/not-profile-image.png"
                }
                alt="profile"
                width={40}
                height={40}
              />
            </span>
            <div className="flex flex-col">
                <p className="text-slate-400">Welcome back,</p>
                <span className="text-sm md:text-base font-bold">
                  {user.firstName}
                </span>
            </div>
          </span>
        </div>
        <nav id="nav" className="w-full px-6 flex flex-col gap-2">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.path}
              path={item.path}
              title={item.title}
              icon={item.icon}
              subtitle={item.subtitle}
            />
          ))}
        </nav>
      </div>
      <LogoutButton />
    </div>
  );
}
