"use client";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { Input, Button, Form, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { countries } from "@/seed/countries";

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
        className="w-1/2 border-2 p-10 rounded-lg bg-white shadow-2xl shadow-black"
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
          <Select
            aria-label="Select a country"
            placeholder="Select a country"
            radius="full"
            className="border-2 rounded-full border-slate-300"
          >
            {countries.map((country) => (
              <SelectItem key={country.name} className="border-none">
                {country.name}
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
