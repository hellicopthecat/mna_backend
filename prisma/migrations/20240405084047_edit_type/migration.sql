/*
  Warnings:

  - You are about to alter the column `itemPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "itemPrice" SET DATA TYPE INTEGER;
