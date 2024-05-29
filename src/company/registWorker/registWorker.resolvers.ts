import {Company, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
import {annualCalculator} from "../../vacation/vacation.util";

export default {
  Mutation: {
    registWorker: protectResolver(
      async (_, {username, id}: User & Company, {logginUser}) => {
        const checkAdmin = await client.company.findFirst({
          where: {id, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {ok: false, errorMsg: "권한이 없습니다."};
        }
        const existsWorker = await client.user.findFirst({where: {username}});
        if (!existsWorker) {
          return {ok: false, errorMsg: "유저가 존재하지 않습니다."};
        }
        const createVacation = await client.vacation.create({
          data: {
            joinCompanyDate: Date.now().toString(),
            annual: annualCalculator(Date.now().toString()),
            totalVacation: annualCalculator(Date.now().toString()),
            user: {connect: {id: existsWorker.id}},
            company: {connect: {id: checkAdmin.id}},
          },
        });
        const registWorkerResult = await client.company.update({
          where: {id},
          data: {
            worker: {connect: {id: existsWorker.id}},
            Vacation: {connect: {id: createVacation.id}},
          },
        });
        if (!registWorkerResult) {
          return {ok: false, errorMsg: "직원 등록이 실패했습니다."};
        }
        return {ok: true, id: existsWorker.id, subId: createVacation.id};
      }
    ),
  },
};
