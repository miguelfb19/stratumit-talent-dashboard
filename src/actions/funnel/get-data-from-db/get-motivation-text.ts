"use server";

import prisma from "@/lib/prisma";
import { ok } from "assert";

export const getMotivationtext = async (profileId: string) => {
  try {
    const data = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
      select: {
        motivationText: true,
      },
    });

    if (!data || data.motivationText === "") {
      return {
        ok: false,
        message: "Motivation text is empty",
      };
    }

    return {
        ok: true, 
        message: "Motivation text retrieved",
        motivationText: data.motivationText
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error getting motivation text",
      errorDetail: error,
    };
  }
};
