/*
  Warnings:

  - Made the column `capitalStock` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `budget` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accountName` on table `InNout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InNout" ALTER COLUMN "capitalStock" SET NOT NULL,
ALTER COLUMN "capitalStock" SET DEFAULT 0,
ALTER COLUMN "budget" SET NOT NULL,
ALTER COLUMN "budget" SET DEFAULT 0,
ALTER COLUMN "accountName" SET NOT NULL;
