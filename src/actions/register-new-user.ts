"use server";

import prisma from "@/lib/prisma";
import { hashSync } from "bcryptjs";
import { User } from "@/interfaces/user";

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

    const { password, ...rest } = data;
    const dataWithHashPassword = {
      ...rest,
      password: hashSync(password),
    };

    const newUser = await prisma.user.create({
      data: dataWithHashPassword,
    });

    console.log("success");
    return {
      ok: true,
      message: "Register success!",
      newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Register failed!",
    };
  }
};