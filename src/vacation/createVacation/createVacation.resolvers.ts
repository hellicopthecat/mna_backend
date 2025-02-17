import {Company, User, Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
import {annualCalculator} from "../vacation.util";
interface ICreateVacationProps {
  userId: number;
  companyId: number;
}
export default {
  Mutation: {
    createVacation: protectResolver(
      async (
        _,
        {
          userId,
          companyId,
          other,
          joinCompanyDate,
        }: ICreateVacationProps & Vacation,
        {logginUser}
      ) => {
        const existsUser = await client.user.findFirst({where: {id: userId}});
        if (!existsUser) {
          return {
            ok: false,
            errorMsg: "유저가 존재하지 않습니다.",
          };
        }
        const checkAdmin = await client.company.findFirst({
          where: {id: companyId, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다..",
          };
        }
        const existsVacation = await client.vacation.findFirst({
          where: {user: {id: userId}, company: {id: companyId}},
        });
        if (existsVacation) {
          return {
            ok: false,
            errorMsg: "이미 연차모델이 생성되었습니다.",
          };
        }

        const createVacation = await client.vacation.create({
          data: {
            joinCompanyDate: Date.now().toString() || joinCompanyDate,
            annual: annualCalculator(joinCompanyDate),
            other,
            restAnnualVacation: annualCalculator(joinCompanyDate),
            restOtherVacation: other,
            totalVacation: annualCalculator(joinCompanyDate) + other,
            company: {connect: {id: checkAdmin.id}},
            user: {connect: {id: existsUser.id}},
          },
        });
        if (!createVacation) {
          return {ok: false, errorMsg: "연차생성에 실패하였습니다."};
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
