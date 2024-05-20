/*
  Warnings:

  - You are about to drop the column `restVacation` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `sickLeave` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `specialVation` on the `Vacation` table. All the data in the column will be lost.
  - You are about to drop the column `totalVacation` on the `Vacation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TVacation" AS ENUM ('ANNUAL', 'SICK', 'HALF', 'OTHER', 'OTHERSICK', 'NONPAID');

-- AlterTable
ALTER TABLE "Vacation" DROP COLUMN "restVacation",
DROP COLUMN "sickLeave",
DROP COLUMN "specialVation",
DROP COLUMN "totalVacation",
ADD COLUMN     "annual" INTEGER,
ADD COLUMN     "other" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "VacationDesc" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "vacationType" "TVacation" NOT NULL,
    "day" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "vacationId" INTEGER,

    CONSTRAINT "VacationDesc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VacationDesc" ADD CONSTRAINT "VacationDesc_vacationId_fkey" FOREIGN KEY ("vacationId") REFERENCES "Vacation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
