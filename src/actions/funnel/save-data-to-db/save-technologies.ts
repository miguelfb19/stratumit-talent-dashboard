"use server";

import { TechCategory } from "@/data/seed/seed-data";
import prisma from "@/lib/prisma";

export const saveTechnologies = async (
  profileId: string,
  data: { name: string; category: TechCategory }[],
) => {
  try {
    const savedData = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        technologies: {
          // Delete previous data
          deleteMany: {},
          // Create new data
          create: data.map((tech) => ({
            technology: {
              connectOrCreate: {
                where: { name: tech.name },
                create: {
                  category: tech.category,
                  name: tech.name,
                },
              },
            },
          })),
        },
      },
      // Return only necesary data
      select: {
        technologies: {
          select: {
            technology: true,
          },
        },
      },
    });

    if (!savedData) {
      throw new Error("Error saving languajes");
    }

    return {
      ok: true,
      message: "Languajes saved",
      languajes: savedData.technologies,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error saving languajes, try again later",
      errorDetail: error,
    };
  }
};
