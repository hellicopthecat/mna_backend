/*
  Warnings:

  - You are about to drop the column `accountBack` on the `InNout` table. All the data in the column will be lost.
  - Added the required column `EnLType` to the `EquityLiabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquityLiabilities" ADD COLUMN     "EnLType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InNout" DROP COLUMN "accountBack",
ADD COLUMN     "accountDesc" TEXT;
