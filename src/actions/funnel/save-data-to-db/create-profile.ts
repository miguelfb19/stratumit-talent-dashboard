"use server";

import prisma from "@/lib/prisma";

export const createProfile = async (userId: string) => {
  try {
    // Get user and profile if exist
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { profile: true, roles: true },
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

    // Add new 'talent' role if user is not admin
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

    if (user?.profile) {
      return {
        ok: true,
        message: "Profile already exists",
        profile: user.profile,
      };
    }

    const newProfile = await prisma.profile.create({
      data: {
        userId: userId,
        motivationText: null,
        timezone: null,
      },
    });

    return {
      ok: true,
      message: "Profile created",
      profile: newProfile,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error creating profile",
      errorDetail: error,
    };
  }
};
