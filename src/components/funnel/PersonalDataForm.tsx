"use client";

import { useForm } from "react-hook-form";
import { Input, Form, Select, SelectItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { NavigateButtons } from "./NavigateButtons";

import { countries } from "@/data/countries";
import { timezones } from "@/data/timezones";
import { PersonalData } from "@/interfaces/funnel";
import { savePersonalData } from "@/actions/funnel/save-data-to-db/save-personal-data";
import { submitAlert } from "@/utils/alerts";
import { Loading } from "../ui/Loading";

interface Props {
  userData: PersonalData | null;
  userId: string;
}

export const PersonalDataForm = ({ userData, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // Handle indicative changes
  const [indicative, setIndicative] = useState("+1");

  const router = useRouter();

  // Use form to handle form
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PersonalData>({
    defaultValues: userData
      ? userData
      : {
          firstName: "",
          lastName: "",
          country: "",
          birthDate: "",
          phoneNumber: "",
          timezone: "",
        },
  });

  // Handle indicative changes
  const handleIndicative = (country: string) => {
    const selectedCountry = countries.find((item) => item.name === country);

    return selectedCountry ? selectedCountry.indicative : "+1";
  };

  // To set indicative in the phoneNumber input
  useEffect(() => {
    setIndicative(handleIndicative(watch("country")));
  }, [watch("country")]);

  const onPressNext = async (data: PersonalData) => {
    setIsLoading(true);
    // manual validation should have been done here, I still don't know why.
    if (data.timezone === "") {
      setError("timezone", {
        type: "manual",
        message: "This field is required",
      });

      return;
    }

    // Add indicative to number
    data.phoneNumber = indicative + data.phoneNumber;

    // Save in DB
    const savedData = await savePersonalData(userId, data);

    // In case of errors
    if (!savedData.ok) {
      submitAlert(savedData.message, "error");
    }

    // Redirect to user dashboard
    router.push("/dashboard/profile");
    setIsLoading(false);
  };

  return (
    <Form
      className="flex w-full h-full mt-5 justify-between"
      onSubmit={handleSubmit(onPressNext)}
    >
      {isLoading && <Loading />}
      <div className="flex flex-col w-full gap-3">
        <span className="flex gap-5">
          <Input
            placeholder="First Name"
            radius="full"
            type="text"
            {...register("firstName", { required: "This field is required" })}
            errorMessage={errors.firstName?.message}
            isInvalid={!!errors.firstName}
          />
          <Input
            placeholder="Last Name"
            radius="full"
            type="text"
            {...register("lastName", { required: "This field is required" })}
            errorMessage={errors.lastName?.message}
            isInvalid={!!errors.lastName}
          />
        </span>
        <span className="flex w-full gap-3">
          <Select
            aria-label="Select a country"
            placeholder="Select a country"
            radius="full"
            {...register("country", { required: "This field es required" })}
            errorMessage={errors.country?.message}
            isInvalid={!!errors.country}
          >
            {countries.map((country) => (
              <SelectItem key={country.name} className="border-none">
                {`${country.name} ${country.indicative}`}
              </SelectItem>
            ))}
          </Select>
          <Input
            placeholder="Phone number"
            radius="full"
            startContent={
              <span className="text-gray-500 text-sm">{indicative}</span>
            }
            type="text"
            {...register("phoneNumber", { required: "This field is required" })}
            errorMessage={errors.phoneNumber?.message}
            isInvalid={!!errors.phoneNumber}
          />
        </span>
        <Input
          label="Birth date"
          radius="full"
          type="date"
          {...register("birthDate", { required: "This field is required" })}
          errorMessage={errors.birthDate?.message}
          isInvalid={!!errors.birthDate}
        />
        <Select
          aria-label="Select a timezone"
          errorMessage={errors.timezone?.message}
          isInvalid={!!errors.timezone}
          placeholder="Select timezone"
          radius="full"
          selectedKeys={new Set([watch("timezone")])}
          onSelectionChange={(selected) => {
            const timezoneValue = Array.from(selected)[0] as string;

            setValue("timezone", timezoneValue);
            clearErrors("timezone");
          }}
          // This step is strangely necessary here, because for some reason this field is not being read by the "register"
        >
          {timezones.map((timezone) => (
            <SelectItem
              key={timezone.zone}
              className="border-none"
              value={timezone.zone}
            >
              {`${timezone.country} ${timezone.zone} ${timezone.utc}`}
            </SelectItem>
          ))}
        </Select>
      </div>

      <span className="flex w-full items-end">
        <NavigateButtons
          nextButton={false}
          prevLink="/talent-funnel/upload-profile-image"
        />
        <Button color="success" radius="full" type="submit" variant="flat">
          Save
        </Button>
      </span>
    </Form>
  );
};
