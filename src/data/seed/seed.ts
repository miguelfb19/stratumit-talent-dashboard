import prisma from "../../lib/prisma";

import {
  languajes,
  permissions,
  rolePermissions,
  roles,
  technologies,
  users,
} from "./seed-data";

async function main() {
  await prisma.user.deleteMany();
  await prisma.languaje.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

  // Create languajes
  for (const languaje of languajes) {
    await prisma.languaje.create({
      data: {
        name: languaje,
      },
    });
  }

  // Create technologies with his respective category
  technologies.map(async (technology) => {
    const { category, name } = technology;

    await prisma.technology.createMany({
      data: {
        name,
        category,
      },
    });
  });

  // Create and get permissions and roles
  await prisma.permission.createMany({
    data: permissions.map((permission) => ({ name: permission })),
  });

  await prisma.role.createMany({
    data: roles.map((role) => ({ name: role })),
  });

  const rolesdDB = await prisma.role.findMany();
  const permissionsDB = await prisma.permission.findMany();

  // Assignement role permissions

  await prisma.rolePermission.createMany({
    data: rolePermissions.flatMap(
      (rolPerm) => {
        return rolPerm.permissions.map((perm) => {
          return {
            roleId: rolesdDB.find((role) => role.name === rolPerm.role)!.id,
            permissionId: permissionsDB.find(
              (permission) => permission.name === perm,
            )!.id,
          };
        });
      },

      // roleId: rolesdDB.find((role) => role.name === rolPerm.role)!.id,
      // permissionId:
    ),
  });

  // Create users seed data

  const userRoles = await prisma.role.findMany({
    where: {
      name: {
        in: users.map((user) => user.role),
      },
    },
  });

  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          birthDate: user.birthDate,
          password: user.password,
          country: user.country,
          isVerified: user.isVerified,
          roles: {
            createMany: {
              data: userRoles
                .filter((role) => role.name === user.role)
                .map((role) => ({ roleId: role.id })),
            },
          },
        },
      });
    }),
  );

  //eslint-disable-next-line
  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
