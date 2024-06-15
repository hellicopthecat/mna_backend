/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `CompanyAdress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `CompanyAdress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyAdress" ADD COLUMN     "companyName" TEXT NOT NULL,
ALTER COLUMN "companyId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyAdress_companyName_key" ON "CompanyAdress"("companyName");
