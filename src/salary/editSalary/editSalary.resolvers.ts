import {Company, Salary, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editSalary: protectResolver(
      async (
        _,
        {
          id,
          companyName,
          preTaxMonthlySalary,
          familyCount,
          childCount,
        }: User & Company & Salary,
        {logginUser}
      ) => {
        const existsUser = await client.user.findFirst({where: {id}});
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
        const findSalary = await client.salary.findFirst({
          where: {userId: existsUser.id, companyId: checkAdmin.id},
        });
        if (!findSalary) {
          return {ok: false, errorMsg: "찾으시는 급여모델이 없습니다."};
        }
        const updateSalary = await client.salary.update({
          where: {id: findSalary.id},
          data: {
            preTaxMonthlySalary,
            familyCount,
            childCount,
            user: {connect: {id: existsUser.id}},
            company: {connect: {id: checkAdmin.id}},
          },
        });
        if (!updateSalary) {
          return {
            ok: false,
            errorMsg: "급여모델을 업데이트하지 못했습니다..",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
