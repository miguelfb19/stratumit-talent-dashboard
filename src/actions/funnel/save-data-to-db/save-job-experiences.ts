"use server";

import { JobExperiences } from "@/interfaces/funnel";
import prisma from "@/lib/prisma";

export const saveJobExperiences = async (
  profileId: string,
  data: JobExperiences[]
) => {
  try {

    const savedData = await prisma.profile.update({
      // Save in corresponding profile
      where: {
        id: profileId,
      },
      //  Data to save in careerTimeline
      data: {
        careerTimeline: {
          deleteMany: {},
          create: data.map((job) => ({
            company: job.company,
            startDate: new Date(job.startDate),
            finishDate: new Date(job.finishDate!),
            role: job.role,
            description: job.description,
          })),
        },
      },
      //   Return only necesary information
      select: {
        careerTimeline: true,
      },
    });

    if (!savedData) throw new Error("Error saving data");

    return {
      ok: true,
      message: "Data saved successfully",
      data: savedData,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 Error saving data",
      errorDetail: error,
    };
  }
};
