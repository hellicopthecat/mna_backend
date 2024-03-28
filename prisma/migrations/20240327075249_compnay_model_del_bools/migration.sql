/*
  Warnings:

  - You are about to drop the column `isManger` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `isOwned` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "isManger",
DROP COLUMN "isOwned";
