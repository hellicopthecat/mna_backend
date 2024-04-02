/*
  Warnings:

  - A unique constraint covering the columns `[itemProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemProductId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "itemProductId" TEXT NOT NULL,
ALTER COLUMN "itemModelName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_itemProductId_key" ON "Product"("itemProductId");
