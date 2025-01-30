"use client";

import {
  Button,
  Form,
  getKeyValue,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { NavigateButtons } from "./NavigateButtons";
import { IoAdd, IoTrash } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { columnsEducationalProjectsFunnel } from "@/data/data";
import { useRouter } from "next/navigation";

interface JobsFormInputs {
  projectTitle: string;
  link: string;
  description: string;
}

// TODO: añadir tecnologias

export const EducationalProjectsForm = () => {
  const router = useRouter();

  // Handle Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // This state save jobs data
  const [savedProjects, setSavedProjects] = useState([
    {
      projectTitle: "",
      link: "",
      description: "",
    },
  ]);

  // Use form to handle form inputs
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<JobsFormInputs>();

  // This function save form data state to show it in table
  const onSaveJob = (data: JobsFormInputs) => {
    if (savedProjects[0].projectTitle === "") setSavedProjects([data]);
    else setSavedProjects([...savedProjects, { ...data }]);

    reset();
  };

  // This function handle delete specific job from state
  const deleteJob = (job: JobsFormInputs) => {
    setSavedProjects((prevJobs) => {
      // If there is one job only, reset the state to avoid errors at moment to show table
      if (prevJobs.length === 1) {
        console.log("Reseteando valores...");
        return [
          {
            projectTitle: "",
            link: "",
            description: "",
          },
        ];
      }

      // If there is more than one job, filter state to delete selected job information
      const newJobs = prevJobs.filter(
        (savedJob) => savedJob.projectTitle !== job.projectTitle
      );
      return newJobs;
    });
  };

  // This function ends all proccess, sendding the information where i a tell it
  const onPressNext = () => {
    console.log("funciono la prop function");

    console.log(savedProjects);

    router.push("/talent-funnel/upload-profile-image");
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full mt-5 overflow-scroll">
        <div id="table-button-container" className="flex flex-col gap-5">
          {savedProjects[0].projectTitle !== "" && (
            <Table aria-label="Educational Projects">
              <TableHeader columns={columnsEducationalProjectsFunnel}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={savedProjects}>
                {(project) => (
                  <TableRow key={project.projectTitle}>
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === "delete" ? (
                          <button onClick={() => deleteJob(project)}>
                            <IoTrash
                              size={15}
                              className="cursor-pointer fill-red-500"
                            />
                          </button>
                        ) : (
                          getKeyValue(project, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <Button
            onPress={onOpen}
            startContent={<IoAdd size={15} />}
            className="self-center text-gray-700"
          >
            Add Project
          </Button>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Enter Project</ModalHeader>
                <ModalBody>
                  <Form
                    className="flex w-full h-full justify-between"
                    onSubmit={handleSubmit(onSaveJob)}
                  >
                    <div
                      id="fields-container"
                      className="flex flex-col gap-5 w-full mt-5"
                    >
                      <Input
                        type="text"
                        placeholder="Project title"
                        {...register("projectTitle", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.projectTitle}
                        errorMessage={errors.projectTitle?.message}
                      />
                      <Input
                        type="text"
                        placeholder="Link to project (optional)"
                        {...register("link")}
                      />
                      <Textarea
                        type="text"
                        minRows={6}
                        placeholder="Description"
                        {...register("description", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.description}
                        errorMessage={errors.description?.message}
                      />
                    </div>
                    <div className="flex w-full gap-2 justify-end my-3">
                      <Button
                        color="primary"
                        variant="flat"
                        type="submit"
                        onPress={isValid ? onClose : () => {}}
                      >
                        Save
                      </Button>
                      <Button color="danger" variant="flat" onPress={onClose}>
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
      <NavigateButtons
        prevLink="/talent-funnel/upload-profile-image"
        sendFormData={onPressNext}
      />
    </>
  );
};
