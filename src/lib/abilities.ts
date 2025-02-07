import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import prisma from "./prisma";

export async function defineAbilityFor(
  permissions: {
    action: string;
    subject: string;
  }[]
) {

  //   Define the abilities with the permission Array
  const { can, build } = new AbilityBuilder(createPrismaAbility);

  permissions.forEach(({ action, subject }) => {
    can(action, subject);
  });

  return build();
}
