"use client";

import { CircularProgress } from "@heroui/react";
import React from "react";
import { useEffect } from "react";

interface Props {
  reload?: boolean;
}

export const Loading = ({ reload = false }: Props) => {
  useEffect(() => {
    if (reload) window.location.reload();
  }, []);

  return (
    <div className="absolute top-0 right-0 rounded pointer-events-none z-20 opacity-100 bg-black/10 w-full h-full flex items-center justify-center">
      <CircularProgress className="w-full" size="lg" />
    </div>
  );
};
