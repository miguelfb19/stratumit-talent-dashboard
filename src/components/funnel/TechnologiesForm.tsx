"use client";

import { Checkbox, CheckboxGroup, Form, Chip } from "@heroui/react";
import { technologies, techCategories } from "@/data/seed/seed-data";

import { NavigateButtons } from "./NavigateButtons";
import { useController, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { submitAlert } from "@/utils/alerts";
import { saveTechnologies } from "@/actions/funnel/save-data-to-db/save-technologies";
import { AddOtherTechnologyForm } from "./AddOtherTechnologyForm";
import { useState } from "react";
import { TechCategory } from "../../data/seed/seed-data";

type TechnologiesData = {
  name: string;
  category: TechCategory;
};

interface ChipboxValues {
  technologies: string[];
}

// Props to get information from DB
interface Props {
  profileId: string;
  technologiesFromDb: string[];
}

export const TechnologiesForm = ({ profileId, technologiesFromDb }: Props) => {
  const [addedTechs, setAddedTechs] = useState<TechnologiesData[]>();

  const router = useRouter();

  const { handleSubmit, control } = useForm<ChipboxValues>({
    // Show DB saved on DB
    defaultValues: { technologies: technologiesFromDb },
  });

  // Control the change of checkboxes
  const { field } = useController({
    name: "technologies",
    control,
  });

  // Function to add more technologies
  const getDataFromModal = (data: TechnologiesData) => {
    // Add to state
    if (!addedTechs) setAddedTechs([data]);
    else setAddedTechs([...addedTechs, data]);

    // Add values to form state
    field.value = [...field.value, data.name];
    field.onChange(field.value);
    
    console.log(field.value)

  };

  // // To remove added technologies
  // const handleCloseChip = (techName: string) => {
  //   setAddedTechs(addedTechs?.filter((tech) => tech.name !== techName));

  //   field.value = field.value.filter((tech) => tech !== techName);
  //   field.onChange(field.value);

  //   console.log(field.value)
  // };

  // Function to submit form and add data to DB
  const onPressNext = async (data: ChipboxValues) => {
    if (data.technologies.length === 0)
      return submitAlert("You must fill in at least one field", "error");

    // Transform data to send to db name and category

    const dataWithAddedCategory = data.technologies.map(
      (technology: string) => {
        const foundTech = technologies.find((tech) => tech.name === technology);
        return {
          name: technology,
          category: foundTech ? foundTech.category : "Others"
        };
      }
    );
    const savedTechnologies = await saveTechnologies(
      profileId,
      dataWithAddedCategory
    );

    if (!savedTechnologies.ok) {
      submitAlert(savedTechnologies.message, "error");
      return;
    }

    router.push("/talent-funnel/job-experiences");
  };

  return (
    <>
      <Form
        className="relative flex w-full h-full"
        onSubmit={handleSubmit(onPressNext)}
      >
        {/* <AddOtherTechnologyForm addNewTechnologies={getDataFromModal} /> */}
        <div className="flex flex-col h-72 w-full overflow-scroll gap-5">
          {techCategories.map((category) => {
            const filteredTechs = technologies.filter(
              (tech) => tech.category === category
            );
            return (
              <CheckboxGroup
                label={category}
                className="gap-5"
                color="primary"
                key={category}
                orientation="horizontal"
                value={field.value}
                onValueChange={field.onChange}
              >
                {filteredTechs.map((tech) => (
                  <Chip key={tech.name + tech.category} className={`${field.value.includes(tech.name) ? "bg-[#0B6FEE] to-white" : ""}`}>
                    <Checkbox value={tech.name} className={`border-none border-0 ${field.value.includes(tech.name) ? "" : ""}`} radius="none">
                    </Checkbox>
                      <span className={`${field.value.includes(tech.name) ? "text-white" : ""}`}>{tech.name}</span>
                  </Chip>
                ))}
                {/* Added more technologies
                {category === "Others" &&
                  addedTechs?.map((tech, index) => (
                    <Chip
                      key={tech.name + index}
                      onClose={() => handleCloseChip(tech.name)}
                    >
                      <Checkbox
                        value={tech.name}
                        className="gap-1"
                        radius="full"
                      >
                        <span>{tech.name}</span>
                      </Checkbox>
                    </Chip>
                  ))} */}
              </CheckboxGroup>
            );
          })}
        </div>
        <NavigateButtons prevLink="/talent-funnel/languajes" />
      </Form>
    </>
  );
};
