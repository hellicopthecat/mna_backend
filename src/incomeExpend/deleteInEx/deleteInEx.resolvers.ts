import {IncomeExpend} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";
interface IDeleteInExArgs {
  companyId: number;
  iNeId: number;
}
export default {
  Mutation: {
    deleteInEx: protectResolver(
      async (_, {companyId, iNeId}: IDeleteInExArgs, {logginUser}) => {
        const isManager = await client.company.findUnique({
          where: {id: companyId, companyManager: {some: {id: logginUser.id}}},
        });
        if (!isManager) {
          return {
            ok: false,
            errorMsg: "회사가 존재하지 않거나 권한이 없습니다.",
          };
        }
        const existsIne = await client.incomeExpend.findUnique({
          where: {id: iNeId},
        });
        if (!existsIne) {
          return {
            ok: false,
            errorMsg: "자산이 존재하지 않습니다.",
          };
        }
        const checkProduct = await client.product.findFirst({
          where: {incomeExpendId: iNeId},
        });

        if (checkProduct) {
          const delProduct = await client.product.delete({
            where: {id: checkProduct.id},
          });
          const delInEx = await client.incomeExpend.delete({
            where: {id: iNeId},
          });
          if (delInEx && delProduct) {
            return {
              ok: true,
              id: checkProduct.id,
            };
          } else {
            return {
              ok: false,
              errorMsg: "삭제에 실패했습니다.",
            };
          }
        } else {
          const delInEx = await client.incomeExpend.delete({
            where: {id: iNeId},
          });
          if (delInEx) {
            return {
              ok: true,
            };
          } else {
            return {
              ok: false,
              errorMsg: "삭제에 실패했습니다.",
            };
          }
        }
      }
    ),
  },
};
