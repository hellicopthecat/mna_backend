/*
  Warnings:

  - You are about to drop the column `comapnyAdressId` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyAdressId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_comapnyAdressId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "comapnyAdressId",
ADD COLUMN     "companyAdressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_companyAdressId_fkey" FOREIGN KEY ("companyAdressId") REFERENCES "CompanyAdress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
