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
        {companyName: myCompany, targetCompany}: Company & TargetCompany,
        {logginUser}
      ) => {
        const adminUser = await client.company.findUnique({
          where: {
            companyName: myCompany,
            companyManager: {some: {id: logginUser.id}},
          },
        });
        if (!adminUser) {
          return {
            ok: false,
            errorMsg: "권한이 없거나 보유하지 않는 회사입니다.",
          };
        } else if (adminUser.companyName === targetCompany) {
          return {
            ok: false,
            errorMsg: "자사는 거래처를 등록해재 할 수 없습니다.",
          };
        }
        const findTargetCompany = await client.company.findUnique({
          where: {companyName: targetCompany},
        });
        if (!findTargetCompany) {
          return {
            ok: false,
            errorMsg: "연결해제하고자하는 회사를 찾을 수 없습니다.",
          };
        }

        const disconnectCompany = await client.company.update({
          where: {companyName: myCompany},
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
