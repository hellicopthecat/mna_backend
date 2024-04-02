import {Product} from "@prisma/client";
import {Resolvers} from "../../types";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editProduct: protectResolver(
      async (
        _,
        {
          itemProductId,
          itemModelName,
          itemName,
          itemPhoto,
          itemType,
          itemCount,
          itemPrice,
          itemDesc,
        }: Product,
        {logginUser}
      ) => {
        const existsAdmin = await client.company.findMany({
          where: {
            companyProduct: {some: {itemModelName}},
            companyManager: {some: {id: logginUser.id}},
          },
        });
        if (!existsAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        }
        const existsProduct = await client.product.findUnique({
          where: {itemProductId},
        });
        if (!existsProduct) {
          return {
            ok: false,
            errorMsg: "해당상품이 없습니다..",
          };
        }
        const editProduct = await client.product.update({
          where: {itemProductId},
          data: {
            itemName,
            itemPhoto,
            itemType,
            itemCount,
            itemPrice,
            itemDesc,
          },
        });
        if (!editProduct) {
          return {
            ok: false,
            errorMsg: "해당 생산품 정보를 업데이트하는데 실패했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
} as Resolvers;
