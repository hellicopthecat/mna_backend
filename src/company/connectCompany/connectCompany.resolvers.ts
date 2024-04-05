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
        {companyName: myCompany, targetCompany}: Company & TargetCompany,
        {logginUser}
      ) => {
        if (!myCompany || !targetCompany) {
          return {
            ok: false,
            errorMsg: "회사명이 입력되지 않았습니다.",
          };
        }
        const adminUserCompany = await client.company.findUnique({
          where: {
            companyName: myCompany,
            companyManager: {some: {id: logginUser.id}},
          },
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
        const findTargetCompany = await client.company.findUnique({
          where: {companyName: targetCompany},
        });
        if (!findTargetCompany) {
          return {
            ok: false,
            errorMsg: "연결하고자하는 회사가 존재하지 않습니다.",
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
