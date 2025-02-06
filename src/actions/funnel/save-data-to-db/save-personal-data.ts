"use server";

import { PersonalData } from "@/interfaces/funnel";
import prisma from "@/lib/prisma";

export const savePersonalData = async (userId: string, data: PersonalData) => {
  try {
    const savedData = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        country: data.country,
        birthDate: new Date(data.birthDate),
        profile: {
          update: {
            phoneNumber: data.phoneNumber,
            timezone: data.timezone,
            profileCompleted: true,
          },
        },
      },
      select: {
        firstName: true,
        lastName: true,
        country: true,
        birthDate: true,
        profile: {
          select: {
            phoneNumber: true,
            timezone: true,
            profileCompleted: true,
          },
        },
      },
    });

    if (!savedData) throw new Error("Error saving data");

    return {
      ok: true,
      message: "Personal data saved successfully",
      data: savedData,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error saving data",
      error: error,
    };
  }
};
