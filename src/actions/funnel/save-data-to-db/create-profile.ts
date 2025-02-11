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
