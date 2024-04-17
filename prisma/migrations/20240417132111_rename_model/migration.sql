/*
  Warnings:

  - You are about to drop the `MonthlyPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MonthlyPayments" DROP CONSTRAINT "MonthlyPayments_companyId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyPayments" DROP CONSTRAINT "MonthlyPayments_userId_fkey";

-- DropTable
DROP TABLE "MonthlyPayments";

-- CreateTable
CREATE TABLE "Salary" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "beforeTaxMonthlySalary" INTEGER,
    "annualSalary" INTEGER,
    "companyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Salary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
