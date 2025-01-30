/*
  Warnings:

  - The values [Higth] on the enum `LanguajeLevel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LanguajeLevel_new" AS ENUM ('Basic', 'Intermedium', 'Advance', 'Native');
ALTER TABLE "Languaje" ALTER COLUMN "level" TYPE "LanguajeLevel_new" USING ("level"::text::"LanguajeLevel_new");
ALTER TYPE "LanguajeLevel" RENAME TO "LanguajeLevel_old";
ALTER TYPE "LanguajeLevel_new" RENAME TO "LanguajeLevel";
DROP TYPE "LanguajeLevel_old";
COMMIT;
