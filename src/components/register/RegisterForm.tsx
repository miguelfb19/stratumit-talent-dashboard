"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Input, Button, Form, Select, SelectItem, Link } from "@heroui/react";
import { useForm } from "react-hook-form";

import { countries } from "@/data/countries";
import { RegisterFormInputs } from "@/interfaces/register-form-inputs";
import { registerNewUser } from "@/actions/auth/register-new-user";
import { submitAlert } from "@/utils/alerts";

import { Loading } from "../ui/Loading";

export const RegisterForm = () => {
  const router = useRouter();

  // Password reveal button (Eye)
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);

  // React-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterFormInputs>();

  // Regular expresions for email and password
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  const OnSubmitForm = async (data: RegisterFormInputs) => {
    // Transform de date for DB format
    // eslint-disable
    const { birthDate, confirmPassword, ...rest } = data;
    const dataToSave = {
      ...rest,
      birthDate: new Date(birthDate),
    };

    // Call the server action
    const newUser = await registerNewUser(dataToSave);

    // Handle some error
    if (!newUser?.ok) {
      submitAlert(newUser.message, "error");

      return;
    }
    // Redirect to Login
    router.push("/auth/send-mail-screen");
  };

  return (
    <div
      className="flex h-screen w-screen justify-center items-center bg-slate-700 overflow-scroll"
      id="form-container"
    >
      {isSubmitting && <Loading />}
      <Form
        className={clsx("w-1/2 border-2 p-10 rounded-lg shadow-2xl bg-white", {
          "opacity-50 pointer-events-none": isSubmitting,
        })}
        onSubmit={handleSubmit(OnSubmitForm)}
      >
        <h2 className="text-4xl w-full text-center font-bold">Register</h2>
        <p className="text-sm mb-6 w-full text-center text-slate-600">
          All fields in this form are required
        </p>
        <div className="w-full flex flex-col gap-5" id="formInuts">
          <Input
            placeholder="First Name"
            radius="full"
            type="text"
            {...register("firstName", { required: "This field is required" })}
            // Validate if fisrtName errors exist
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
          <Input
            placeholder="Email"
            radius="full"
            type="email"
            {...register("email", {
              required: "This field is required",
              pattern: { value: emailRegex, message: "Enter a correct email" },
            })}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <span className="flex gap-3">
            <Input
              endContent={
                // Boton para revelar contraseña
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              placeholder="Password"
              radius="full"
              type={isVisible ? "text" : "password"}
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />
            <Input
              placeholder="Confirm Password"
              radius="full"
              type="password"
              {...register("confirmPassword", {
                required: "This field is required",

                // Validate that the passwords match
                validate: (value) => {
                  if (value !== getValues().password) {
                    return "Passwords do not match";
                  }

                  return true;
                },
              })}
              errorMessage={errors.confirmPassword?.message}
              isInvalid={!!errors.confirmPassword}
            />
          </span>
          <Input
            placeholder="Birth Date"
            radius="full"
            type="date"
            {...register("birthDate", { required: "This field is required" })}
            errorMessage={errors.birthDate?.message}
            isInvalid={!!errors.birthDate}
          />
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
        </div>

        <div
          className="flex w-full gap-10 justify-center mt-7"
          id="register-buttons"
        >
          <Button
            fullWidth
            color="primary"
            isDisabled={isSubmitting}
            radius="full"
            type="submit"
            variant="flat"
          >
            Register
          </Button>
          <Button
            fullWidth
            color="primary"
            isDisabled={isSubmitting}
            radius="full"
            type="reset"
            variant="flat"
          >
            Reset
          </Button>
        </div>
        <span className="w-full text-center mt-5 text-sm">
          ¿Already have an account?{" "}
          <Link href="/auth/login" size="sm">
            Login
          </Link>
        </span>
      </Form>
    </div>
  );
};
