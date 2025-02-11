"use client";

import { AbilityTuple, PureAbility } from "@casl/ability";
import { PrismaQuery } from "@casl/prisma";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

import { defineAbilityFor } from "@/lib/abilities";

const defaultAbility = new PureAbility<AbilityTuple, PrismaQuery>();

export const AbilityContext = createContext<
  PureAbility<AbilityTuple, PrismaQuery> | undefined
>(defaultAbility);

export function AbilityProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const [ability, setAbility] = useState<
    PureAbility<AbilityTuple, PrismaQuery> | undefined
  >();

  useEffect(() => {
    // if (session?.user) update();
    defineAbilityFor(session?.user.permissions || []).then(setAbility);
  }, [session?.user.permissions]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
