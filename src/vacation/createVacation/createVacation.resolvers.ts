import {Company, User, Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
import {annualCalculator} from "../vacation.util";

export default {
  Mutation: {
    createVacation: protectResolver(
      async (
        _,
        {
          username,
          companyName,
          annual,
          joinCompanyDate,
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
        const existsVacation = await client.vacation.findFirst({
          where: {user: {username}, company: {companyName}},
        });
        if (existsVacation) {
          return {
            ok: false,
            errorMsg: "이미 연차모델이 생성되었습니다.",
          };
        }

        const createVacation = await client.vacation.create({
          data: {
            annual: annualCalculator(joinCompanyDate) || annual,
            joinCompanyDate: Date.now().toString() || joinCompanyDate,
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
