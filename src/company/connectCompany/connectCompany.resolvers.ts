import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
interface ICustomArgs {
  companyId: number;
  targetCompanyId: number;
}
export default {
  Mutation: {
    connectCompany: protectResolver(
      async (_, {companyId, targetCompanyId}: ICustomArgs, {logginUser}) => {
        const adminUserCompany = await client.company.findUnique({
          where: {
            id: companyId,
            companyManager: {some: {id: logginUser.id}},
          },
        });
        if (!adminUserCompany) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        } else if (adminUserCompany.id === targetCompanyId) {
          return {
            ok: false,
            errorMsg: "자사는 거래처로 등록될 수 없습니다.",
          };
        }
        const findTargetCompany = await client.company.findUnique({
          where: {id: targetCompanyId},
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
            connectedCompany: {connect: {id: targetCompanyId}},
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
