-- DropForeignKey
ALTER TABLE "IncomeExpend" DROP CONSTRAINT "IncomeExpend_productId_fkey";

-- AlterTable
ALTER TABLE "IncomeExpend" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IncomeExpend" ADD CONSTRAINT "IncomeExpend_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
