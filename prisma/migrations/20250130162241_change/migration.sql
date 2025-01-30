/*
  Warnings:

  - You are about to drop the column `projectId` on the `Technology` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_projectId_fkey";

-- AlterTable
ALTER TABLE "EducationalProject" ADD COLUMN     "technologies" TEXT[];

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "projectId";
