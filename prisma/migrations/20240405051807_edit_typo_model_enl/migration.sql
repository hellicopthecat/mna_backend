/*
  Warnings:

  - You are about to drop the column `EnLDesc` on the `EquityLiabilities` table. All the data in the column will be lost.
  - You are about to drop the column `EnLId` on the `EquityLiabilities` table. All the data in the column will be lost.
  - You are about to drop the column `EnLName` on the `EquityLiabilities` table. All the data in the column will be lost.
  - You are about to drop the column `EnLType` on the `EquityLiabilities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enLId]` on the table `EquityLiabilities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enLId` to the `EquityLiabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enLName` to the `EquityLiabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enLType` to the `EquityLiabilities` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EquityLiabilities_EnLId_key";

-- AlterTable
ALTER TABLE "EquityLiabilities" DROP COLUMN "EnLDesc",
DROP COLUMN "EnLId",
DROP COLUMN "EnLName",
DROP COLUMN "EnLType",
ADD COLUMN     "enLDesc" TEXT,
ADD COLUMN     "enLId" TEXT NOT NULL,
ADD COLUMN     "enLName" TEXT NOT NULL,
ADD COLUMN     "enLType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EquityLiabilities_enLId_key" ON "EquityLiabilities"("enLId");
