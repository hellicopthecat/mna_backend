import {Company, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    managerAuth: protectResolver(
      async (
        _,
        {
          user: {username},
          company: {isManager, isOwned},
        }: {user: User; company: Company},
        {logginUser}
      ) => {
        const user = await client.user.findFirst({where: {username}});
        if (!user) {
          return {
            ok: false,
            errorMsg: "유저가 존재하지 않습니다.",
          };
        }
        const myCompany = await client.company.findFirst({
          where: {id: logginUser.companyId},
        });
        if (!myCompany.isOwned || !myCompany.isManager) {
          return {
            ok: false,
            errorMsg: "",
          };
        }

        const update = await client.company.update({
          where: {id: logginUser.companyId},
          data: {companyManager: {connect: [{id: user.id}]}},
        });
        if (update) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            errorMsg: "업데이트에 실패했습니다.",
          };
        }
      }
    ),
  },
};
/**
 * 해당유저를
 * 내가 속한 회사에
 * 매니지로 업데이트한다.
 * 오너는 안되고
 */
