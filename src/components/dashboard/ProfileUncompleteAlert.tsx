"use client";

import { Button, Link } from "@heroui/react";

export const ProfileUncompleteAlert = () => {
  return (
    <div className="absolute rounded-full h-16 bg-yellow-500 w-1/2 top-2 flex gap-5 justify-center items-center text-red-600 font-bold text-xl">
      Profile incomplete
      <Button
        as={Link}
        color="success"
        href="/talent-funnel/motivation-text"
        radius="full"
        variant="shadow"
      >
        Complete profile
      </Button>
    </div>
  );
};
