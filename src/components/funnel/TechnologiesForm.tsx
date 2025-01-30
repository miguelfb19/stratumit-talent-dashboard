"use client";

import { Checkbox, CheckboxGroup, Form } from "@heroui/react";
import { technologies, techCategories } from "@/data/seed/seed-data";

import { NavigateButtons } from "./NavigateButtons";
import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormValues {
  technologies: string[];
}

export const TechnologiesForm = () => {

    const router = useRouter()

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { technologies: [] },
  });

  const { field } = useController({
    name: "technologies",
    control,
  });

  const onPressNext = (data: FormValues) => {
    console.log(data);
    router.push('/talent-funnel/job-experiences')
  };

  return (
    <>
      <Form className="flex w-full h-full" onSubmit={handleSubmit(onPressNext)}>
        <div className="flex flex-col h-72 w-full overflow-x-scroll gap-5">
          {techCategories.map((category) => {
            const filteredTechs = technologies.filter(
              (tech) => tech.category === category
            );
            return (
              <CheckboxGroup
                defaultValue={["buenos-aires", "london"]}
                label={category}
                className="gap-5"
                color="primary"
                key={category}
                orientation="horizontal"
                value={field.value}
                onValueChange={field.onChange}
              >
                {filteredTechs.map((tech) => (
                  <Checkbox
                    value={tech.name}
                    key={tech.name + tech.category}
                    className="gap-1"
                  >
                    {tech.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            );
          })}
        </div>
        <NavigateButtons prevLink="/talent-funnel/languajes" />
      </Form>
    </>
  );
};
