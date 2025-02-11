"use client";

import { Link, Image } from "@heroui/react";

export default function Home() {
  // throw new Error("Error de prueba");
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
      <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-10 h-full w-full">
        <div id="logo" className="flex justify-start pl-20">
          <Image src="/logo.png" width={100} />
        </div>
        <div id="menu" className="flex justify-center items-center">
          <nav className="rounded-full px-32 py-4 bg-white/20 backdrop-blur-3xl shadow-2xl shadow-gray-50">
            <ul className="flex gap-10 font-bold">
              <li>
                <Link
                  href="/auth/register"
                  className="text-white hover:underline hover:text-blue-200 transition-all underline-offset-4"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-white hover:underline hover:text-blue-200 transition-all underline-offset-4"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center justify-center flex-col text-center gap-5 text-white">
          <h1 className="text-7xl mb-10 font-semibold">Talent dashboard</h1>
          <p>
            This is a dashboard to craete and manage talents information in the
            delevopment industry
          </p>
        </div>
        <div
          id="buttons-container"
          className="flex justify-center items-center"
        >
          <Image src="talent_picture.png" width={400} radius="full"></Image>
        </div>
      </div>
    </div>
  );
}
