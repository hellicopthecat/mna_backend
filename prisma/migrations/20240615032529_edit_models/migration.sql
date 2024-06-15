/*
  Warnings:

  - You are about to drop the column `companyId` on the `InNout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InNout" DROP CONSTRAINT "InNout_companyId_fkey";

-- DropIndex
DROP INDEX "InNout_companyId_key";

-- AlterTable
ALTER TABLE "InNout" DROP COLUMN "companyId";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
