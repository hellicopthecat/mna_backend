/*
  Warnings:

  - You are about to drop the column `currentAssets` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `currentLiabilities` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `nonCurrentAssets` on the `InNout` table. All the data in the column will be lost.
  - You are about to drop the column `nonCurrentLiabilities` on the `InNout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InNout" DROP COLUMN "currentAssets",
DROP COLUMN "currentLiabilities",
DROP COLUMN "nonCurrentAssets",
DROP COLUMN "nonCurrentLiabilities",
ALTER COLUMN "budget" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "EquityLiabilities" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "EnLName" TEXT NOT NULL,
    "EnLDesc" TEXT,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "assests" BOOLEAN NOT NULL DEFAULT true,
    "value" BIGINT NOT NULL,
    "inNoutId" INTEGER,

    CONSTRAINT "EquityLiabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EquityLiabilities" ADD CONSTRAINT "EquityLiabilities_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
