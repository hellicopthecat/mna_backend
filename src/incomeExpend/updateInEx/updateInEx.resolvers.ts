import {Company, EquityLiabilities, InNout, IncomeExpend} from "@prisma/client";
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
          money,
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
          select: {
            inNoutId: true,
            money: true,
            paymentsDone: true,
            incomeTrue: true,
          },
        });
        if (!existsInEx) {
          return {
            ok: false,
            errorMsg: "존재하지 않는 거래입니다.",
          };
        }

        if (existsInEx.paymentsDone === "PAID") {
          return {
            ok: false,
            errorMsg: "지불이 완료된 거래입니다.",
          };
        }

        const updateInEx = await client.incomeExpend.update({
          where: {infoSubtitle},
          data: {
            incomeTrue,
            paymentsDone,
            money,
          },
        });
        const updateEnL = await client.equityLiabilities.update({
          where: {enLId: infoSubtitle},
          data: {
            value: money,
          },
        });
        let updateBudget: any;
        const income = existsInEx.incomeTrue && paymentsDone === "PAID";
        const expend = !existsInEx.incomeTrue && paymentsDone === "PAID";
        if (income) {
          updateBudget = await client.inNout.update({
            where: {id: existsInEx.inNoutId},
            data: {
              budget: {
                increment: existsInEx.money,
              },
            },
          });
        } else if (expend) {
          updateBudget = await client.inNout.update({
            where: {id: existsInEx.inNoutId},
            data: {
              budget: {
                decrement: existsInEx.money,
              },
            },
          });
        }
        const NOT_UPDATE = !updateInEx || !updateEnL || !updateBudget;
        if (NOT_UPDATE) {
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
