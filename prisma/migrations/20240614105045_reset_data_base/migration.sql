/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `InNout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `InNout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_inNoutId_fkey";

-- AlterTable
ALTER TABLE "InNout" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InNout_companyId_key" ON "InNout"("companyId");

-- AddForeignKey
ALTER TABLE "InNout" ADD CONSTRAINT "InNout_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
