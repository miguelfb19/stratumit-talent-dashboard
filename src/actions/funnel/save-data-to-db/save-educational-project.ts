"use server";

import { EducationalProject, JobExperiences } from "@/interfaces/funnel";
import prisma from "@/lib/prisma";

export const saveEducationalProjects = async (
  profileId: string,
  data: EducationalProject[],
) => {
  try {
    const savedData = await prisma.profile.update({
      // Save in corresponding profile
      where: {
        id: profileId,
      },
      //  Data to save in careerTimeline
      data: {
        educationalProjects: {
          // Delete previous info
          deleteMany: {},
          create: data.map((project) => ({
            projectName: project.projectName,
            startDate: new Date(project.startDate),
            finishDate: new Date(project.finishDate!),
            link: project.link,
            description: project.description,
          })),
        },
      },
      //   Return only necesary information
      select: {
        educationalProjects: true,
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
