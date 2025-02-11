"use client";

import { Form, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
    // Save motivation text in DB
    const updatedProfile = await saveMotivationText(data.text, profileId);

    // If exist some error show an alert on screen
    if (!updatedProfile.ok) submitAlert(updatedProfile.message, "error");
    // Continue to next step
    router.push("/talent-funnel/languajes");
  };

  return (
    <Form className="w-full mt-5" onSubmit={handleSubmit(onPressNext)}>
      <h1 className="text-3xl font-bold mb-5">Motivation Text</h1>
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
  );
};
