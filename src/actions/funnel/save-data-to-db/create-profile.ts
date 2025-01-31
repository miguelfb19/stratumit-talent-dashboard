"use server";

import prisma from "@/lib/prisma";

export const createProfile = async (userId: string) => {
  try {

    // Get user and profile if exist
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { profile: true },
    });

    console.log(user)
  } catch (error) {
    console.log(error)
  }
};
