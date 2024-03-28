import {Company} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";
type TargetCompany = {
  targetCompany: string;
};
export default {
  Mutation: {
    disconnectCompany: protectResolver(
      async (
        _,
        {companyName, targetCompany}: Company & TargetCompany,
        {logginUser}
      ) => {
        const adminUser = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!adminUser) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        } else if (adminUser.companyName === targetCompany) {
          return {
            ok: false,
            errorMsg: "자사는 거래처를 등록해재 할 수 없습니다.",
          };
        }
        const disconnectCompany = await client.company.update({
          where: {companyName},
          data: {connectedCompany: {disconnect: {companyName: targetCompany}}},
        });
        if (!disconnectCompany) {
          return {
            ok: false,
            errorMsg: "거래처 등록을 해지하는데 실패했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
