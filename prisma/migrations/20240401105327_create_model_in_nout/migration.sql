/*
  Warnings:

  - Added the required column `inNoutId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "inNoutId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "InNout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "capitalStock" INTEGER,
    "budget" INTEGER,
    "accountNum" TEXT,
    "accountName" TEXT,

    CONSTRAINT "InNout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "incomeMoney" INTEGER,
    "businessDate" TEXT,
    "paymentType" TEXT,
    "accountSubject" TEXT,
    "businessDesc" TEXT,
    "payMentsDone" BOOLEAN NOT NULL DEFAULT false,
    "inNoutId" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "expenseMoney" INTEGER,
    "businessDate" TEXT,
    "paymentType" TEXT,
    "accountSubject" TEXT,
    "businessDesc" TEXT,
    "payMentsDone" BOOLEAN NOT NULL DEFAULT false,
    "inNoutId" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InNout_accountNum_key" ON "InNout"("accountNum");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_inNoutId_fkey" FOREIGN KEY ("inNoutId") REFERENCES "InNout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
