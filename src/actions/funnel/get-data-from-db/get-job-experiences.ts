"use server";

import prisma from "@/lib/prisma";

export const getJobExperiences = async (profileId: string) => {
  try {
    const data = await prisma.profile.findUnique({
      where: {
        id: profileId,
      },
      select: {
        careerTimeline: true,
      },
    });

    if (!data?.careerTimeline)
      return {
        ok: false,
        message: "Profile don't have job experiences yet",
        data,
      };

    const { careerTimeline } = data;

    return {
      ok: true,
      message: "Career Timeline retrieved",
      careerTimeline,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 Error getting career timeline",
      errorDetail: error,
    };
  }
};
