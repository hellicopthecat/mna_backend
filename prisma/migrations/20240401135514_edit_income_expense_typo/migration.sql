/*
  Warnings:

  - You are about to drop the column `payMentsDone` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `payMentsDone` on the `Income` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "payMentsDone",
ADD COLUMN     "paymentsDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "payMentsDone",
ADD COLUMN     "paymentsDone" BOOLEAN NOT NULL DEFAULT false;
