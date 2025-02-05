"use server";

import prisma from "@/lib/prisma";

export const getPersonalData = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user)
      return {
        ok: false,
        message: "User not found",
        user: null,
      };

    const { birthDate, country, email, firstName, lastName, roles, profile } =
      user;

    //   return user without profile
    if (!profile) {
      return {
        ok: true,
        message: "User data retrieved without profile",
        user: {
          firstName,
          lastName,
          email,
          country,
          birthDate,
          roles,
          profile: null,
        },
      };
    } else {
      const { motivationText, timezone, phoneNumber, imageUrl, id } = profile;
      // return user with profile
      return {
        ok: true,
        message: "User data retrieved",
        user: {
          firstName,
          lastName,
          email,
          country,
          birthDate,
          roles,
          profile: {
            id,
            motivationText,
            timezone,
            phoneNumber,
            imageUrl,
          },
        },
      };
    }
  } catch (error) {
    return {
      ok: false,
      message: "Error retrieving user data",
      user: null,
      error,
    };
  }
};
