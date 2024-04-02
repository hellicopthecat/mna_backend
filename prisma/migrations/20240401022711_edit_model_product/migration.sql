/*
  Warnings:

  - The `itemOrder` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[itemName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `itemName` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ItemOrderNumber" AS ENUM ('WAIT', 'ORDER', 'PRODUCE', 'SEND', 'COMPLETE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "itemType" TEXT,
ALTER COLUMN "itemName" SET NOT NULL,
DROP COLUMN "itemOrder",
ADD COLUMN     "itemOrder" "ItemOrderNumber" NOT NULL DEFAULT 'WAIT';

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemName_key" ON "Product"("itemName");
