/*
  Warnings:

  - A unique constraint covering the columns `[infoSubtitle]` on the table `IncomeExpend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `infoSubtitle` to the `IncomeExpend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomeExpend" ADD COLUMN     "infoSubtitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IncomeExpend_infoSubtitle_key" ON "IncomeExpend"("infoSubtitle");
