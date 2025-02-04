import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { SelectItem } from "@heroui/react";
import {
  techCategories,
  TechCategory,
  technologies,
} from "@/data/seed/seed-data";
import { submitAlert } from "@/utils/alerts";

interface NewTechnologyForm {
  name: string;
  category: TechCategory;
}

interface Props {
  addNewTechnologies: (newTech: NewTechnologyForm) => void;
}

export const AddOtherTechnologyForm = ({ addNewTechnologies }: Props) => {
  // Handle Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm<NewTechnologyForm>();

  const addTechnology = () => {
    // Avoid repeat technologies
    const technologiesArray = technologies.map((tech) =>
      tech.name.toLocaleLowerCase()
    );
    if (technologiesArray.includes(watch("name").toLocaleLowerCase())) {
      submitAlert("This technology already exist", "error");
      return;
    }

    const name = watch("name");
    const category = watch("category");

    if (!name) {
      setError("name", { type: "manual", message: "This field is required" });
      return;
    }

    if (!category) {
      setError("category", {
        type: "manual",
        message: "This field is required",
      });
      return;
    }

    addNewTechnologies({
      name: watch("name"),
      category: watch("category"),
    });
    reset();
    onOpenChange();
  };

  return (
    <>
      <div className="hidden">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  You can add three (3) technologies maximum
                </ModalHeader>
                <ModalBody>
                  <Form className="flex w-full h-full justify-between">
                    <div
                      id="fields-container"
                      className="flex flex-col gap-5 w-full mt-5"
                    >
                      <Input
                        radius="full"
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                      <Select
                        radius="full"
                        aria-label="category"
                        placeholder="Category"
                        {...register("category")}
                        isInvalid={!!errors.category}
                        errorMessage={errors.category?.message}
                      >
                        {techCategories.map((category) => (
                          <SelectItem key={category}>{category}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex w-full gap-2 justify-end my-3">
                      <Button
                        color="primary"
                        variant="flat"
                        // type="submit"
                        onPress={addTechnology}
                        radius="full"
                      >
                        Save
                      </Button>
                      <Button
                        color="danger"
                        variant="flat"
                        radius="full"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <Button
        radius="full"
        color="primary"
        variant="flat"
        className="absolute bottom-0 right-1/2 translate-x-1/2"
        onPress={onOpen}
      >
        Add other technology
      </Button>
    </>
  );
};
