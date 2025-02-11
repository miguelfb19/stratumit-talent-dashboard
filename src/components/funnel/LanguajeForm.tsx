"use client";

import { Button, Form, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { IoAdd, IoTrash } from "react-icons/io5";

import { NavigateButtons } from "./NavigateButtons";

import { languajesData, languajesLevels } from "@/data/funnel-data";
import { saveLanguajes } from "@/actions/funnel/save-data-to-db/save-languajes";
import { submitAlert } from "@/utils/alerts";

type LanguajeFormValues = {
  languajes: { name: string; level: string }[];
};

interface Props {
  languajesFromDb: { name: string; level: string }[] | null;
  profileId: string;
}

export const LanguajeForm = ({ languajesFromDb, profileId }: Props) => {
  // we use control to handle pair of values languaje-level
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<LanguajeFormValues>({
    defaultValues: {
      languajes: languajesFromDb ? languajesFromDb : [{ name: "", level: "" }],
    },
  });

  const router = useRouter();

  const getDisabledLanguages = () => {
    // Get all current languages selected
    const languajes = getValues("languajes");

    // Filter selected languages
    return languajes.map((item) => item.name).filter((lang) => lang);
  };

  //   useFieldArray allows me handle dinamic fields to add or remove languajes
  const { fields, append, remove } = useFieldArray({
    control, //control from useForm
    name: "languajes", // name of my fields Array
  });

  const onPressNext = async (data: LanguajeFormValues) => {
    const { languajes } = data;

    const savedLanguajes = await saveLanguajes(profileId, languajes);

    if (!savedLanguajes?.ok) {
      submitAlert(savedLanguajes?.message!, "error");

      return;
    }
    router.push("/talent-funnel/technologies");
  };

  return (
    <>
      <Form
        className="flex w-full h-full mt-5 justify-between"
        onSubmit={handleSubmit(onPressNext)}
      >
        <div
          className="flex w-full flex-col gap-5  max-h-72 overflow-hidden"
          id="fields-button"
        >
          {/* Use the fields property of useFieldArray to create fields dinamicly */}
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-full gap-5" id="fields">
              <Select
                aria-label="Select languaje"
                disabledKeys={getDisabledLanguages()}
                errorMessage={errors.languajes?.[index]?.name?.message}
                isInvalid={!!errors.languajes?.[index]?.name}
                placeholder="Select languaje"
                radius="full"
                // Here i register the field to save information
                {...register(`languajes.${index}.name`, {
                  required: "This field is required",
                })}
                // show error when
                // Disable previous selected languajes
              >
                {languajesData.map((languaje) => (
                  <SelectItem key={languaje} value={languaje}>
                    {languaje}
                  </SelectItem>
                ))}
              </Select>
              <Select
                aria-label="Select Level"
                placeholder="Select Level"
                radius="full"
                {...register(`languajes.${index}.level`, {
                  required: "This field is required",
                })}
                errorMessage={errors.languajes?.[index]?.level?.message}
                isInvalid={!!errors.languajes?.[index]?.level}
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
                className="hover:bg-red-100 transition-all"
                radius="full"
                variant="flat"
                onPress={() => remove(index)}
              >
                <IoTrash color="gray" size={15} />
              </Button>
            </div>
          ))}
          {/* This button add new fields */}
          <Button
            isIconOnly
            aria-label="add"
            className="hover:bg-blue-200 transition-all"
            radius="full"
            variant="flat"
            onPress={() => append({ name: "", level: "" })}
          >
            <IoAdd color="gray" size={20} />
          </Button>
        </div>

        {/* Navigation buttons */}
        <NavigateButtons prevLink="/talent-funnel/motivation-text" />
      </Form>
    </>
  );
};
