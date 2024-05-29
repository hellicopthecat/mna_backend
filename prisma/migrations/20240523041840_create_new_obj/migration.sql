/*
  Warnings:

  - Added the required column `totalVacation` to the `Vacation` table without a default value. This is not possible if the table is not empty.
  - Made the column `annual` on table `Vacation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vacation" ADD COLUMN     "restVacation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalVacation" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "useVacation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "annual" SET NOT NULL,
ALTER COLUMN "annual" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "VacationDesc" ALTER COLUMN "day" SET DATA TYPE DOUBLE PRECISION;
