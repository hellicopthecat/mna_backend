import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
type TargetCompany = {
  targetCompany: string;
};
export default {
  Mutation: {
    connectCompany: protectResolver(
      async (
        _,
        {companyName, targetCompany}: Company & TargetCompany,
        {logginUser}
      ) => {
        const adminUserCompany = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!adminUserCompany) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        } else if (adminUserCompany.companyName === targetCompany) {
          return {
            ok: false,
            errorMsg: "자사는 거래처로 등록될 수 없습니다.",
          };
        }
        const connectCompany = await client.company.update({
          where: {id: adminUserCompany.id},
          data: {
            connectedCompany: {connect: {companyName: targetCompany}},
          },
        });
        if (!connectCompany) {
          return {
            ok: false,
            errorMsg: "거래처를 등록하는데 오류가 발생했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
