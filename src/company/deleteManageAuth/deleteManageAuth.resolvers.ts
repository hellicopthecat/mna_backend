import {Company, User} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";
type CompanyId = {companyId: number};
export default {
  Mutation: {
    deleteManageAuth: protectResolver(
      async (_, {username, companyId}: User & CompanyId, {logginUser}) => {
        const adminUser = await client.user.findFirst({
          where: {id: logginUser.id},
        });
        if (!adminUser.isAdmin) {
          return {
            ok: false,
            errorMsg: "관리자가 아닙니다.",
          };
        }

        const findUser = await client.user.findFirst({where: {username}});
        if (!findUser) {
          return {
            ok: false,
            errorMsg: "해당유저가 존재하지 않습니다.",
          };
        }
        const findCompany = await client.user.findFirst({
          where: {id: logginUser.id},
          select: {
            isManaging: {
              where: {companyId},
              select: {id: true, companyId: true},
            },
          },
        });
        const findCompanyId = findCompany.isManaging.find(
          (item) => item.companyId === companyId
        );

        const removeCompanyWorkers = await client.company.update({
          where: {id: companyId},
          data: {companyManager: {disconnect: {id: findUser.id}}},
        });
        const removeManger = await client.user.update({
          where: {id: findUser.id},
          data: {
            isAdmin: false,
            isManaging: {
              disconnect: {
                id: findCompanyId.id,
              },
            },
          },
        });
        if (!removeCompanyWorkers && !removeManger) {
          return {
            ok: false,
            errorMsg: "해당 화사에 직원이 존재하지 않습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
