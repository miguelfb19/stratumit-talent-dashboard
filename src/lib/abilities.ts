import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import prisma from "./prisma";

export async function defineAbilityFor(userId: string) {
  // Obtener los roles del usuario y sus permisos
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  // Extraer permisos únicos
  const permissions = userRoles.flatMap((userRole) =>
    userRole.role.permissions.map((perm) => ({
      action: perm.permission.name, // El `id` de la tabla `Permission` es el nombre del permiso
      subject: "all", // Puedes ajustar a "Dashboard", "User", etc.
    }))
  );

  const { can, cannot, build } = new AbilityBuilder(createPrismaAbility);

  permissions.forEach(({ action, subject }) => {
    can(action, subject);
  });

  return build();
}
