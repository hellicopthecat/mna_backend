import {Company, InNout} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editInNout: protectResolver(
      async (
        _,
        {id, accountName, accountNum, accountDesc, budget}: Company & InNout,
        {logginUser}
      ) => {
        const {
          id: existsCompany,
          companyManager,
          inNoutId,
        } = await client.company.findUnique({
          where: {id, companyManager: {some: {id: logginUser.id}}},
          select: {id: true, companyManager: true, inNoutId: true},
        });
        if (!existsCompany) {
          return {
            ok: false,
            errorMsg: "회사가 존재하지 않습니다.",
          };
        }
        companyManager.map((manager) => {
          if (manager.id !== logginUser.id) {
            return {
              ok: false,
              errorMsg: "메니저로 등록되지 않습니다.",
            };
          }
        });
        const updateInNout = await client.inNout.update({
          where: {id: inNoutId},
          data: {
            accountName,
            accountNum,
            accountDesc,
            budget,
          },
        });
        if (!updateInNout) {
          return {
            ok: false,
            errorMsg: "회사 자산을 업데이트할 수 없습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
