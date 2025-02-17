"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Form, Image } from "@heroui/react";
import { IoImageOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { uploadImage } from "@/actions/funnel/save-data-to-db/upload-image";
import { saveImageUrl } from "@/actions/funnel/save-data-to-db/save-image-url";
import { submitAlert } from "@/utils/alerts";

import { Loading } from "../ui/Loading";
import { NavigateButtons } from "./NavigateButtons";

interface ImageForm {
  image: FileList;
}

interface Props {
  profileId: string;
  imageUrl: string | null;
}

export const UploadImageForm = ({ profileId, imageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ImageForm>();

  const [filePreview, setFilePreview] = useState("");

  const onPressNext = async (data: ImageForm) => {
    setIsLoading(true);
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
    const savedImage = await uploadImage(formData, profileId);
    const { fileUrl, message } = savedImage;

    if (!fileUrl) {
      submitAlert(message, "error");

      return;
    }

    const savedUrlImage = await saveImageUrl(fileUrl, profileId);

    if (!savedUrlImage.ok) {
      submitAlert(savedUrlImage.message, "error");

      return;
    }

    router.push("/talent-funnel/personal-data");
    setIsLoading(false);
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
        {isLoading && <Loading />}
        <Input
          accept="image/*"
          endContent={<IoImageOutline size={20} />}
          label="Select an image"
          radius="full"
          type="file"
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
          errorMessage={errors.image?.message}
          isInvalid={!!errors.image}
        />
        <span className="flex flex-col w-full justify-center items-center">
          <Image
            alt="img"
            className="bg-slate-200 aspect-square object-cover"
            src={
              filePreview !== ""
                ? filePreview
                : imageUrl
                  ? imageUrl
                  : "/not-profile-image.png"
            }
            width={200}
          />
        </span>

        <NavigateButtons prevLink="/talent-funnel/educational-projects" />
      </Form>
    </>
  );
};
