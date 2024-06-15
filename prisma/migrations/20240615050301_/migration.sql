/*
  Warnings:

  - You are about to drop the column `inNoutId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `InNout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_inNoutId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "inNoutId";

-- AlterTable
ALTER TABLE "InNout" ADD COLUMN     "companyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "InNout_companyId_key" ON "InNout"("companyId");

-- AddForeignKey
ALTER TABLE "InNout" ADD CONSTRAINT "InNout_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
