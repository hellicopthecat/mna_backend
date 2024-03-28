/*
  Warnings:

  - You are about to drop the column `capitalStock` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyOwner` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isOwner` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Manage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_manage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[companyname]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comapnyAdressId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyname` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_company" DROP CONSTRAINT "_company_A_fkey";

-- DropForeignKey
ALTER TABLE "_company" DROP CONSTRAINT "_company_B_fkey";

-- DropForeignKey
ALTER TABLE "_manage" DROP CONSTRAINT "_manage_A_fkey";

-- DropForeignKey
ALTER TABLE "_manage" DROP CONSTRAINT "_manage_B_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "capitalStock",
DROP COLUMN "companyName",
DROP COLUMN "companyOwner",
ADD COLUMN     "comapnyAdressId" INTEGER NOT NULL,
ADD COLUMN     "companyname" TEXT NOT NULL,
ADD COLUMN     "isManger" BOOLEAN,
ADD COLUMN     "isOwned" BOOLEAN,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin",
DROP COLUMN "isOwner",
ADD COLUMN     "avatar" TEXT;

-- DropTable
DROP TABLE "Manage";

-- DropTable
DROP TABLE "_company";

-- DropTable
DROP TABLE "_manage";

-- CreateTable
CREATE TABLE "ComapnyAdress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "streetAdress" TEXT,
    "restAdress" TEXT,
    "adressNum" TEXT,

    CONSTRAINT "ComapnyAdress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CompanyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_connectComapny" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToUser_AB_unique" ON "_CompanyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToUser_B_index" ON "_CompanyToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_connectComapny_AB_unique" ON "_connectComapny"("A", "B");

-- CreateIndex
CREATE INDEX "_connectComapny_B_index" ON "_connectComapny"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyname_key" ON "Company"("companyname");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_comapnyAdressId_fkey" FOREIGN KEY ("comapnyAdressId") REFERENCES "ComapnyAdress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToUser" ADD CONSTRAINT "_CompanyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_connectComapny" ADD CONSTRAINT "_connectComapny_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_connectComapny" ADD CONSTRAINT "_connectComapny_B_fkey" FOREIGN KEY ("B") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
