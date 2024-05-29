import {Vacation} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    resetVacationDesc: protectResolver(async (_, {id}: Vacation) => {
      const existsVacation = await client.vacation.findUnique({where: {id}});
      if (!existsVacation) {
        return {
          ok: false,
          errorMsg: "휴가모델이 존재하지 않습니다.",
        };
      }
      const resetVacationDesc = await client.vacationDesc.deleteMany({
        where: {vacationId: id},
      });
      if (!resetVacationDesc) {
        return {
          ok: false,
          errorMsg: "휴가모델을 리셋하는데 실패했습니다.",
        };
      }
      return {
        ok: true,
      };
    }),
  },
};
