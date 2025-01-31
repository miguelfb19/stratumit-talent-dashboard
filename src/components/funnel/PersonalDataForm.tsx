"use client";

import { NavigateButtons } from "./NavigateButtons";
import { useForm } from "react-hook-form";
import { Input, Form, Select, SelectItem } from "@heroui/react";
import { countries } from "@/data/countries";
import { IoCalendar } from "react-icons/io5";
import { timezones } from "@/data/timezones";

interface PersonalDataForm {
  firstName: string;
  lastName: string;
  country: string;
  birthDate: string;
  phoneNumber: string;
  timezone: string;
}

export const PersonalDataForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PersonalDataForm>();

  const onPressNext = (data: PersonalDataForm) => {
    console.group(data);
  };

  return (
    <Form
      className="flex w-full h-full mt-5 justify-between"
      onSubmit={handleSubmit(onPressNext)}
    >
      <div className="flex flex-col w-full gap-3">
        <span className="flex gap-5">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
        </span>
        <span className="flex w-full gap-3">
          <Select
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
            type="text"
            placeholder="Phone number"
            startContent={<span className="text-gray-500 text-sm">+57</span>}
          />
        </span>
        <Input type="date" label="Birth date" />
        <Select
            aria-label="Select a timezone"
            placeholder="Select timezone"
            {...register("timezone", { required: "This field es required" })}
            isInvalid={!!errors.country}
            errorMessage={errors.country?.message}
          >
            {timezones.map((zone) => (
              <SelectItem key={zone.zone} className="border-none">
                {`${zone.country} ${zone.zone} ${zone.utc}`}
              </SelectItem>
            ))}
          </Select>
      </div>

      <NavigateButtons prevLink="/talent-funnel/upload-profile-image" />
    </Form>
  );
};
