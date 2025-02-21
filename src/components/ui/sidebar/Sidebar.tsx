"use client";
import Image from "next/image";

import { SidebarMenuItem } from "./SidebarMenuItem";
import { LogoutButton } from "./LogoutButton";

import { MenuItems } from "@/interfaces/menu-items";
import { useSession } from "next-auth/react";
import { useMenuStore } from "@/store/use-menu-store";
import { IoClose } from "react-icons/io5";

type bgVariant =
  | "bg-slate-700"
  | "bg-slate-500"
  | "bg-slate-900"
  | "bg-slate-600";

interface Props {
  menuItems: MenuItems[];
  bgVariant?: bgVariant;
}

export function Sidebar({ menuItems, bgVariant = "bg-slate-600" }: Props) {
  const { isOpen, closeMenu } = useMenuStore();
  const { data: session } = useSession();

  console.log("store", isOpen);

  return (
    <div
      className={`fixed md:relative grid grid-rows-[1fr_auto] ${bgVariant} z-10 text-slate-300 w-full md:w-auto md:min-w-72 left-0 h-screen overflow-y-auto md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}
      id="sidebar"
    >
      <button className="absolute top-4 right-4 md:hidden" onClick={closeMenu}>
        <IoClose size={35} />
      </button>

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
                  session?.user.profile?.imageUrl
                    ? session?.user.profile.imageUrl
                    : "/not-profile-image.png"
                }
                width={40}
              />
            </span>
            <div className="flex flex-col">
              <p className="text-slate-400">Welcome back,</p>
              <span className="text-sm md:text-base font-bold">
                {session?.user.firstName}
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
