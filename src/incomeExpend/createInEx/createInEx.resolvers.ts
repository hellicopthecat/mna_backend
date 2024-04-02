import {Company, IncomeExpend} from "@prisma/client";
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
        }: Company & IncomeExpend,
        {logginUser}
      ) => {
        const existsCompany = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
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
        if (!existsInEx) {
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
          },
        });

        const updateCompany = await client.company.update({
          where: {companyName},
          data: {inNout: {connect: {id: createInEx.id}}},
        });
      }
    ),
  },
};
