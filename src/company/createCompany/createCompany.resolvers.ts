import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createCompany: protectResolver(
      async (_, {companyName}: Company, {logginUser}) => {
        try {
          const existsCompany = await client.company.findUnique({
            where: {companyName},
          });
          if (existsCompany) {
            return {
              ok: false,
              errorMsg:
                "이미 같은 이름의 회사가 존재합니다. 회사명을 좀 더 바꿔보세요",
            };
          }
          const createCompanyAdress = await client.companyAdress.create({
            data: {
              country: "",
              city: "",
              streetAdress: "",
              restAdress: "",
              adressNum: "",
            },
          });
          const createCompany = await client.company.create({
            data: {
              companyName,
              companyOwner: {connect: {id: logginUser.id}},
              companyAdress: {connect: {id: createCompanyAdress.id}},
              companyManager: {connect: {id: logginUser.id}},
            },
          });
          if (!createCompany) {
            return {
              ok: false,
              errorMsg: "회사를 생성하는데 실패했습니다.",
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
