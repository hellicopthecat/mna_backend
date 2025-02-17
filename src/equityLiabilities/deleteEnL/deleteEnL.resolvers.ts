import {EquityLiabilities} from "@prisma/client";
import client from "../../prismaClient";
import {protectResolver} from "../../user/user.util";

export default {
  Mutation: {
    deleteEnL: protectResolver(async (_, {enLId}: EquityLiabilities) => {
      const existIncomeExpend = await client.incomeExpend.findUnique({
        where: {infoSubtitle: enLId},
      });
      if (existIncomeExpend) {
        await client.incomeExpend.delete({where: {infoSubtitle: enLId}});
      }
      const removeEnl = await client.equityLiabilities.delete({where: {enLId}});
      if (!removeEnl) {
        return {ok: false, errorMsg: "삭제에 실패했습니다."};
      }
      return {
        ok: true,
        id: removeEnl.enLId,
      };
    }),
  },
};
