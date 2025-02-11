"use client";

import { Button, Link } from "@heroui/react";
import { useSearchParams } from "next/navigation";

export default function ForbiddenPage() {
  const params = useSearchParams();
  const isNotTalent = params.get("talent");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-700">
      <div className="bg-white h-1/2 w-1/2 rounded-3xl flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-red-500 text-center">
          403 - {isNotTalent ? "Access denied to dashboard" : "Access Denied"}
        </h1>
        <p className="mt-2 text-center">
          {isNotTalent
            ? "You must complete at least 50% of the talent information to view dashboard."
            : "You dont have permission to access to this page."}
        </p>
        <Button
          as={Link}
          className="mt-5"
          color="primary"
          href={isNotTalent ? "talent-funnel/motivation-text" : "/dashboard"}
          radius="full"
          variant="flat"
        >
          {isNotTalent ? "Go to funnel" : "Ir al dashboard"}
        </Button>
      </div>
    </div>
  );
}
