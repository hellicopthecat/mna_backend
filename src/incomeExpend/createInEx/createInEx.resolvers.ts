import {Company, EquityLiabilities, IncomeExpend} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createInEx: protectResolver(
      async (
        _,
        {
          companyName,
          incomeTrue,
          infoSubtitle,
          money,
          businessDate,
          paymentType,
          accountCode,
          businessDesc,
          paymentsDone,
          enLName,
          enLType,
          enLDesc,
          current,
          assests,
        }: Company & IncomeExpend & EquityLiabilities,
        {logginUser}
      ) => {
        const existsCompany = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
          include: {inNout: true},
        });
        if (!existsCompany) {
          return {
            ok: false,
            errorMsg: "회사가 존재하지 않거나 매니저로 등록되어 있지 않습니다.",
          };
        }
        const existsInEx = await client.incomeExpend.findUnique({
          where: {infoSubtitle},
        });
        if (existsInEx) {
          return {
            ok: false,
            errorMsg: "존재하는 수입지출제목입니다.",
          };
        }
        const createInEx = await client.incomeExpend.create({
          data: {
            incomeTrue,
            infoSubtitle,
            money,
            businessDate,
            paymentType,
            accountCode,
            businessDesc,
            paymentsDone,
            InNout: {connect: {id: existsCompany.inNout.id}},
          },
        });
        const createEnL = await client.equityLiabilities.create({
          data: {
            enLId: infoSubtitle,
            enLName,
            enLType,
            enLDesc,
            current,
            assests,
            value: money,
            InNout: {connect: {id: existsCompany.inNout.id}},
          },
        });

        let updateBudget: any;
        const income = incomeTrue && paymentsDone === "PAID";
        const expend = !incomeTrue && paymentsDone === "PAID";
        if (income) {
          updateBudget = await client.inNout.update({
            where: {id: createInEx.inNoutId},
            data: {
              budget: {
                increment: createInEx.money,
              },
            },
          });
        } else if (expend) {
          updateBudget = await client.inNout.update({
            where: {id: createInEx.inNoutId},
            data: {
              budget: {
                decrement: createInEx.money,
              },
            },
          });
        }

        const CREATE = createInEx && createEnL;

        if (!CREATE || !updateBudget) {
          return {
            ok: false,
            errorMsg: "수입지출모델을 만드는데 실패했습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
