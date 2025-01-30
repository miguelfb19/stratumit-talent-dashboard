/*
  Warnings:

  - Added the required column `categoryId` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TechCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TechCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TechCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
