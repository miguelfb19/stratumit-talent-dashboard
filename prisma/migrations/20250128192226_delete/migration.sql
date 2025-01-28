/*
  Warnings:

  - You are about to drop the column `timezoneId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timezone` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timezone` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_timezoneId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "timezoneId",
ADD COLUMN     "timezone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "countryId",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Timezone";
