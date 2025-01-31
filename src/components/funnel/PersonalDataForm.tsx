"use client";

import { NavigateButtons } from "./NavigateButtons";
import { useForm } from "react-hook-form";
import { Input, Form, Select, SelectItem, Button } from "@heroui/react";
import { countries } from "@/data/countries";
import { timezones } from "@/data/timezones";
import { useRouter } from "next/navigation";

interface PersonalDataForm {
  firstName: string;
  lastName: string;
  country: string;
  birthDate: string;
  phoneNumber: string;
  timezone: string;
}

export const PersonalDataForm = () => {

  const router = useRouter()

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PersonalDataForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      birthDate: "",
      phoneNumber: "",
      timezone: "",
    },
  });

  const onPressNext = (data: PersonalDataForm) => {

    if (data.timezone === "") {
      setError("timezone", { type: "manual", message: "This field is required" });
      return;
    }

    console.group(data);

    router.push("/dashboard/profile")

  };

  return (
    <Form
      className="flex w-full h-full mt-5 justify-between"
      onSubmit={handleSubmit(onPressNext)}
    >
      <div className="flex flex-col w-full gap-3">
        <span className="flex gap-5">
          <Input
            radius="full"
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: "This field is required" })}
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <Input
            radius="full"
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: "This field is required" })}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
        </span>
        <span className="flex w-full gap-3">
          <Select
            radius="full"
            aria-label="Select a country"
            placeholder="Select a country"
            {...register("country", { required: "This field es required" })}
            isInvalid={!!errors.country}
            errorMessage={errors.country?.message}
          >
            {countries.map((country) => (
              <SelectItem key={country.name} className="border-none">
                {`${country.name} ${country.indicative}`}
              </SelectItem>
            ))}
          </Select>
          <Input
            radius="full"
            type="text"
            placeholder="Phone number"
            startContent={<span className="text-gray-500 text-sm">+57</span>}
            {...register("phoneNumber", { required: "This field is required" })}
            isInvalid={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
          />
        </span>
        <Input
          radius="full"
          type="date"
          label="Birth date"
          {...register("birthDate", { required: "This field is required" })}
          isInvalid={!!errors.birthDate}
          errorMessage={errors.birthDate?.message}
        />
        <Select
          radius="full"
          aria-label="Select a timezone"
          placeholder="Select timezone"
          // This step is strangely necessary here, because for some reason this field is not being read by the "register"
          selectedKeys={new Set([watch("timezone")])}
          onSelectionChange={
            (selected) => {
              const timezoneValue = Array.from(selected)[0] as string;
              setValue("timezone", timezoneValue);
              clearErrors("timezone")
            }
          }
          isInvalid={!!errors.timezone}
          errorMessage={errors.timezone?.message}
        >
          {timezones.map((timezone) => (
            <SelectItem
              key={timezone.zone}
              value={timezone.zone}
              className="border-none"
            >
              {`${timezone.country} ${timezone.zone} ${timezone.utc}`}
            </SelectItem>
          ))}
        </Select>
      </div>

      <span className="flex w-full items-end">
        <NavigateButtons
          prevLink="/talent-funnel/upload-profile-image"
          nextButton={false}
        />
        <Button color="success" variant="flat" type="submit" radius="full">
          Save
        </Button>
      </span>
    </Form>
  );
};
