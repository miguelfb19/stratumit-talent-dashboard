"use server";

import prisma from "@/lib/prisma";

export const getEducationalProjects = async (profileId: string) => {
  try {
    const data = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        educationalProjects: true,
      },
    });

    if (!data?.educationalProjects)
      return {
        ok: false,
        message: "Profile don't have educational projects yet",
        data,
      };

    const { educationalProjects } = data;

    return {
      ok: true,
      message: "Educational projects retrieved",
      educationalProjects,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 Error getting educational projects",
      errorDetail: error,
    };
  }
};
