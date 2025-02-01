"use server";

import prisma from "@/lib/prisma";

export const saveMotivationText = async (data: string, profileId: string) => {
  try {

    const updatedProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        motivationText: data,
      },
    });

    return {
      ok: true,
      message: "Motivation text saved",
      profile: updatedProfile,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error saving motivation text",
      errorDetail: error,
    };
  }
};
