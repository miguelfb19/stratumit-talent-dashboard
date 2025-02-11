"use server";

import { getSession } from "next-auth/react";

import prisma from "@/lib/prisma";

export const addTalentRole = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: true,
      },
    });

    if (!user) throw new Error("User not found");
    // Get Talent rol id from DB
    const talentRole = await prisma.role.findUnique({
      where: {
        name: "Talent",
      },
    });

    if (!talentRole) throw new Error("Talent role not found");

    // Get user roles
    const userRoles = user.roles.map((role) => role.roleId);

    // Add new 'Talent' role if user is not admin
    if (!userRoles.includes(talentRole.id)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          roles: {
            create: {
              role: {
                connect: {
                  id: talentRole.id,
                },
              },
            },
          },
        },
      });
    }

    await getSession();
  } catch (error) {
    return {
      ok: false,
      message: "Error adding talent role to user",
      errorDetail: error,
    };
  }
};
