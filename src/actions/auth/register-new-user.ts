"use server";

import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { User } from "@/interfaces/user";
import { sendVerificationMail } from "./send-verification-mail";

export const registerNewUser = async (data: User) => {
  try {
    // Verificate email is not in the DB yet
    const emailExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExist?.email === data.email)
      return { ok: false, message: "Email already exists" };

    // encrypt password
    const { password, ...rest } = data;
    const dataWithHashPassword = {
      ...rest,
      password: hashSync(password),
    };

    //Send verification email token
    await sendVerificationMail(data.email);

    // Save user in DB
    const newUser = await prisma.user.create({
      data: dataWithHashPassword,
    });

    // Return success create
    const { email, firstName, lastName, id, ...otherData } = newUser;
    return {
      ok: true,
      message: "Register success!",
      newUser: { id, firstName, lastName, email },
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Register failed!",
    };
  }
};
