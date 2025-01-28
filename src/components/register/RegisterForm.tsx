"use client";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { useState } from "react";

export const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const OnSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Submitted");
  };

  // Fields

  // fisrtName, lastName, email, passqord, confirmationPassword, birthDate, country

  return (
    <div
      id="form-container"
      className="flex h-screen w-screen justify-center items-center bg-slate-700"
    >
      <Form
        onSubmit={OnSubmitForm}
        className="w-1/2 border-2 p-10 rounded-lg bg-white"
      >
        <h2 className="text-4xl w-full text-center font-bold mb-6">Register</h2>
        <div id="formInuts" className="w-full flex flex-col gap-5">
          <Input
            type="text"
            placeholder="First Name"
            radius="full"
            className="border-2 rounded-full border-slate-300"
          />
          <Input
            type="text"
            placeholder="Last Name"
            radius="full"
            className="border-2 rounded-full border-slate-300"
          />
          <Input
            type="email"
            placeholder="Email"
            radius="full"
            className="border-2 rounded-full border-slate-300"
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
              className="border-2 rounded-full border-slate-300"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              radius="full"
              className="border-2 rounded-full border-slate-300"
            />
          </span>
          <Input
            type="date"
            placeholder="Birth Date"
            radius="full"
            className="border-2 rounded-full border-slate-300"
          />
          <Input
            type="text"
            placeholder="Country"
            radius="full"
            className="border-2 rounded-full border-slate-300"
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
          >
            Register
          </Button>
          <Button
            type="reset"
            color="primary"
            fullWidth
            radius="full"
            variant="flat"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};
