import {Company, User} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";
import {it} from "node:test";

export default {
  Mutation: {
    deleteManageAuth: protectResolver(
      async (_, {username, companyName}: User & Company, {logginUser}) => {
        try {
          // exists User
          const existsUser = await client.user.findFirst({where: {username}});
          if (!existsUser) {
            return {
              ok: false,
              errorMsg: "유저가 존재하지 않습니다.",
            };
          }
          // exists company manager
          const {companyName: targetCompany, companyManager} =
            await client.company.findFirst({
              where: {
                companyName,
                companyManager: {some: {id: logginUser.id}},
              },
              select: {companyName: true, companyManager: {select: {id: true}}},
            });
          const {id: managerId} = companyManager.find(
            (item) => item.id === logginUser.id
          );
          if (!targetCompany) {
            return {
              ok: false,
              errorMsg: "존재하지 않는 회사입니다.",
            };
          }
          if (managerId !== logginUser.id) {
            return {
              ok: false,
              errorMsg: "당신은 권한이 없습니다.",
            };
          }
          const disconnectUser = await client.company.update({
            where: {companyName},
            data: {companyManager: {disconnect: {id: existsUser.id}}},
          });
          if (!disconnectUser) {
            return {
              ok: false,
              errorMsg: "작업 수행을 실패했습니다.",
            };
          }
          return {
            ok: true,
          };
        } catch (err) {
          return err;
        }
      }
    ),
  },
};
