import {CompanyAdress, Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editCompanyAdress: protectResolver(
      async (
        _,
        {
          companyName,
          country,
          city,
          streetAdress,
          restAdress,
          adressNum,
        }: Company & CompanyAdress,
        {logginUser}
      ) => {
        try {
          //Exists Company
          const existsCompany = await client.company.findFirst({
            where: {companyName},
          });
          if (!existsCompany) {
            return {
              ok: false,
              errorMsg: "조회하신 회사는 존재하지 않습니다.",
            };
          }
          const adminUser = await client.user.findUnique({
            where: {id: logginUser.id, isManage: {some: {companyName}}},
          });
          if (!adminUser) {
            return {
              ok: false,
              errorMsg: "권한이 없습니다.",
            };
          }

          const updateAdress = await client.company.update({
            where: {id: existsCompany.id},
            data: {
              companyAdress: {
                update: {
                  country,
                  city,
                  streetAdress,
                  restAdress,
                  adressNum,
                },
              },
            },
          });
          if (!updateAdress) {
            return {
              ok: false,
              errorMsg: "주소 편집에 실패했습니다.",
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
