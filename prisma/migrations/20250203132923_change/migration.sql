/*
  Warnings:

  - You are about to drop the column `level` on the `Languaje` table. All the data in the column will be lost.
  - The primary key for the `ProfileLanguajes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Languaje` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level` to the `ProfileLanguajes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProfileLanguajes" DROP CONSTRAINT "ProfileLanguajes_languajeId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileLanguajes" DROP CONSTRAINT "ProfileLanguajes_profileId_fkey";

-- AlterTable
ALTER TABLE "Languaje" DROP COLUMN "level";

-- AlterTable
ALTER TABLE "ProfileLanguajes" DROP CONSTRAINT "ProfileLanguajes_pkey",
ADD COLUMN     "level" "LanguajeLevel" NOT NULL,
ADD CONSTRAINT "ProfileLanguajes_pkey" PRIMARY KEY ("profileId", "languajeId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Languaje_name_key" ON "Languaje"("name");

-- AddForeignKey
ALTER TABLE "ProfileLanguajes" ADD CONSTRAINT "ProfileLanguajes_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileLanguajes" ADD CONSTRAINT "ProfileLanguajes_languajeId_fkey" FOREIGN KEY ("languajeId") REFERENCES "Languaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;
