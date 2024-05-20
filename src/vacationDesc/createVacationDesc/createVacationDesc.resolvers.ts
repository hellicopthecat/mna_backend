import {Vacation, VacationDesc} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createVacationDesc: protectResolver(
      async (
        _,
        {id, day, vacationType, description}: Vacation & VacationDesc,
        {logginUser}
      ) => {
        const existsVacation = await client.vacation.findUnique({where: {id}});
        if (!existsVacation) {
          return {
            ok: false,
            errorMsg: "휴가를 먼저 생성해주세요",
          };
        }
        const createVacation = await client.vacationDesc.create({
          data: {
            day,
            vacationType,
            description,
          },
        });
        if (!createVacation) {
          return {
            ok: false,
            errorMsg: "휴가를 생성하는데 실패하였습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
