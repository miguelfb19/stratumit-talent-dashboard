"use server";

import prisma from "@/lib/prisma";

export const getTechnologiesFromDb = async (profileId: string) => {
  try {
    const technologiesData = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
      select: {
        technologies: {
          select: {
            technology: {
              select: {
                name: true,
                category: true,
              },
            },
          },
        },
      },
    })

    if (
      !technologiesData?.technologies ||
      technologiesData.technologies.length === 0
    ) {
      return {
        ok: false,
        message: "Profile has not technologies registered",
      };
    }

    return {
      ok: true,
      message: "Profile technologies retrieved",
      data: technologiesData.technologies,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 Error getting profile technologies",
      errorDetail: error,
    };
  }
};
