/*
  Warnings:

  - You are about to drop the column `annualSalary` on the `Salary` table. All the data in the column will be lost.
  - You are about to drop the column `beforeTaxMonthlySalary` on the `Salary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Salary" DROP COLUMN "annualSalary",
DROP COLUMN "beforeTaxMonthlySalary",
ADD COLUMN     "preTaxMonthlySalary" INTEGER;
