import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createCompany: protectResolver(
      async (
        _,
        {companyName, companyOwner, capitalStock}: Company,
        {logginUser}
      ) => {
        const exsistCompanyOwner = await client.user.findUnique({
          where: {id: logginUser.id},
        });
        if (exsistCompanyOwner.id !== logginUser.id) {
          return {
            ok: false,
            errorMsg: "잘못된 접근입니다.",
          };
        }
        const createCompany = await client.company.create({
          data: {
            companyName,
            companyOwner,
            companyManager: {
              connect: {id: exsistCompanyOwner.id},
            },
            isOwned: true,
            isManager: true,
            capitalStock,
          },
        });
        if (!createCompany) {
          return {
            ok: false,
            errorMsg: "회사정보를 만들 수 없습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
