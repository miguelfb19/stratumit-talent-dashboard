"use server";

import { unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const uploadImage = async (formData: FormData, previousImgUrl: string | null) => {
  try {

    // Get from DB existing previuos profile imageUrl
    const existingImg = await prisma.profile.findFirst({
      where: {
        imageUrl: previousImgUrl
      },
      select: {
        imageUrl: true
      }
    })

    // Delete old image before save new image
    if(existingImg?.imageUrl) {
      // Return absolute path of previous image
      const existingImagePath = path.join(
        process.cwd(),
        "public",
        existingImg.imageUrl
      );

      try {
        await unlink(existingImagePath); // Remove the old image
        console.log(`Old image removed: ${existingImagePath}`);
      } catch (error) {
        console.error("Error deleting old image:", error);
      }
    }

    // Get file from form and throw an error as the case may be
    const file = formData.get("image") as File;

    // Validate image format
    const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!validFormats.includes(file.type))
      return {
        ok: false,
        message: "Invalid format, must be: png, jpg, jpeg, gif",
      };

    if (!file) throw new Error("No file uploaded");

    // Convert file to binary buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // define path to save file
    const fileName = `${Date.now()}-name${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public/profile-imgs-upload",
      fileName
    );

    // save file locally
    await writeFile(filePath, new Uint8Array(buffer));
    console.log(`File saved: ${filePath}`);

    // Create file URL
    const fileUrl = `/profile-imgs-upload/${fileName}`;

    // Revalidate path to show data in UI
    revalidatePath("/talent-funnel");

    // Return file URL
    return { ok: true, message: "Image saved successfully", fileUrl };
  } catch (error) {
    return { ok: false, message: "File upload failed", error };
  }
};
