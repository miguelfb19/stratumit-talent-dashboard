"use server";

import prisma from "@/lib/prisma";

export const saveTechnologies = async (
  profileId: string,
  data: string[]
) => {
  try {
    const savedData = 

    if (!savedData) {
      throw new Error("Error saving languajes");
    }

    return {
      ok: true,
      message: "Languajes saved",
      languajes: savedData.languajes,
    
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
