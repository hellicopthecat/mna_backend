import {Company, Product} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";

export default {
  Mutation: {
    deleteProduct: protectResolver(
      async (_, {companyName, id}: Company & Product, {logginUser}) => {
        const existsProduct = await client.product.findUnique({
          where: {id, company: {companyName}},
        });
        if (!existsProduct) {
          return {
            ok: false,
            errorMsg: "상품이 없거나 관리자가 아닙니다.",
          };
        }
        const removeProduct = await client.product.delete({
          where: {id, company: {companyName}},
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
