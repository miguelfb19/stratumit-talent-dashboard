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
        message: "Profile has not languajes registered",
      };
    }

    return {
      ok: true,
      message: "Profile languajes retrieved",
      data: languajesData.languajes,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error getting profile lenguajes",
      errorDetail: error,
    };
  }
};
