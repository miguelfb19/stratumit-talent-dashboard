"use client";

import { Button, Form, Input, Link, CircularProgress } from "@heroui/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { submitAlert } from "@/utils/alerts";
import { LoginFormInputs } from "@/interfaces/login-form-inputs";
import { authenticate } from "@/actions/auth/authenticate";

export const LoginForm = () => {
  const router = useRouter();
  const params = useSearchParams();

  // Fields verification
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    // If user recently verified his email, we'll show success verified message
    const loginError = params.get("loginerror");

    if (loginError) submitAlert("Has been an error login, try again", "error");
    router.replace("/auth/login");

    // If user recently verified his email, we'll show success verified message
    const verified = params.get("verified");

    if (verified) submitAlert("Email verified successly", "success");
  }, []);

  // Password reveal button (Eye)
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isVisible, setIsVisible] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onLogin = async (data: LoginFormInputs) => {
    try {
      const login = await authenticate(data);

      if (!login?.ok) {
        submitAlert(login?.message!, "error");
      } else router.push("/talent-funnel/motivation-text");
    } catch (error) {
      return { error, message: "Error on authenticate" };
    }
  };

  return (
    <div
      className="flex h-screen w-screen justify-center items-center bg-slate-700 overflow-scroll"
      id="form-container"
    >
      {isSubmitting && (
        <CircularProgress
          className="absolute top-1/2 right-1/2 translate-x-1/2"
          size="lg"
        />
      )}
      <Form
        className={clsx("w-1/2 border-2 p-10 rounded-lg shadow-2xl bg-white", {
          "opacity-50 pointer-events-none": isSubmitting,
        })}
        onSubmit={handleSubmit(onLogin)}
      >
        <h2 className="text-4xl w-full text-center font-bold">Welcome</h2>
        <p className="text-sm mb-6 w-full text-center text-slate-600">
          Enter your credentials to login
        </p>
        <div className="w-full flex flex-col gap-5" id="formInuts">
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
            })}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
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
            Login
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
          {/* eslint-disable */}
          ¿Don't have an account?{" "}
          <Link href="/auth/register" size="sm">
            Register
          </Link>
        </span>
        <span className="w-full text-sm text-center">
          Go back to{" "}
          <Link className="text-sm" href="/">
            home
          </Link>
        </span>
      </Form>
    </div>
  );
};
