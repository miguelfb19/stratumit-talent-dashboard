"use server";

import prisma from "@/lib/prisma";
import { LanguajeLevel } from "@prisma/client";

export const saveLanguajes = async (
  profileId: string,
  data: { name: string; level: string }[]
) => {
  try {
    console.log("Data: ", data);

    const savedData = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        languajes: {
          create: data.map((lang) => ({
            languaje: {
              connectOrCreate: { //TODO: Es necesario pasarle el id...
                where: { name: lang.name }, // if languaje already exist, conect the new with the existing
                create: { name: lang.name, level: lang.level as LanguajeLevel }, //If lang don't exist, creates it
              },
            },
          })),
        },
      },
      include: {
        languajes: true,
      },
    });

    if (!savedData) {
      throw new Error("Error saving languajes");
    }

    throw new Error("Error saving languajes");
  } catch (error) {
    return {
      ok: false,
      message: "Error saving languajes, try again later",
      errorDetail: error,
    };
  }
};
