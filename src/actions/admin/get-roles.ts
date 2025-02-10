"use server";

import prisma from "@/lib/prisma";

export const getAllRoles = async () => {
  try {
    const roles = await prisma.role.findMany();

    return {
      ok: true,
      message: "Roles found",
      roles: roles,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 Error getting roles from db",
      error: error,
    };
  }
};
