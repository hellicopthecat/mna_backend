/*
  Warnings:

  - You are about to drop the `ComapnyAdress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_comapnyAdressId_fkey";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "companyLogo" TEXT;

-- DropTable
DROP TABLE "ComapnyAdress";

-- CreateTable
CREATE TABLE "CompanyAdress" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "streetAdress" TEXT,
    "restAdress" TEXT,
    "adressNum" TEXT,

    CONSTRAINT "CompanyAdress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "itemPhoto" TEXT,
    "itemName" TEXT,
    "itemCount" INTEGER,
    "itemPrice" INTEGER,
    "itemDesc" TEXT,
    "deprecatedItem" BOOLEAN DEFAULT false,
    "itemOrder" INTEGER,
    "itemOrderDesc" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_comapnyAdressId_fkey" FOREIGN KEY ("comapnyAdressId") REFERENCES "CompanyAdress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
