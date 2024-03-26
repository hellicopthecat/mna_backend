/*
  Warnings:

  - You are about to drop the column `userId` on the `Manage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Manage" DROP CONSTRAINT "Manage_userId_fkey";

-- AlterTable
ALTER TABLE "Manage" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_manage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_manage_AB_unique" ON "_manage"("A", "B");

-- CreateIndex
CREATE INDEX "_manage_B_index" ON "_manage"("B");

-- AddForeignKey
ALTER TABLE "_manage" ADD CONSTRAINT "_manage_A_fkey" FOREIGN KEY ("A") REFERENCES "Manage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manage" ADD CONSTRAINT "_manage_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
