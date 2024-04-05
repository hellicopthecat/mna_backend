/*
  Warnings:

  - Made the column `budget` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentAssets` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currentLiabilities` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nonCurrentAssets` on table `InNout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nonCurrentLiabilities` on table `InNout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InNout" ALTER COLUMN "budget" SET NOT NULL,
ALTER COLUMN "currentAssets" SET NOT NULL,
ALTER COLUMN "currentLiabilities" SET NOT NULL,
ALTER COLUMN "nonCurrentAssets" SET NOT NULL,
ALTER COLUMN "nonCurrentLiabilities" SET NOT NULL;
