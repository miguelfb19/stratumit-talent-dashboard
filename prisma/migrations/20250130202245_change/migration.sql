/*
  Warnings:

  - You are about to drop the column `jobExperienceDescription` on the `JobExperiences` table. All the data in the column will be lost.
  - Added the required column `description` to the `JobExperiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobExperiences" DROP COLUMN "jobExperienceDescription",
ADD COLUMN     "description" TEXT NOT NULL;
