/*
  Warnings:

  - You are about to drop the column `deprecatedItem` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `itemOrder` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `itemOrderDesc` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_inNoutId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_productId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_inNoutId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_productId_fkey";

-- DropIndex
DROP INDEX "Product_itemModelName_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deprecatedItem",
DROP COLUMN "itemOrder",
DROP COLUMN "itemOrderDesc";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Income";

-- DropEnum
DROP TYPE "ItemOrderNumber";

-- CreateTable
CREATE TABLE "IncomeExpend" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "incomeTrue" BOOLEAN DEFAULT false,
    "money" INTEGER,
    "businessDate" TEXT,
    "paymentType" TEXT,
    "accountCode" TEXT,
    "businessDesc" TEXT,
    "paymentsDone" BOOLEAN NOT NULL DEFAULT false,
    "inNoutId" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "IncomeExpend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncomeExpend" ADD CONSTRAINT "IncomeExpend_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeExpend" ADD CONSTRAINT "IncomeExpend_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
