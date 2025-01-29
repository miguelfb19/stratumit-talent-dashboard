"use client";

// React
import { useState } from "react";

// Libraries
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  Input,
  Button,
  Form,
  Select,
  SelectItem,
  Spinner,
  Link,
} from "@heroui/react";

// Components and other files
import { countries } from "@/utils/countries";
import { useForm } from "react-hook-form";
import { RegisterFormInputs } from "@/interfaces/register-form-inputs";
import { registerNewUser } from "@/actions/register-new-user";
import { submitAlert } from "@/utils/alerts";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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
    const { birthDate, confirmPassword, ...rest } = data;
    const dataToSave = {
      ...rest,
      birthDate: `${birthDate}T00:00:00Z`,
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
      id="form-container"
      className="flex h-screen w-screen justify-center items-center bg-slate-700 overflow-scroll"
    >
      {isSubmitting && (
        <Spinner
          size="lg"
          className="absolute top-1/2 right-1/2 translate-x-1/2"
        />
      )}
      <Form
        onSubmit={handleSubmit(OnSubmitForm)}
        className={clsx("w-1/2 border-2 p-10 rounded-lg shadow-2xl bg-white", {
          "opacity-50 pointer-events-none": isSubmitting,
        })}
      >
        <h2 className="text-4xl w-full text-center font-bold">Register</h2>
        <p className="text-sm mb-6 w-full text-center text-slate-600">
          All fields in this form are required
        </p>
        <div id="formInuts" className="w-full flex flex-col gap-5">
          <Input
            type="text"
            placeholder="First Name"
            radius="full"
            {...register("firstName", { required: "This field is required" })}
            // Validate if fisrtName errors exist
            isInvalid={!!errors.firstName}
            errorMessage={errors.firstName?.message}
          />
          <Input
            type="text"
            placeholder="Last Name"
            radius="full"
            {...register("lastName", { required: "This field is required" })}
            isInvalid={!!errors.lastName}
            errorMessage={errors.lastName?.message}
          />
          <Input
            type="email"
            placeholder="Email"
            radius="full"
            {...register("email", {
              required: "This field is required",
              pattern: { value: emailRegex, message: "Enter a correct email" },
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
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
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              radius="full"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              radius="full"
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
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
          </span>
          <Input
            type="date"
            placeholder="Birth Date"
            radius="full"
            {...register("birthDate", { required: "This field is required" })}
            isInvalid={!!errors.birthDate}
            errorMessage={errors.birthDate?.message}
          />
          <Select
            aria-label="Select a country"
            placeholder="Select a country"
            radius="full"
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
        </div>

        <div
          id="register-buttons"
          className="flex w-full gap-10 justify-center mt-7"
        >
          <Button
            type="submit"
            color="primary"
            fullWidth
            radius="full"
            variant="flat"
            isDisabled={isSubmitting}
          >
            Register
          </Button>
          <Button
            type="reset"
            color="primary"
            fullWidth
            radius="full"
            variant="flat"
            isDisabled={isSubmitting}
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
