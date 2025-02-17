-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_incomeExpendId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_incomeExpendId_fkey" FOREIGN KEY ("incomeExpendId") REFERENCES "IncomeExpend"("id") ON DELETE CASCADE ON UPDATE CASCADE;
