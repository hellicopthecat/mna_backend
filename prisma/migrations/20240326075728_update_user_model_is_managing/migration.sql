/*
  Warnings:

  - You are about to drop the column `isManager` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isManager";

-- CreateTable
CREATE TABLE "Manage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Manage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Manage" ADD CONSTRAINT "Manage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
