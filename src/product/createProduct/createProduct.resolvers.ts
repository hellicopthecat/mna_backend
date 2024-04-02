import {Company, Product} from "@prisma/client";
import {Resolvers} from "../../types";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createProduct: protectResolver(
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
          companyName,
        }: Product & Company,
        {logginUser}
      ) => {
        const adminUser = await client.company.findFirst({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!adminUser) {
          return {ok: false, errorMsg: "해당 회사에 권한이 없습니다."};
        }

        const existsCompany = await client.company.findUnique({
          where: {companyName},
        });
        if (!existsCompany) {
          return {ok: false, errorMsg: "회사가 존재하지 않습니다."};
        }

        const createProduct = await client.product.create({
          data: {
            itemProductId,
            itemModelName,
            itemName,
            itemPhoto,
            itemType,
            itemCount,
            itemPrice,
            itemDesc,
            company: {connect: {companyName}},
          },
        });
        const createIncomeExpend = await client.incomeExpend.create({
          data: {
            infoSubtitle: itemProductId,
            productItem: {connect: {id: createProduct.id}},
          },
        });
        const updateCompanyInNout = await client.company.update({
          where: {companyName},
          data: {inNout: {connect: {id: createIncomeExpend.id}}},
        });
        if (!createProduct || !updateCompanyInNout) {
          return {
            ok: false,
            errorMsg: "상품을 생성하는데 실패했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
} as Resolvers;
