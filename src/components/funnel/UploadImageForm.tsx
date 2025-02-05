"use client";

import React, { useEffect, useState } from "react";
import { Input, Form, Image } from "@heroui/react";
import { IoImageOutline } from "react-icons/io5";
import { NavigateButtons } from "./NavigateButtons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/actions/funnel/save-data-to-db/upload-image";
import { saveImageUrl } from "@/actions/funnel/save-data-to-db/save-image-url";
import { submitAlert } from "@/utils/alerts";

interface ImageForm {
  image: FileList;
}

interface Props {
  profileId: string;
  imageUrl: string | null;
}

export const UploadImageForm = ({ profileId, imageUrl }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ImageForm>();

  const [filePreview, setFilePreview] = useState("");

  const onPressNext = async (data: ImageForm) => {
    // If previous image exist on db and user don't want to save any other image, continue to next step
    if (imageUrl) {
      if (!filePreview || filePreview === "") {
        router.push("/talent-funnel/personal-data");
        return;
      }
    }

    // Transform data to save on server
    const formData = new FormData();
    formData.append("image", data.image[0]);

    // save image on server
    const savedImage = await uploadImage(formData, imageUrl);
    const { fileUrl, message } = savedImage;
    if (!fileUrl) {
      submitAlert(message, "error");
      console.error(savedImage.error);
      return;
    }

    const savedUrlImage = await saveImageUrl(fileUrl, profileId);
    if (!savedUrlImage.ok) {
      console.error(savedUrlImage.error);
      submitAlert(savedUrlImage.message, "error");
      return;
    }

    router.push("/talent-funnel/personal-data");
  };

  // Watch actual file input state
  const image = watch("image");

  // Validate file and set preview
  useEffect(() => {



    // set preview
    if (!image?.[0]) return setFilePreview("");
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result as string);
    reader.readAsDataURL(image[0]);
  }, [image]);

  return (
    <>
      <Form
        className="flex w-full h-full mt-5 justify-between"
        onSubmit={handleSubmit(onPressNext)}
      >
        <Input
          radius="full"
          type="file"
          accept="image/*"
          label="Select an image"
          endContent={<IoImageOutline size={20} />}
          {...register("image", {
            required: imageUrl ? false : "This field is required to continue",
            // Validate form to file format
            validate: (value: FileList) => {
              // If exist a db image, return true in case that user want to continue with the same image
              if (imageUrl !== null) {
                return true;
              }
              const file = value?.[0];
              if (!file) return "This field is required to continue";
              if (!file.type.startsWith("image/"))
                return "The file must be an image";
              const validFormats = [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
              ];
              if (!validFormats.includes(file.type))
                return "Invalid format, must be: png, jpg, jpeg, gif";
              return true;
            },
          })}
          isInvalid={!!errors.image}
          errorMessage={errors.image?.message}
        />
        <span className="flex flex-col w-full justify-center items-center">
          <Image
            width={200}
            alt="img"
            src={
              filePreview !== ""
                ? filePreview
                : imageUrl
                  ? imageUrl
                  : "/not-profile-image.png"
            }
            className="bg-slate-200 aspect-square object-cover"
          />
        </span>

        <NavigateButtons prevLink="/talent-funnel/educational-projects" />
      </Form>
    </>
  );
};
