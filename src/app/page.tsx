"use client";

import { Button, Link } from "@heroui/react";

export default function Home() {
  // throw new Error("Error de prueba");
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-500">
      <div
        id="container"
        className="h-1/2 w-1/2 p-20 flex flex-col justify-center items-center bg-slate-50 rounded-lg shadow-2xl shadow-black"
      >
        <h1 className="text-7xl mb-10 text-blue-500 font-semibold">Hello World!</h1>
        <div id="buttons-container" className=" flex gap-10 w-full">
          <Button
            as={Link}
            href="/auth/register"
            radius="full"
            color="primary"
            variant="flat"
            size="lg"
            fullWidth
          >
            Register
          </Button>
          <Button
            as={Link}
            href="/auth/login"
            radius="full"
            color="primary"
            variant="flat"
            size="lg"
            fullWidth
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
