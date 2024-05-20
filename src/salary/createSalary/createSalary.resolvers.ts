import {Company, Salary, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createSalary: protectResolver(
      async (
        _,
        {
          username,
          companyName,
          preTaxMonthlySalary,
          familyCount,
        }: User & Company & Salary,
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
            errorMsg: "권한이 없습니다.",
          };
        }
        const createSalary = await client.salary.create({
          data: {
            preTaxMonthlySalary,
            familyCount,
            user: {connect: {id: existsUser.id}},
            company: {connect: {id: checkAdmin.id}},
          },
        });
        if (!createSalary) {
          return {
            ok: false,
            errorMsg: "급여모델을 생성하지 못했습니다..",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
