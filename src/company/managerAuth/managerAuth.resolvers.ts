import {Manage, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    managerAuth: protectResolver(
      async (_, {username, companyId}: User & Manage, {logginUser}) => {
        try {
          const adminUser = await client.user.findUnique({
            where: {id: logginUser.id},
            select: {
              isOwner: true,
              isManaging: true,
            },
          });
          if (!adminUser.isOwner) {
            return {
              ok: false,
              errorMsg: "관리자권한이 없습니다.",
            };
          }

          const worker = await client.user.findFirstOrThrow({
            where: {username},
          });
          if (!worker) {
            return {
              ok: false,
              errorMsg: "유저가 존재하지 않습니다.",
            };
          }
          const {id: managingId} = await client.manage.findFirst({
            where: {companyId},
          });
          const updateWorker = await client.user.update({
            where: {username: worker.username},
            data: {
              isAdmin: true,
              isManaging: {connect: {id: managingId}},
            },
          });
          const updateCompany = await client.company.update({
            where: {id: companyId},
            data: {
              companyManager: {connect: {id: worker.id}},
            },
          });
          if (!updateWorker && !updateCompany) {
            return {
              ok: false,
              errorMsg: "권한부여 중 에러가 났습니다.",
            };
          } else {
            return {
              ok: true,
            };
          }
        } catch (err) {
          return err;
        }
      }
    ),
  },
};
