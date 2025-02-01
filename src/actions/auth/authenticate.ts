"use server";

import { signIn } from "@/auth.config";
import { LoginFormInputs } from "@/interfaces/login-form-inputs";
import { AuthError } from "next-auth";

export const authenticate = async (data: LoginFormInputs) => {
  try {

    // This extre step were 'cause signIn expect an object {email, password}
    const { email, password } = data;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { status: 200, message: "Login success", ok: true}
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      console.error("error de AuthError: ", error);
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 401,
            message: "Incorrect credentials",
            ok: false,
          };
        default:
          return { status: 500, message: "Something went wrong", ok: false };
      }
    }
  }
};
