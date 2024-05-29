import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";
interface ICustomArgs {
  companyId: number;
  targetCompanyId: number;
}
export default {
  Mutation: {
    disconnectCompany: protectResolver(
      async (_, {companyId, targetCompanyId}: ICustomArgs, {logginUser}) => {
        const adminUser = await client.company.findUnique({
          where: {
            id: companyId,
            companyManager: {some: {id: logginUser.id}},
          },
        });
        if (!adminUser) {
          return {
            ok: false,
            errorMsg: "권한이 없거나 보유하지 않는 회사입니다.",
          };
        } else if (adminUser.id === targetCompanyId) {
          return {
            ok: false,
            errorMsg: "자사는 거래처를 등록해재 할 수 없습니다.",
          };
        }
        const findTargetCompany = await client.company.findUnique({
          where: {id: targetCompanyId},
        });
        if (!findTargetCompany) {
          return {
            ok: false,
            errorMsg: "연결해제하고자하는 회사를 찾을 수 없습니다.",
          };
        }

        const disconnectCompany = await client.company.update({
          where: {id: companyId},
          data: {connectedCompany: {disconnect: {id: targetCompanyId}}},
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
