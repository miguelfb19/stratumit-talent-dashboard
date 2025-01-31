"use client";

import { languajesData, languajesLevels } from "@/data/funnel-data";
import { Button, Form, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { IoAdd, IoTrash } from "react-icons/io5";
import { NavigateButtons } from './NavigateButtons';

type LanguajeFormValues = {
  languajes: { languaje: string; level: string }[];
};

export const LanguajeForm = () => {
  // we use control to handle pair of values languaje-level
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<LanguajeFormValues>({
    defaultValues: {
      languajes: [{ languaje: "", level: "" }],
    },
  });

  const router = useRouter()

  const getDisabledLanguages = () => {
    // Get all current languages selected
    const languajes = getValues("languajes");
    // Filter selected languages
    return languajes.map((item) => item.languaje).filter((lang) => lang);
  };

  //   useFieldArray allows me handle dinamic fields to add or remove languajes
  const { fields, append, remove } = useFieldArray({
    control, //control from useForm
    name: "languajes", // name of my fields Array
  });

  const onPressNext = (data: LanguajeFormValues) => {
    
    console.log("Submitted: ", data);

    router.push('/talent-funnel/technologies')

  };

  return (
    <>
      <Form
        className="flex w-full h-full mt-5 justify-between"
        onSubmit={handleSubmit(onPressNext)}
      >
        <div
          id="fields-button"
          className="flex w-full flex-col gap-5  max-h-72 overflow-hidden"
        >
          {/* Use the fields property of useFieldArray to create fields dinamicly */}
          {fields.map((field, index) => (
            <div id="fields" className="flex w-full gap-5" key={field.id}>
              <Select
                placeholder="Select languaje"
                aria-label="Select languaje"
                // Here i register the field to save information
                {...register(`languajes.${index}.languaje`, {
                  required: "This field is required",
                })}
                // show error when
                isInvalid={!!errors.languajes?.[index]?.languaje}
                errorMessage={errors.languajes?.[index]?.languaje?.message}
                // Disable previous selected languajes
                disabledKeys={getDisabledLanguages()}
              >
                {languajesData.map((languaje) => (
                  <SelectItem key={languaje} value={languaje} >
                    {languaje}
                  </SelectItem>
                ))}
              </Select>
              <Select
                placeholder="Select Level"
                aria-label="Select Level"
                {...register(`languajes.${index}.level`, {
                  required: "This field is required",
                })}
                isInvalid={!!errors.languajes?.[index]?.level}
                errorMessage={errors.languajes?.[index]?.level?.message}
              >
                {languajesLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </Select>

              {/* This button remove the respective field */}
              <Button
                isIconOnly
                aria-label="remove"
                variant="flat"
                onPress={() => remove(index)}
                className="hover:bg-red-100 transition-all"
              >
                <IoTrash size={15} color="gray" />
              </Button>
            </div>
          ))}
          {/* This button add new fields */}
          <Button
            isIconOnly
            aria-label="add"
            variant="flat"
            className="hover:bg-blue-200 transition-all"
            onPress={() => append({ languaje: "", level: "" })}
          >
            <IoAdd size={20} color="gray" />
          </Button>
        </div>

        {/* Navigation buttons */}
        <NavigateButtons prevLink="/talent-funnel/motivation-text"/>
      </Form>
    </>
  );
};
