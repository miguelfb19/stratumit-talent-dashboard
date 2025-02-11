"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth.config";
import { LoginFormInputs } from "@/interfaces/login-form-inputs";

export const authenticate = async (data: LoginFormInputs) => {
  try {
    // This extre step were 'cause signIn expect an object {email, password}
    const { email, password } = data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { status: 200, message: "Login success", ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 401,
            message: "Invalid credentials",
            ok: false,
            error,
          };
        default:
          return {
            status: 500,
            message: "Something went wrong, try again later.",
            ok: false,
            error,
          };
      }
    }
  }
};
