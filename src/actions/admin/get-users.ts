"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUsersFromDb = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    console.log(users)

    if (!users)
      return {
        ok: false,
        message: "No users found",
      };

    revalidatePath('/admin/manage-users')

    return {
      ok: true,
      message: "Users found",
      users: users,
    };
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: "500 Error getting users from db",
      error: error,
    };
  }
};
