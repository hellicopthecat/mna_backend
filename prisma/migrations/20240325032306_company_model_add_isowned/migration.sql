/*
  Warnings:

  - Added the required column `companyOwner` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwned` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyOwner" TEXT NOT NULL,
ADD COLUMN     "isOwned" BOOLEAN NOT NULL;
