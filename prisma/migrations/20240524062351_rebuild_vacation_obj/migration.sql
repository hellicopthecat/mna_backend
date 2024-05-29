/*
  Warnings:

  - You are about to drop the column `restVacation` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `useVacation` on the `Vacation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "restVacation",
DROP COLUMN "useVacation",
ADD COLUMN     "restAnnualVacation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "restOtherVacation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "other" SET DEFAULT 0,
ALTER COLUMN "other" SET DATA TYPE DOUBLE PRECISION;
