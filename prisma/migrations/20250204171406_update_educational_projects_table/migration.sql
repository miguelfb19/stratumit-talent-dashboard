/*
  Warnings:

  - Added the required column `description` to the `EducationalProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EducationalProject" ADD COLUMN     "description" TEXT NOT NULL;
