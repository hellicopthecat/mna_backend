/*
  Warnings:

  - You are about to drop the column `capitalStock` on the `InNout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InNout" DROP COLUMN "capitalStock",
ADD COLUMN     "accountBack" TEXT,
ADD COLUMN     "capital" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "debtRatio" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "equityRatio" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "liabilities" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "netAssets" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "netIncome" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profitMargin" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "roe" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "totalAssets" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalExpenses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalRevenue" INTEGER NOT NULL DEFAULT 0;
