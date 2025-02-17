/*
  Warnings:

  - You are about to drop the column `productId` on the `IncomeExpend` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[incomeExpendId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `incomeExpendId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IncomeExpend" DROP CONSTRAINT "IncomeExpend_productId_fkey";

-- AlterTable
ALTER TABLE "IncomeExpend" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "incomeExpendId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_incomeExpendId_key" ON "Product"("incomeExpendId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_incomeExpendId_fkey" FOREIGN KEY ("incomeExpendId") REFERENCES "IncomeExpend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
