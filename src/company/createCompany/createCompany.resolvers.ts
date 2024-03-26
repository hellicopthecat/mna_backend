import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createCompany: protectResolver(
      async (_, {companyName, capitalStock}: Company, {logginUser}) => {
        const {id: userID, isOwner} = await client.user.findUnique({
          where: {id: logginUser.id},
          select: {id: true, isOwner: true},
        });
        if (isOwner) {
          return {
            ok: false,
            errorMsg: "이미 개인회사가 등록되어있습니다.",
          };
        }
        const createCompany = await client.company.create({
          data: {
            companyName,
            companyOwner: logginUser.username,
            capitalStock,
            companyManager: {
              connect: {id: userID},
            },
          },
        });
        const manager = await client.manage.create({
          data: {
            companyId: createCompany.id,
            companyName: createCompany.companyName,
          },
        });
        if (!createCompany && !manager) {
          return {
            ok: false,
            errorMsg: "회사정보를 만들 수 없습니다.",
          };
        }
        await client.user.update({
          where: {id: logginUser.id},
          data: {
            isOwner: true,
            isAdmin: true,
            isManaging: {
              connect: {
                id: manager.id,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
