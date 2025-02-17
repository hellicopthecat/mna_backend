import {Company, Salary, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
import {annualCalculator} from "../../vacation/vacation.util";

export default {
  Mutation: {
    registWorker: protectResolver(
      async (
        _,
        {
          id,
          username,
          preTaxMonthlySalary,
          familyCount,
          childCount,
        }: User & Company & Salary,
        {logginUser}
      ) => {
        const checkAdmin = await client.company.findFirst({
          where: {id, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {ok: false, errorMsg: "권한이 없습니다."};
        }
        const existsUser = await client.user.findFirst({where: {username}});
        if (!existsUser) {
          return {ok: false, errorMsg: "유저가 존재하지 않습니다."};
        }
        const existsWorker = await client.company.findFirst({
          where: {id, worker: {some: {username}}},
        });
        if (existsWorker) {
          return {ok: false, errorMsg: "이미 등록되어있습니다."};
        }
        const createVacation = await client.vacation.create({
          data: {
            joinCompanyDate: Date.now().toString(),
            annual: annualCalculator(Date.now().toString()),
            totalVacation: annualCalculator(Date.now().toString()),
            user: {connect: {id: existsUser.id}},
            company: {connect: {id: checkAdmin.id}},
          },
        });
        const createSalary = await client.salary.create({
          data: {
            preTaxMonthlySalary,
            familyCount,
            childCount,
            user: {connect: {id: existsUser.id}},
            company: {connect: {id: checkAdmin.id}},
          },
        });
        const registWorkerResult = await client.company.update({
          where: {id},
          data: {
            worker: {connect: {id: existsUser.id}},
            Vacation: {connect: {id: createVacation.id}},
          },
        });
        if (!createVacation && !createSalary && !registWorkerResult) {
          return {ok: false, errorMsg: "직원 등록이 실패했습니다."};
        }
        return {ok: true, id: existsUser.id, subId: createVacation.id};
      }
    ),
  },
};
