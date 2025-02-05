"use client";

// Components

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

// Hooks

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Data and utils

import { columnsToJobsInformationOnFunnel } from "@/data/funnel-data";
import { JobExperiences } from "@/interfaces/funnel";
import { submitAlert } from "@/utils/alerts";
import { saveJobExperiences } from "@/actions/funnel/save-data-to-db/save-job-experiences";

interface Props {
  profileId: string;
  jobExpFromDb: JobExperiences[] | null;
}

export const JobExperiencesForm = ({ profileId, jobExpFromDb }: Props) => {
  const router = useRouter();

  // Handle Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // This state save jobs data
  const [savedJobs, setSavedJobs] = useState(jobExpFromDb);

  // Use form to handle form inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<JobExperiences>();

  // This function save form data state to show it in table
  const onSaveJob = async (data: JobExperiences) => {
    if (data.startDate >= data.finishDate!) {
      setError("finishDate", {
        message: "Finish date must be greater than start date",
      });
      return;
    }

    if (!savedJobs) setSavedJobs([data]);
    else setSavedJobs([...savedJobs, { ...data }]);

    reset();
    onOpenChange();
  };

  // This function handle delete specific job from state
  const deleteJob = (job: JobExperiences) => {
    setSavedJobs((actualState) => {
      // If there is one job only, reset the state to avoid errors at moment to show table
      if (actualState && actualState.length === 1) {
        return null;
      }

      // If there is more than one job, filter state to delete selected job information
      const newJobs = actualState!.filter(
        (savedJob) =>
          savedJob.company !== job.company ||
          savedJob.startDate !== job.startDate
      );
      return newJobs;
    });
  };

  // This function ends all proccess, sendding the information where i a tell it
  const onPressNext = async () => {
    if (!savedJobs)
      return submitAlert("You must fill in at least one field", "error");

    const savedData = await saveJobExperiences(profileId, savedJobs);

    if (!savedData.ok) submitAlert(savedData.message, "error");

    router.push("/talent-funnel/educational-projects");
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full mt-5 overflow-scroll">
        <div id="table-button-container" className="flex flex-col gap-5 p-3">
          {savedJobs && savedJobs[0]?.company && (
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columnsToJobsInformationOnFunnel}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={savedJobs}>
                {(job) => (
                  <TableRow key={job.company + job.startDate + job.finishDate}>
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
            Add experience
          </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Enter Job Experience</ModalHeader>
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
                        radius="full"
                        type="text"
                        placeholder="Company"
                        {...register("company", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.company}
                        errorMessage={errors.company?.message}
                      />
                      <Input
                        radius="full"
                        type="text"
                        placeholder="Role"
                        {...register("role", {
                          required: "This field is required",
                        })}
                        isInvalid={!!errors.role}
                        errorMessage={errors.role?.message}
                      />
                      <Textarea
                        radius="full"
                        type="text"
                        minRows={6}
                        maxLength={301}
                        placeholder="Description"
                        {...register("description", {
                          required: "This field is required",
                          maxLength: {
                            value: 300,
                            message: "Description must be less than 300 characters",
                          },
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
      <NavigateButtons
        prevLink="/talent-funnel/technologies"
        sendFormData={onPressNext}
      />
    </>
  );
};
