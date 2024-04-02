import {Company, IncomeExpend} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";
import {protectResolver} from "../../user/user.util";

export default {
  Mutation: {
    updateInEx: protectResolver(
      async (
        _,
        {
          companyName,
          infoSubtitle,
          incomeTrue,
          paymentsDone,
        }: Company & IncomeExpend,
        {logginUser}
      ) => {
        const existsCompany = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!existsCompany) {
          return {
            ok: false,
            errorMsg:
              "회사가 존재하지 않거나 회사의 매니저로 등록되어있지 않습니다.",
          };
        }
        const existsInEx = await client.incomeExpend.findUnique({
          where: {infoSubtitle},
        });
        if (!existsInEx) {
          return {
            ok: false,
            errorMsg: "존재하지 않는 거래입니다.",
          };
        }
        const updateInEx = await client.incomeExpend.update({
          where: {infoSubtitle},
          data: {
            incomeTrue,
            paymentsDone,
            InNout: {
              update: {
                budget: {
                  increment:
                    incomeTrue && paymentsDone ? existsInEx.money : null,
                  decrement:
                    !incomeTrue && paymentsDone ? existsInEx.money : null,
                },
              },
            },
          },
        });
        if (!updateInEx) {
          return {
            ok: false,
            errorMsg: "업데이트에 실패하였습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
} as Resolvers;
