/*
  Warnings:

  - Made the column `isManger` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isOwned` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "isManger" SET NOT NULL,
ALTER COLUMN "isManger" SET DEFAULT false,
ALTER COLUMN "isOwned" SET NOT NULL,
ALTER COLUMN "isOwned" SET DEFAULT false;
