"use server";

import prisma from "@/lib/prisma";

export const getLanguajesFromDb = async (profileId: string) => {
  try {
    const languajesData = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
      select: {
        languajes: {
          select: {
            languaje: true,
            level: true,
          },
        },
      },
    })

    if (!languajesData?.languajes || languajesData.languajes.length === 0) {
      return {
        ok: false,
        message: "User has not languajes registered",
      };
    }

    return {
      ok: true,
      message: "Motivation text retrieved",
      languajes: languajesData.languajes,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error getting motivation text",
      errorDetail: error,
    };
  }
};
