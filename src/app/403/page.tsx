"use client";

import { Button, Link } from "@heroui/react";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <div className="bg-white h-1/2 w-1/2 rounded-3xl flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-red-500">403 - Access Denied</h1>
        <p className="mt-2">You dont have permission to access to this page.</p>
        <Button
          as={Link}
          href="/"
          radius="full"
          variant="flat"
          color="primary"
          className="mt-5"
        >
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
