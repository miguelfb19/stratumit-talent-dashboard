"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";

import { Loading } from "../ui/Loading";

import { NavigateButtons } from "./NavigateButtons";

import { saveMotivationText } from "@/actions/funnel/save-data-to-db/save-motivation-text";
import { submitAlert } from "@/utils/alerts";

interface MotivationTextInput {
  text: string;
}
interface Props {
  motivationTextFromDb?: string;
  profileId: string;
}

export const MotivationTextForm = ({
  motivationTextFromDb = "",
  profileId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<MotivationTextInput>({
    defaultValues: {
      text: motivationTextFromDb ? motivationTextFromDb : undefined,
    },
  });

  const onPressNext = async (data: MotivationTextInput) => {
    setIsLoading(true);
    // Save motivation text in DB
    const updatedProfile = await saveMotivationText(data.text, profileId);

    // If exist some error show an alert on screen
    if (!updatedProfile.ok) submitAlert(updatedProfile.message, "error");
    // Continue to next step
    router.push("/talent-funnel/languajes");
    setIsLoading(false);
  };

  return (
    <>
      <Form className="w-full" onSubmit={handleSubmit(onPressNext)}>
        {isLoading && <Loading />}
        <h1 className="w-full text-5xl text-blue-600 text-center font-bold">
          Talents
        </h1>
        <p className="w-full text-center text-sm mt-5">
          To complete your registration as a talent, please complete next
          information:
        </p>
        <h2 className="text-3xl font-bold my-5">Motivation Text</h2>
        <Textarea
          className="w-full max-h-44"
          color="primary"
          minRows={10}
          placeholder="Enter a motivation text"
          type="text"
          variant="faded"
          {...register("text", {
            required: "Please, write a motivation text to continue",
          })}
          errorMessage={errors.text?.message}
          isInvalid={!!errors.text}
        />
        <NavigateButtons prevButon={false} prevLink="" />
      </Form>
    </>
  );
};
