"use server";

import prisma from "@/lib/prisma";

export const saveImageUrl = async (imageUrl: string, profileId: string) => {
  try {
    const savedData = await prisma.profile.update({
      where: {
        id: profileId,
      },
      //   Save or update image
      data: {
        imageUrl,
      },
      //   Return only necesary information
      select: {
        imageUrl: true,
      },
    });

    const { imageUrl: image } = savedData;

    if (!image) {
      return { ok: false, message: "Error saving image URL" };
    }

    return {
      ok: true,
      message: "Image URL saved successfully",
      imageUrl: image,
    };
  } catch (error) {
    return { ok: false, message: "Error saving image URL", error };
  }
};
