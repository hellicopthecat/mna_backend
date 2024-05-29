import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    deleteCompany: protectResolver(async (_, {id}: Company, {logginUser}) => {
      const existsCompany = await client.company.findUnique({
        where: {id, companyOwner: {id: logginUser.id}},
      });
      if (!existsCompany) {
        return {
          ok: false,
          errorMsg: "권한이 없습니다.",
        };
      }
      const deleteCompany = await client.company.delete({
        where: {id: existsCompany.id},
      });
      if (!deleteCompany) {
        return {
          ok: false,
          errorMsg: "회사를 삭제하는데 실패하였습니다..",
        };
      }

      return {
        ok: true,
      };
    }),
  },
};
