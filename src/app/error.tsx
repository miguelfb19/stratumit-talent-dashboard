"use client";

import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-500">
      <div className="flex flex-col justify-center items-center p-5 gap-5 bg-slate-50 rounded-xl md:w-1/2 h-1/2">
        <h2 className="text-3xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <span className="flex flex-col gap-2 items-center justify-center w-1/2">
          <Button fullWidth as={Link} onPress={() => router.refresh()}>
            Try again
          </Button>
          or
          <Button fullWidth as={Link} href="/">
            Go home
          </Button>
        </span>
      </div>
    </div>
  );
}
