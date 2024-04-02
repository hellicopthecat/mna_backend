/*
  Warnings:

  - A unique constraint covering the columns `[itemModelName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemModelName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_itemName_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "itemModelName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemModelName_key" ON "Product"("itemModelName");
