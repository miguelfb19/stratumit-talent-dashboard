import prisma from "@/lib/prisma";
import { LanguajeLevel } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { languajes, techCategories, technologies } from "@/data/seed/seed-data";

export async function GET(request: NextRequest) {
  // First delete all the data
  await prisma.languaje.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.techCategory.deleteMany();

  for (const languaje of languajes) {
    await prisma.languaje.create({
      data: {
        name: languaje,
      },
    });
  }

  // Transform array strings to array object like this: {name: category}
  const categoriesData = techCategories.map((category) => ({
    name: category,
  }));

  // Seed db with data
  await prisma.techCategory.createMany({
    data: categoriesData,
  });

  // get categories from DB and Map to { [key: string]: string } to save technologies with respective category
  const techCategoriesFromDb = await prisma.techCategory.findMany();
  const techCategoriesMap = techCategoriesFromDb.reduce(
    (acc, category) => {
      acc[category.name] = category.id;
      return acc;
    },
    {} as { [key: string]: string }
  );

  // save technologies with his respective category
  technologies.map(async (technology) => {
    const { category, name } = technology;

    await prisma.technology.createMany({
      data: {
        name: name,
        categoryId: techCategoriesMap[category],
      },
    });
  });

  return NextResponse.json({ message: "Seed executed successfully" });
}
