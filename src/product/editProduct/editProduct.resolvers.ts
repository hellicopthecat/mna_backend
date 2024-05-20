import {IncomeExpend, Product} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editProduct: protectResolver(
      async (
        _,
        {
          id,
          itemProductId,
          itemModelName,
          itemName,
          itemPhoto,
          itemType,
          itemCount,
          itemPrice,
          itemDesc,
          incomeTrue,
          paymentType,
          accountCode,
          businessDesc,
          paymentsDone,
        }: Product & IncomeExpend,
        {logginUser}
      ) => {
        const existsAdmin = await client.company.findFirst({
          where: {
            companyProduct: {some: {id}},
            companyManager: {some: {id: logginUser.id}},
          },
        });

        if (!existsAdmin) {
          return {
            ok: false,
            errorMsg: "상품이 없거나 권한이 없습니다.",
          };
        }
        const existsProduct = await client.product.findUnique({
          where: {id},
        });
        if (!existsProduct) {
          return {
            ok: false,
            errorMsg: "해당상품이 없습니다..",
          };
        }
        const updateProduct = await client.product.update({
          where: {id},
          data: {
            itemModelName,
            itemName,
            itemPhoto,
            itemType,
            itemCount,
            itemPrice,
            itemDesc,
            incomeExpend: {
              update: {
                where: {infoSubtitle: itemProductId, productId: id},
                data: {
                  money: itemCount <= 0 ? 1 * itemPrice : itemCount * itemPrice,
                  incomeTrue,
                  paymentType,
                  accountCode,
                  businessDesc,
                  paymentsDone,
                },
              },
            },
          },
        });

        if (updateProduct) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            errorMsg: "해당 생산품 정보를 업데이트하는데 실패했습니다.",
          };
        }
      }
    ),
  },
};
