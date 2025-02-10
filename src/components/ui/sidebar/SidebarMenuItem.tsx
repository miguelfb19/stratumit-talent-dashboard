"use client";

import { AbilityContext } from "@/providers/AbilityProvider";
import { Can } from "@casl/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export const SidebarMenuItem = ({ path, icon, title, subtitle }: Props) => {
  const currentPath = usePathname();
  const ability = useContext(AbilityContext);

  // Get session status and method to update
  const { status, update } = useSession();

  useEffect(() => {
    // When session is closed or opened, update session and therefore user permissions
    if (status === "unauthenticated" || status === "authenticated") update();
  }, []);

  if (!ability) return null;

  return (
    <>
      {path === "/admin" ? (
        // Validate if user is admin, to show admin dashboard menu option or not
        <Can I="view" this="adminPage" ability={ability!}>
          <Link
            href={path}
            className={`w-full px-4 rounded-full inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
          ${currentPath === path ? "bg-blue-600" : ""}`}
          >
            <div className="flex items-start">{icon}</div>
            <span className="flex flex-col">
              <span className="text-lg font-bold leading-5 text-white">
                {title}
              </span>
              <span className="text-sm text-white/50 hidden md:block">
                {subtitle}
              </span>
            </span>
          </Link>
        </Can>
      ) : (
        <Link
          href={path}
          className={`w-full px-4 rounded-full inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150
          ${currentPath === path ? "bg-blue-600" : ""}`}
        >
          <div className="flex items-start">{icon}</div>
          <span className="flex flex-col">
            <span className="text-lg font-bold leading-5 text-white">
              {title}
            </span>
            <span className="text-sm text-white/50 hidden md:block">
              {subtitle}
            </span>
          </span>
        </Link>
      )}
    </>
  );
};
