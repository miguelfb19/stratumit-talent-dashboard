"use client";

import { useState } from "react";
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

import { columnsToJobsInformationOnFunnel } from "@/data/funnel-data";
import { JobExperiences } from "@/interfaces/funnel";
import { submitAlert } from "@/utils/alerts";
import { saveJobExperiences } from "@/actions/funnel/save-data-to-db/save-job-experiences";

interface Props {
  profileId: string;
  jobExpFromDb: JobExperiences[] | null;
}

export const JobExperiencesForm = ({ profileId, jobExpFromDb }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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
          savedJob.startDate !== job.startDate,
      );

      return newJobs;
    });
  };

  // This function ends all proccess, sendding the information where i a tell it
  const onPressNext = async () => {
    setIsLoading(true);
    if (!savedJobs)
      return submitAlert("You must fill in at least one field", "error");

    const savedData = await saveJobExperiences(profileId, savedJobs);

    if (!savedData.ok) submitAlert(savedData.message, "error");

    window.location.replace("/talent-funnel/educational-projects");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <h1 className="text-3xl font-bold mb-5 w-full">Job Experiences</h1>
      <div className="flex flex-col justify-between h-full mt-5 overflow-scroll">
        <div className="flex flex-col gap-5 p-3" id="table-button-container">
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
                      className="flex flex-col gap-5 w-full mt-5"
                      id="fields-container"
                    >
                      <Input
                        placeholder="Company"
                        radius="full"
                        type="text"
                        {...register("company", {
                          required: "This field is required",
                        })}
                        errorMessage={errors.company?.message}
                        isInvalid={!!errors.company}
                      />
                      <Input
                        placeholder="Role"
                        radius="full"
                        type="text"
                        {...register("role", {
                          required: "This field is required",
                        })}
                        errorMessage={errors.role?.message}
                        isInvalid={!!errors.role}
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
        prevLink="/talent-funnel/technologies"
        sendFormData={onPressNext}
      />
    </>
  );
};
