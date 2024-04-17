/*
  Warnings:

  - Made the column `userId` on table `Vacation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Vacation" DROP CONSTRAINT "Vacation_userId_fkey";

-- AlterTable
ALTER TABLE "Vacation" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
