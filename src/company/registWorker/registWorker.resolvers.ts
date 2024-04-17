import {Company, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    registWorker: protectResolver(
      async (_, {username, companyName}: User & Company, {logginUser}) => {
        const checkAdmin = await client.company.findFirst({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!checkAdmin) {
          return {ok: false, errorMsg: "권한이 없습니다."};
        }
        const existsWorker = await client.user.findFirst({where: {username}});
        if (!existsWorker) {
          return {ok: false, errorMsg: "유저가 존재하지 않습니다."};
        }
        const registWorkerResult = await client.company.update({
          where: {companyName},
          data: {worker: {connect: {id: existsWorker.id}}},
        });
        if (!registWorkerResult) {
          return {ok: false, errorMsg: "직원 등록이 실패했습니다."};
        }
        return {ok: true};
      }
    ),
  },
};
