-- DropForeignKey
ALTER TABLE "VacationDesc" DROP CONSTRAINT "VacationDesc_vacationId_fkey";

-- AddForeignKey
ALTER TABLE "VacationDesc" ADD CONSTRAINT "VacationDesc_vacationId_fkey" FOREIGN KEY ("vacationId") REFERENCES "Vacation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
