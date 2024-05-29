import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeCompanyWorker: protectResolver(
      async (_, {id}: Company, {logginUser}) => {
        const existsUser = await client.company.findFirst({
          where: {
            id,
            OR: [
              {companyManager: {some: {id: logginUser.id}}},
              {worker: {some: {id: logginUser.id}}},
            ],
          },
        });
        if (!existsUser) {
          return {ok: false, errorMsg: "유저가 존재하지 않습니다."};
        }
        const {worker} = await client.company.findFirst({
          where: {id: existsUser.id},
          select: {
            worker: {include: {vacation: true, salary: true}},
          },
        });

        return worker;
      }
    ),
  },
};
