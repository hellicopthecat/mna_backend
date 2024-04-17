import {Company, User, Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createVacation: protectResolver(
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
        const createVacation = await client.vacation.create({
          data: {
            totalVacation,
            restVacation,
            specialVation,
            sickLeave,
            company: {connect: {id: checkAdmin.id}},
            user: {connect: {id: existsUser.id}},
          },
        });
        if (!createVacation) {
          return {ok: false, errorMsg: "휴가생성에 실패하였습니다."};
        }
      }
    ),
  },
};
