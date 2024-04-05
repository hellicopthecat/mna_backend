/*
  Warnings:

  - A unique constraint covering the columns `[EnLId]` on the table `EquityLiabilities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `EnLId` to the `EquityLiabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquityLiabilities" ADD COLUMN     "EnLId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IncomeExpend" ALTER COLUMN "incomeTrue" SET DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "EquityLiabilities_EnLId_key" ON "EquityLiabilities"("EnLId");
