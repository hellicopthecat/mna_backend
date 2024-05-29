import {Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
import {annualCalculator} from "../vacation.util";
interface ICustomArgs {
  companyId: number;
  vacationId: number;
}
export default {
  Mutation: {
    editVacation: protectResolver(
      async (
        _,
        {vacationId, companyId, other, joinCompanyDate}: ICustomArgs & Vacation,
        {logginUser}
      ) => {
        const checkAdmin = await client.company.findFirst({
          where: {id: companyId, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다..",
          };
        }
        const findVacation = await client.vacation.findFirst({
          where: {id: vacationId, companyId: checkAdmin.id},
        });
        if (!findVacation) {
          return {
            ok: false,
            errorMsg: "휴가모델을 찾을 수 없습니다.",
          };
        }
        const editVacation = await client.vacation.update({
          where: {id: findVacation.id},
          data: {
            joinCompanyDate,
            annual: annualCalculator(joinCompanyDate),
            other,
            restAnnualVacation: annualCalculator(joinCompanyDate),
            restOtherVacation: other,
            totalVacation: annualCalculator(joinCompanyDate) + other,
          },
        });
        if (!editVacation) {
          return {ok: false, errorMsg: "휴가생성에 실패하였습니다."};
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
