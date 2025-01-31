"use client";

import React, { useEffect, useState } from "react";
import { Input, Form, Image } from "@heroui/react";
import { IoImageOutline } from "react-icons/io5";
import { NavigateButtons } from "./NavigateButtons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface ImageForm {
  image: FileList;
}

export const UploadImageForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ImageForm>();

  const [filePreview, setFilePreview] = useState("");

  const onPressNext = (data: ImageForm) => {

    console.log(data.image[0]);

    router.push("/talent-funnel/personal-data")

  };

  // Watch actual file input state
  const image = watch("image");

  // Validate file and set preview
  useEffect(() => {
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
          type="file"
          accept="img"
          label="Select an image"
          endContent={<IoImageOutline />}
          {...register("image", {
            required: "This field is required to continue",
            // Validate form to file format
            validate: (value: FileList) => {
              const file = value?.[0];
              if (!file) return "This field is required to continue";
              if (!file.type.includes("image"))
                return "The file must be an image";
              const validFormats = [
                "image/png",
                "iage/jpg",
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
        <span className="flex w-full justify-center">
          <Image
            width={200}
            alt="img"
            src={filePreview ? filePreview : "/not-profile-image.png"}
            className="bg-slate-200 aspect-square object-cover"
          />
        </span>

        <NavigateButtons prevLink="/talent-funnel/educational-projects" />
      </Form>
    </>
  );
};
