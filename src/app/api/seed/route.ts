import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { languajes, technologies } from "@/data/seed/seed-data";
import bcryptjs from "bcryptjs";

export async function GET(request: NextRequest) {
  // First delete all the data
  await prisma.languaje.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profileLanguajes.deleteMany()
  await prisma.profileTechnologies.deleteMany()
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create seed data
  await prisma.user.create({
    data: {
      firstName: "Miguel Angel",
      lastName: "Fernandez",
      email: "miguelangelfb19@utp.edu.co",
      roles: ["user"],
      birthDate: new Date("1995-01-19"),
      password: bcryptjs.hashSync("miguel123"),
      country: "Colombia",
      isVerified: true,
    },
  });

  for (const languaje of languajes) {
    await prisma.languaje.create({
      data: {
        name: languaje,
      },
    });
  }

  // save technologies with his respective category
  technologies.map(async (technology) => {
    const { category, name } = technology;

    await prisma.technology.createMany({
      data: {
        name,
        category,
      },
    });
  });

  return NextResponse.json({ message: "Seed executed successfully" });
}
