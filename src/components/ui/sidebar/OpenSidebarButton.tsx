"use client";

import { useMenuStore } from "@/store/use-menu-store";
import { RxHamburgerMenu } from "react-icons/rx";

export const OpenSidebarButton = () => {
  const { openMenu } = useMenuStore();

  return (
    <button className="absolute top-4 left-4 md:hidden mb-5" onClick={openMenu}>
      <RxHamburgerMenu size={30} color="#2563eb" />
    </button>
  );
};
