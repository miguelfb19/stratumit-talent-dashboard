"use client";

import { Button, Link } from "@heroui/react";

export const GoToDashboardButton = () => {
  return (
    <div className="absolute rounded-full h-16 bg-green-100 w-1/2 top-2 right-1/2 translate-x-1/2 flex gap-5 justify-center items-center text-slate-500 font-bold text-xl">
      If you want:
      <Button
        as={Link}
        href="/dashboard/profile"
        radius="full"
        color="success"
        variant="shadow"
      >
        Go to dashboard
      </Button>
    </div>
  );
};
