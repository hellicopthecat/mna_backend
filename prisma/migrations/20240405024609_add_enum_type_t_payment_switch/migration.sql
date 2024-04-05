/*
  Warnings:

  - The `paymentsDone` column on the `IncomeExpend` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TPaymentSwitch" AS ENUM ('WAIT', 'PAID', 'NONPAID');

-- AlterTable
ALTER TABLE "IncomeExpend" DROP COLUMN "paymentsDone",
ADD COLUMN     "paymentsDone" "TPaymentSwitch" NOT NULL DEFAULT 'WAIT';
