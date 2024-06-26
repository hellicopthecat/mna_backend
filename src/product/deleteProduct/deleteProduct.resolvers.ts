import {Company, Product} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";
interface ICustomArgs {
  companyId: number;
  productId: number;
}
export default {
  Mutation: {
    deleteProduct: protectResolver(
      async (_, {companyId, productId}: ICustomArgs, {logginUser}) => {
        const existsProduct = await client.product.findUnique({
          where: {
            id: productId,
            company: {
              id: companyId,
              companyManager: {some: {id: logginUser.id}},
            },
          },
        });
        if (!existsProduct) {
          return {
            ok: false,
            errorMsg: "상품이 없거나 관리자가 아닙니다.",
          };
        }
        const removeProduct = await client.product.delete({
          where: {id: productId, company: {id: companyId}},
        });
        if (!removeProduct) {
          return {
            ok: false,
            errorMsg: "상품을 제거하는데 실패했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
