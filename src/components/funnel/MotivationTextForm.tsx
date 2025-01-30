"use client";

import { Form, Textarea, Button, Link } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { NavigateButtons } from './NavigateButtons';

interface MotivationTextInput {
  text: string;
}

export const MotivationTextForm = () => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<MotivationTextInput>();
  const router = useRouter()


  const onPressNext = (data: MotivationTextInput)=>{
    
    
    console.log(data)


    router.push('/talent-funnel/languajes')
  }

  return (
    <Form className="w-full mt-5" onSubmit={handleSubmit(onPressNext)}>
      <h1 className="text-3xl font-bold mb-5">Motivation Text</h1>
      <Textarea
        type="text"
        placeholder="Enter a motivation text"
        className="w-full max-h-44"
        minRows={10}
        color="primary"
        variant="faded"
        {...register("text", {
          required: "Please, write a motivation text to continue",
        })}
        isInvalid={!!errors.text}
        errorMessage={errors.text?.message}
      />
      <NavigateButtons prevButon={false}/>
    </Form>
  );
};
