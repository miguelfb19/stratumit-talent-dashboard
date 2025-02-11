"use server";

import prisma from "@/lib/prisma";
import { LanguajeLevel } from "@prisma/client";

export const saveLanguajes = async (
  profileId: string,
  data: { name: string; level: string }[],
) => {
  try {
    const savedData = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        languajes: {
          // Delete previous information to save new data
          deleteMany: {},
          // Create a new languaje
          create: data.map((lang) => ({
            level: lang.level as LanguajeLevel,
            // Create or updated the existing languaje
            languaje: {
              connectOrCreate: {
                where: { name: lang.name }, // if languaje already exist, conect the new with the existing
                create: { name: lang.name }, //If lang don't exist, creates it
              },
            },
          })),
        },
      },
      // Return only languajes
      select: {
        languajes: true,
      },
    });

    if (!savedData) {
      throw new Error("Error saving languajes");
    }

    return {
      ok: true,
      message: "Languajes saved",
      languajes: savedData.languajes,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error saving languajes, try again later",
      errorDetail: error,
    };
  }
};
