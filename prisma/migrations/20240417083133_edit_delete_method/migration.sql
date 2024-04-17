-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropForeignKey
ALTER TABLE "EquityLiabilities" DROP CONSTRAINT "EquityLiabilities_inNoutId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeExpend" DROP CONSTRAINT "IncomeExpend_productId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyPayments" DROP CONSTRAINT "MonthlyPayments_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyPayments" DROP CONSTRAINT "MonthlyPayments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_userId_fkey";

-- AddForeignKey
ALTER TABLE "MonthlyPayments" ADD CONSTRAINT "MonthlyPayments_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyPayments" ADD CONSTRAINT "MonthlyPayments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquityLiabilities" ADD CONSTRAINT "EquityLiabilities_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncomeExpend" ADD CONSTRAINT "IncomeExpend_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
