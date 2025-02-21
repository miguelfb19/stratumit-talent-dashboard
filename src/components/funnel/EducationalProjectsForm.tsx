"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { IoAdd, IoTrash } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { Loading } from "../ui/Loading";

import { NavigateButtons } from "./NavigateButtons";

import { submitAlert } from "@/utils/alerts";
import { EducationalProject } from "@/interfaces/funnel";
import { columnsEducationalProjectsFunnel } from "@/data/funnel-data";
import { saveEducationalProjects } from "@/actions/funnel/save-data-to-db/save-educational-project";

interface Props {
  profileId: string;
  projects: EducationalProject[] | null;
}

export const EducationalProjectsForm = ({ profileId, projects }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Handle Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // This state save jobs data
  const [savedProjects, setSavedProjects] = useState(projects);

  // Use form to handle form inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<EducationalProject>();

  // This function save form data state to show it in table
  const onSaveProject = async (data: EducationalProject) => {
    if (data.startDate >= data.finishDate) {
      setError("finishDate", {
        message: "Finish date must be greater than start date",
      });

      return;
    }

    if (!savedProjects) setSavedProjects([data]);
    else setSavedProjects([...savedProjects, { ...data }]);

    reset();
    onOpenChange();
  };

  // This function handle delete specific job from state
  const deleteJob = (project: EducationalProject) => {
    setSavedProjects((actualState) => {
      // If there is one job only, reset the state to avoid errors at moment to show table
      if (!actualState) {
        return null;
      }

      // If there is more than one job, filter state to delete selected job information
      const newJobs = actualState.filter(
        (savedJob) =>
          savedJob.projectName !== project.projectName ||
          savedJob.startDate !== project.startDate,
      );

      return newJobs;
    });
  };

  // This function ends all proccess, sendding the information where i a tell it
  const onPressNext = async () => {
    setIsLoading(true);
    // Handle error
    if (!savedProjects || savedProjects.length === 0)
      return submitAlert("You must fill in at least one field", "error");

    // save data on db
    const savedData = await saveEducationalProjects(profileId, savedProjects);

    // Handle errors on db saved
    if (!savedData.ok) submitAlert(savedData.message, "error");

    // Next step
    router.push("/talent-funnel/upload-profile-image");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <h1 className="text-2xl md:text-3xl font-bold mb-5 w-full">Educational projects</h1>
      <div className="flex flex-col justify-between h-full mt-5 overflow-scroll">
        <div className="flex flex-col gap-5 p-3" id="table-button-container">
          {savedProjects && savedProjects.length !== 0 && (
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columnsEducationalProjectsFunnel}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={savedProjects}>
                {(job) => (
                  <TableRow
                    key={job.projectName + job.startDate + job.finishDate}
                  >
                    {(columnKey) => (
                      <TableCell>
                        {columnKey === "delete" ? (
                          <button onClick={() => deleteJob(job)}>
                            <IoTrash
                              className="cursor-pointer fill-red-500"
                              size={15}
                            />
                          </button>
                        ) : (
                          getKeyValue(job, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <Button
            className="self-center text-gray-700"
            radius="full"
            startContent={<IoAdd size={15} />}
            onPress={onOpen}
          >
            Add project
          </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Enter project</ModalHeader>
                <ModalBody>
                  <Form
                    className="flex w-full h-full justify-between"
                    onSubmit={handleSubmit(onSaveProject)}
                  >
                    <div
                      className="flex flex-col gap-5 w-full mt-5"
                      id="fields-container"
                    >
                      <Input
                        placeholder="Project name"
                        radius="full"
                        type="text"
                        {...register("projectName", {
                          required: "This field is required",
                        })}
                        errorMessage={errors.projectName?.message}
                        isInvalid={!!errors.projectName}
                      />
                      <Input
                        placeholder="Link (optional)"
                        radius="full"
                        type="text"
                        {...register("link")}
                        errorMessage={errors.link?.message}
                        isInvalid={!!errors.link}
                      />
                      <Textarea
                        maxLength={301}
                        minRows={6}
                        placeholder="Description"
                        radius="full"
                        type="text"
                        {...register("description", {
                          required: "This field is required",
                          maxLength: {
                            value: 300,
                            message:
                              "Description must be less than 300 characters",
                          },
                        })}
                        errorMessage={errors.description?.message}
                        isInvalid={!!errors.description}
                      />
                      <span className="flex gap-5">
                        <Input
                          label="Start Date"
                          radius="full"
                          type="date"
                          {...register("startDate", {
                            required: "This field is required",
                          })}
                          errorMessage={errors.startDate?.message}
                          isInvalid={!!errors.startDate}
                        />
                        <Input
                          label="Finish Date"
                          radius="full"
                          type="date"
                          {...register("finishDate", {
                            required: "This field is required",
                          })}
                          errorMessage={errors.finishDate?.message}
                          isInvalid={!!errors.finishDate}
                        />
                      </span>
                    </div>
                    <div className="flex w-full gap-2 justify-end my-3">
                      <Button
                        color="primary"
                        radius="full"
                        type="submit"
                        variant="flat"
                      >
                        Save
                      </Button>
                      <Button
                        color="danger"
                        radius="full"
                        variant="flat"
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
      <NavigateButtons
        prevLink="/talent-funnel/job-experiences"
        sendFormData={onPressNext}
      />
    </>
  );
};
