import {Company, IncomeExpend, Product} from "@prisma/client";
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
          incomeTrue,
          paymentType,
          accountCode,
          businessDesc,
          id,
          paymentsDone,
        }: Product & IncomeExpend & Company,
        {logginUser}
      ) => {
        const adminUser = await client.company.findFirst({
          where: {id, companyManager: {some: {id: logginUser.id}}},
        });
        if (!adminUser) {
          return {ok: false, errorMsg: "해당 회사에 권한이 없습니다."};
        }

        const existsCompany = await client.company.findUnique({
          where: {id},
          include: {inNout: true},
        });
        if (!existsCompany) {
          return {ok: false, errorMsg: "회사가 존재하지 않습니다."};
        }

        const createIncomeExpend = await client.incomeExpend.create({
          data: {
            infoSubtitle: itemProductId,
            money: itemCount <= 0 ? 1 * itemPrice : itemCount * itemPrice,
            incomeTrue,
            paymentType,
            accountCode,
            businessDesc,
            paymentsDone,
          },
        });
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
            company: {connect: {id}},
          },
        });
        let updateIncomeExpend: any;
        const income = incomeTrue && paymentsDone === "PAID";
        const expend = !incomeTrue && paymentsDone === "PAID";
        const notPaid = paymentsDone !== "PAID";
        if (income) {
          updateIncomeExpend = await client.incomeExpend.update({
            where: {id: createIncomeExpend.id},
            data: {
              productItem: {connect: {id: createProduct.id}},
              InNout: {
                connect: {id: existsCompany.inNout.id},
                update: {
                  budget: {
                    increment:
                      itemCount <= 0 ? 1 * itemPrice : itemCount * itemPrice,
                  },
                },
              },
            },
          });
        } else if (expend) {
          updateIncomeExpend = await client.incomeExpend.update({
            where: {id: createIncomeExpend.id},
            data: {
              productItem: {connect: {id: createProduct.id}},
              InNout: {
                connect: {id: existsCompany.inNout.id},
                update: {
                  budget: {
                    decrement:
                      itemCount <= 0 ? 1 * itemPrice : itemCount * itemPrice,
                  },
                },
              },
            },
          });
        } else if (notPaid) {
          updateIncomeExpend = await client.incomeExpend.update({
            where: {id: createIncomeExpend.id},
            data: {
              productItem: {connect: {id: createProduct.id}},
              InNout: {
                connect: {id: existsCompany.inNout.id},
              },
            },
          });
        }

        const updateCompanyInNout = await client.company.update({
          where: {id},
          data: {
            inNout: {
              update: {
                inNoutDesc: {connect: {id: createIncomeExpend.id}},
              },
            },
          },
        });
        const CREATE = createIncomeExpend || createProduct;
        const UPDATE = updateIncomeExpend || updateCompanyInNout;
        if (!CREATE || !UPDATE) {
          return {
            ok: false,
            errorMsg: "상품을 생성하는데 실패했습니다.",
          };
        }
        return {
          ok: true,
          id: createProduct.id,
        };
      }
    ),
  },
} as Resolvers;
