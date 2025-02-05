"use client";

import { authenticate } from "@/actions/auth/authenticate";
import { LoginFormInputs } from "@/interfaces/login-form-inputs";
import { submitAlert } from "@/utils/alerts";
import { Button, Form, Input, Link, CircularProgress } from "@heroui/react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

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
      if (!login?.ok) submitAlert(login?.message!, "error");
      else router.push("/talent-funnel/motivation-text");
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <div
      id="form-container"
      className="flex h-screen w-screen justify-center items-center bg-slate-700 overflow-scroll"
    >
      {isSubmitting && (
        <CircularProgress
          size="lg"
          className="absolute top-1/2 right-1/2 translate-x-1/2"
        />
      )}
      <Form
        onSubmit={handleSubmit(onLogin)}
        className={clsx("w-1/2 border-2 p-10 rounded-lg shadow-2xl bg-white", {
          "opacity-50 pointer-events-none": isSubmitting,
        })}
      >
        <h2 className="text-4xl w-full text-center font-bold">Welcome</h2>
        <p className="text-sm mb-6 w-full text-center text-slate-600">
          Enter your credentials to login
        </p>
        <div id="formInuts" className="w-full flex flex-col gap-5">
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
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
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
            Login
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
          ¿Don't have an account?{" "}
          <Link href="/auth/register" size="sm">
            Register
          </Link>
        </span>
      </Form>
    </div>
  );
};
