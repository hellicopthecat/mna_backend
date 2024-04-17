import {Company, User, Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editVacation: protectResolver(
      async (
        _,
        {
          username,
          companyName,
          totalVacation,
          restVacation,
          specialVation,
          sickLeave,
        }: User & Company & Vacation,
        {logginUser}
      ) => {
        const existsUser = await client.user.findFirst({where: {username}});
        if (!existsUser) {
          return {
            ok: false,
            errorMsg: "유저가 존재하지 않습니다.",
          };
        }
        const checkAdmin = await client.company.findFirst({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다..",
          };
        }
        const findVacation = await client.vacation.findFirst({
          where: {userId: existsUser.id, companyId: checkAdmin.id},
        });
        if (!findVacation) {
          return {
            ok: false,
            errorMsg: "휴가모델을 찾을 수 없습니다.",
          };
        }
        const editVacation = await client.vacation.update({
          where: {id: findVacation.id},
          data: {totalVacation, restVacation, specialVation, sickLeave},
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
