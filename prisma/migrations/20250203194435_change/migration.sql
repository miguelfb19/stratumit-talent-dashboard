/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the `TechCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryTech" AS ENUM ('Frontend', 'Backend', 'DevOps', 'Testing', 'Database', 'Design', 'Mobile', 'CMS', 'Others');

-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_categoryId_fkey";

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "categoryId",
ADD COLUMN     "category" "CategoryTech" NOT NULL;

-- DropTable
DROP TABLE "TechCategory";
