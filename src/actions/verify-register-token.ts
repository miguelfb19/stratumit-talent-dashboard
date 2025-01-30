"use server";

import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export const verifyRegisterToken = async (token: string) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };

    if (decoded.email) {
      // First, i have to find the user with the decoded email
      const user = await prisma.user.findFirst({
        where: {
          email: decoded.email,
        },
      });
      // Verify user exist
      if (!user) throw new Error("User not found");

      // Change field isVerified to true in user
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          isVerified: true,
        },
      });

      return { ok: true, message: "User verified", user: user}
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Someting went wrong with the verification", user: null }
  }
};
