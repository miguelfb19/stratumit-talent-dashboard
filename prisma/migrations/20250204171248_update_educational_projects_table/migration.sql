/*
  Warnings:

  - You are about to drop the column `technologies` on the `EducationalProject` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `EducationalProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EducationalProject" DROP COLUMN "technologies",
ADD COLUMN     "finishDate" TIMESTAMP(3),
ADD COLUMN     "link" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usedTechnologies" TEXT[];
