"use client";

import { signOut } from "@/auth.config";
import React from "react";
import { IoLogOut } from "react-icons/io5";

export const LogoutButton = () => {
  const logoutSession = async () => {
    await signOut({ redirectTo: "/auth/login" });
  };
  return (
    <button
      onClick={logoutSession}
      className="flex gap-2 items-center rounded-full text-start py-4 px-4 mx-6 my-5 font-bold text-lg hover:bg-white/5 transition ease-linear duration-150"
    >
      <IoLogOut size={27}/>
      Logout
    </button>
  );
};
