import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeCompanyWorker: protectResolver(
      async (_, {companyName}: Company, {logginUser}) => {
        const existsUser = await client.company.findUnique({
          where: {companyName, worker: {some: {id: logginUser.id}}},
        });
        if (!existsUser) {
          return {ok: false, errorMsg: "유저가 존재하지 않습니다."};
        }
        const worker = await client.user.findMany({
          where: {myCompany: {some: {id: existsUser.id}}},
          include: {
            vacation: {
              where: {companyId: {equals: existsUser.id}},
            },
            salary: {
              where: {companyId: {equals: existsUser.id}},
            },
          },
          skip: 0,
          take: 8,
          orderBy: {id: "asc"},
        });
        return worker;
      }
    ),
  },
};
