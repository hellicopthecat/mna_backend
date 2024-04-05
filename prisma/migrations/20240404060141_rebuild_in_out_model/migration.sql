/*
  Warnings:

  - You are about to drop the column `capital` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `debtRatio` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `equityRatio` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `liabilities` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `netAssets` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `netIncome` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `profitMargin` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `roe` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `totalAssets` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpenses` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `totalRevenue` on the `InNout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_companyAdressId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_inNoutId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeExpend" DROP CONSTRAINT "IncomeExpend_inNoutId_fkey";

-- AlterTable
ALTER TABLE "InNout" DROP COLUMN "capital",
DROP COLUMN "debtRatio",
DROP COLUMN "equityRatio",
DROP COLUMN "liabilities",
DROP COLUMN "netAssets",
DROP COLUMN "netIncome",
DROP COLUMN "profitMargin",
DROP COLUMN "roe",
DROP COLUMN "totalAssets",
DROP COLUMN "totalExpenses",
DROP COLUMN "totalRevenue",
ADD COLUMN     "currentAssets" INTEGER,
ADD COLUMN     "currentLiabilities" INTEGER,
ADD COLUMN     "nonCurrentAssets" INTEGER,
ADD COLUMN     "nonCurrentLiabilities" INTEGER,
ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "budget" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAdressId_fkey" FOREIGN KEY ("companyAdressId") REFERENCES "CompanyAdress"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeExpend" ADD CONSTRAINT "IncomeExpend_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
