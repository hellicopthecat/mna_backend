-- AlterTable
ALTER TABLE "MonthlyPayments" ALTER COLUMN "beforeTaxMonthlySalary" DROP NOT NULL,
ALTER COLUMN "afterTaxMonthlySalary" DROP NOT NULL,
ALTER COLUMN "annualSalary" DROP NOT NULL;
