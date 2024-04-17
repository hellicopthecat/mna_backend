/*
  Warnings:

  - You are about to drop the `_CompanyToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_B_fkey";

-- DropTable
DROP TABLE "_CompanyToUser";

-- CreateTable
CREATE TABLE "_Manager" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Worker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Manager_AB_unique" ON "_Manager"("A", "B");

-- CreateIndex
CREATE INDEX "_Manager_B_index" ON "_Manager"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Worker_AB_unique" ON "_Worker"("A", "B");

-- CreateIndex
CREATE INDEX "_Worker_B_index" ON "_Worker"("B");

-- AddForeignKey
ALTER TABLE "_Manager" ADD CONSTRAINT "_Manager_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Manager" ADD CONSTRAINT "_Manager_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Worker" ADD CONSTRAINT "_Worker_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Worker" ADD CONSTRAINT "_Worker_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
