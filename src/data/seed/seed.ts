import prisma from "../../lib/prisma";
import { languajes, technologies, users } from "./seed-data";

async function main() {
      // First delete all the data
    await prisma.profileTechnologies.deleteMany()
    await prisma.profileLanguajes.deleteMany()
    await prisma.languaje.deleteMany();
    await prisma.technology.deleteMany();
    await prisma.jobExperiences.deleteMany()
    await prisma.educationalProject.deleteMany()
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    // // Create seed data
    // await prisma.user.createMany({
    //   data: users,
    // });

    // // Create languajes
    // for (const languaje of languajes) {
    //   await prisma.languaje.create({
    //     data: {
    //       name: languaje,
    //     },
    //   });
    // }

    // // Create technologies with his respective category
    // technologies.map(async (technology) => {
    //   const { category, name } = technology;

    //   await prisma.technology.createMany({
    //     data: {
    //       name,
    //       category,
    //     },
    //   });
    // });

  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
