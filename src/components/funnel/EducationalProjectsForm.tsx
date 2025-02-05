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
import { columnsEducationalProjectsFunnel } from "@/data/funnel-data";
import { useRouter } from "next/navigation";
import { submitAlert } from "@/utils/alerts";
import { EducationalProject } from "@/interfaces/funnel";
import { saveEducationalProjects } from "@/actions/funnel/save-data-to-db/save-educational-project";

interface Props {
  profileId: string;
  projects: EducationalProject[] | null;
}

export const EducationalProjectsForm = ({ profileId, projects }: Props) => {
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
          savedJob.startDate !== project.startDate
      );
      return newJobs;
    });
  };

  // This function ends all proccess, sendding the information where i a tell it
  const onPressNext = async () => {
    // Handle error
    if (!savedProjects || savedProjects.length === 0)
      return submitAlert("You must fill in at least one field", "error");

    // save data on db
    const savedData = await saveEducationalProjects(profileId, savedProjects);

    // Handle errors on db saved
    if (!savedData.ok) submitAlert(savedData.message, "error");

    // Next step
    router.push("/talent-funnel/upload-profile-image");
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full mt-5 overflow-scroll">
        <div id="table-button-container" className="flex flex-col gap-5 p-3">
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
                              size={15}
                              className="cursor-pointer fill-red-500"
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
            radius="full"
            onPress={onOpen}
            startContent={<IoAdd size={15} />}
            className="self-center text-gray-700"
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
                      id="fields-container"
                      className="flex flex-col gap-5 w-full mt-5"
                    >
                      <Input
                        radius="full"
                        type="text"
                        placeholder="Project name"
                        {...register("projectName", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.projectName}
                        errorMessage={errors.projectName?.message}
                      />
                      <Input
                        radius="full"
                        type="text"
                        placeholder="Link (optional)"
                        {...register("link")}
                        isInvalid={!!errors.link}
                        errorMessage={errors.link?.message}
                      />
                      <Textarea
                        radius="full"
                        type="text"
                        minRows={6}
                        placeholder="Description"
                        {...register("description", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.description}
                        errorMessage={errors.description?.message}
                      />
                      <span className="flex gap-5">
                        <Input
                          radius="full"
                          label="Start Date"
                          type="date"
                          {...register("startDate", {
                            required: "This field is required",
                          })}
                          isInvalid={!!errors.startDate}
                          errorMessage={errors.startDate?.message}
                        />
                        <Input
                          radius="full"
                          label="Finish Date"
                          type="date"
                          {...register("finishDate", {
                            required: "This field is required",
                          })}
                          isInvalid={!!errors.finishDate}
                          errorMessage={errors.finishDate?.message}
                        />
                      </span>
                    </div>
                    <div className="flex w-full gap-2 justify-end my-3">
                      <Button
                        color="primary"
                        variant="flat"
                        type="submit"
                        radius="full"
                      >
                        Save
                      </Button>
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        radius="full"
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
