import Image from "next/image";
import { redirect } from "next/navigation";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { LogoutButton } from "./LogoutButton";

import { auth } from "@/auth.config";
import { MenuItems } from "@/interfaces/menu-items";

type bgVariant =
  | "bg-slate-700"
  | "bg-slate-500"
  | "bg-slate-900"
  | "bg-slate-600";

interface Props {
  menuItems: MenuItems[];
  bgVariant?: bgVariant;
}

export async function Sidebar({
  menuItems,
  bgVariant = "bg-slate-600",
}: Props) {
  const session = await auth();

  if (!session) redirect("/auth/login");
  const { user } = session;

  return (
    <div
      className={`grid grid-rows-[1fr_auto] ${bgVariant} z-10 text-slate-300 min-w-72 left-0 h-screen overflow-y-auto`}
      id="sidebar"
    >
      <div className="mb-10" id="superior-section">
        <div className="my-4 px-6" id="logo">
          <h1 className="text-lg md:text-2xl font-bold text-white flex items-center">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your actions and activities
          </p>
        </div>
        <div className="px-6 py-10" id="profile">
          <span className="inline-flex space-x-2 items-center">
            <span>
              <Image
                alt="profile"
                className="rounded-full w-12 h-12"
                height={40}
                src={
                  user.profile?.imageUrl
                    ? user.profile.imageUrl
                    : "/not-profile-image.png"
                }
                width={40}
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
        <nav className="w-full px-6 flex flex-col gap-2" id="nav">
          {menuItems.map((item) => (
            <SidebarMenuItem
              key={item.path}
              icon={item.icon}
              path={item.path}
              subtitle={item.subtitle}
              title={item.title}
            />
          ))}
        </nav>
      </div>
      <LogoutButton />
    </div>
  );
}
