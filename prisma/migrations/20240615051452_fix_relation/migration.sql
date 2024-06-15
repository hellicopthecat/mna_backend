/*
  Warnings:

  - You are about to drop the column `companyAdressId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `CompanyAdress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `CompanyAdress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_companyAdressId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyAdressId";

-- AlterTable
ALTER TABLE "CompanyAdress" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdress_companyId_key" ON "CompanyAdress"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyAdress" ADD CONSTRAINT "CompanyAdress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
