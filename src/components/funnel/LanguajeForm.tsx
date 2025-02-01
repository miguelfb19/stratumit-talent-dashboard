"use client";

import { languajesData, languajesLevels } from "@/data/funnel-data";
import { Button, Form, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { IoAdd, IoTrash } from "react-icons/io5";
import { NavigateButtons } from "./NavigateButtons";
import { saveLanguajes } from "@/actions/funnel/save-data-to-db/save-languajes";
import { submitAlert } from "@/utils/alerts";

type LanguajeFormValues = {
  languajes: { name: string; level: string }[];
};

interface Props {
  languajesFromDb: { name: string; level: string }[] | null;
  profileId: string
}

export const LanguajeForm = ({languajesFromDb, profileId}:Props) => {
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

    const {languajes} = data

    const savedLanguajes = await saveLanguajes(profileId, languajes)

    if(!savedLanguajes?.ok) {
      submitAlert(savedLanguajes?.message!, 'error')
      return
    }

    submitAlert(savedLanguajes.message, 'success')
    router.push("/talent-funnel/technologies");
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
                radius="full"
                placeholder="Select languaje"
                aria-label="Select languaje"
                // Here i register the field to save information
                {...register(`languajes.${index}.name`, {
                  required: "This field is required",
                })}
                // show error when
                isInvalid={!!errors.languajes?.[index]?.name}
                errorMessage={errors.languajes?.[index]?.name?.message}
                // Disable previous selected languajes
                disabledKeys={getDisabledLanguages()}
              >
                {languajesData.map((languaje) => (
                  <SelectItem key={languaje} value={languaje}>
                    {languaje}
                  </SelectItem>
                ))}
              </Select>
              <Select
                radius="full"
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
                radius="full"
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
            radius="full"
            isIconOnly
            aria-label="add"
            variant="flat"
            className="hover:bg-blue-200 transition-all"
            onPress={() => append({ name: "", level: "" })}
          >
            <IoAdd size={20} color="gray" />
          </Button>
        </div>

        {/* Navigation buttons */}
        <NavigateButtons prevLink="/talent-funnel/motivation-text" />
      </Form>
    </>
  );
};
