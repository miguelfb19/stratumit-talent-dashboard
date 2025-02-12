"use server";

import prisma from "@/lib/prisma";

export const createProfile = async (userId: string) => {
  try {
    // Get user and profile if exist
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: { profile: true, roles: true },
    });

    if (!user) throw new Error("User not found");

    // If profile exist, return it
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
