/*
  Warnings:

  - You are about to drop the column `profileId` on the `Languaje` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Technology` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Languaje" DROP CONSTRAINT "Languaje_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_profileId_fkey";

-- AlterTable
ALTER TABLE "Languaje" DROP COLUMN "profileId";

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "profileId";

-- CreateTable
CREATE TABLE "ProfileLanguajes" (
    "profileId" TEXT NOT NULL,
    "languajeId" TEXT NOT NULL,

    CONSTRAINT "ProfileLanguajes_pkey" PRIMARY KEY ("profileId","languajeId")
);

-- CreateTable
CREATE TABLE "ProfileTechnologies" (
    "profileId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,

    CONSTRAINT "ProfileTechnologies_pkey" PRIMARY KEY ("profileId","technologyId")
);

-- AddForeignKey
ALTER TABLE "ProfileLanguajes" ADD CONSTRAINT "ProfileLanguajes_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileLanguajes" ADD CONSTRAINT "ProfileLanguajes_languajeId_fkey" FOREIGN KEY ("languajeId") REFERENCES "Languaje"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileTechnologies" ADD CONSTRAINT "ProfileTechnologies_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileTechnologies" ADD CONSTRAINT "ProfileTechnologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
