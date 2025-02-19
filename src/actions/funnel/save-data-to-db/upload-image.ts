"use server";

import { revalidatePath } from "next/cache";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import prisma from "@/lib/prisma";
import { s3 } from "@/lib/aws-s3";

export const uploadImage = async (formData: FormData, profileId: string) => {
  try {
    // Get from DB existing previuos profile imageUrl
    const existingImg = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
      select: {
        imageUrl: true,
      },
    });

    // Delete old image before save new image
    if (existingImg?.imageUrl) {
      // Return key path of previous image
      const previousKey = existingImg.imageUrl.split("/").pop()?.trim();

      try {
        await s3.send(
          new DeleteObjectCommand({
            // Remove the old image
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: previousKey!,
          }),
        );
      } catch (error) {
        return { error, message: "Error to delete old image" };
      }
    }

    // Get file from form and throw an error as the case may be
    const file = formData.get("image") as File;

    if (!file) throw new Error("No file uploaded");

    // Validate image format
    const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

    if (!validFormats.includes(file.type))
      return {
        ok: false,
        message: "Invalid format, must be: png, jpg, jpeg, gif",
      };

    // Convert file to binary buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // define file name to save
    const fileName = `${Date.now()}-name${file.name}`;

    // Save image in AWS S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: `profile-imgs/${fileName}`,
        Body: buffer,
        ContentType: file.type,
      }),
    );

    // Create file URL
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/profile-imgs/${fileName}`;

    // Revalidate path to show data in UI
    revalidatePath("/talent-funnel");

    // Return file URL
    return { ok: true, message: "Image saved successfully", fileUrl };
  } catch (error) {
    return { ok: false, message: "File upload failed", error };
  }
};
