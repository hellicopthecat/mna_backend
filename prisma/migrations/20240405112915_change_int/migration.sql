/*
  Warnings:

  - You are about to alter the column `value` on the `EquityLiabilities` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `budget` on the `InNout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `money` on the `IncomeExpend` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "EquityLiabilities" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "InNout" ALTER COLUMN "budget" SET DEFAULT 0,
ALTER COLUMN "budget" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "IncomeExpend" ALTER COLUMN "money" SET DATA TYPE INTEGER;
