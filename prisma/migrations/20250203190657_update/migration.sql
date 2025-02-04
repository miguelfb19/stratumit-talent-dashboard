/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TechCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TechCategory_name_key" ON "TechCategory"("name");
