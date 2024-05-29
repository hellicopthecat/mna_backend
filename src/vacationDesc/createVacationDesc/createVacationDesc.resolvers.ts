import {Vacation, VacationDesc} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createVacationDesc: protectResolver(
      async (
        _,
        {id, day, vacationType, description}: Vacation & VacationDesc
      ) => {
        const existsVacation = await client.vacation.findUnique({where: {id}});
        if (!existsVacation) {
          return {
            ok: false,
            errorMsg: "휴가를 먼저 생성해주세요",
          };
        }
        if (
          (vacationType === "ANNUAL" ||
            vacationType === "HALF" ||
            vacationType === "SICK") &&
          existsVacation.restAnnualVacation === 0
        ) {
          return {
            ok: false,
            errorMsg: "기본연가를 모두 소진하였습니다.",
          };
        }
        if (
          (vacationType === "OTHER" || vacationType === "OTHERSICK") &&
          existsVacation.restOtherVacation === 0
        ) {
          return {
            ok: false,
            errorMsg: "기타휴가를 모두 소진하였습니다.",
          };
        }
        if (existsVacation.totalVacation < 1) {
          return {
            ok: false,
            errorMsg: "휴가를 모두 소진하였습니다.",
          };
        }

        const createVacation = await client.vacationDesc.create({
          data: {
            day,
            vacationType,
            description,
            Vacation: {connect: {id: existsVacation.id}},
          },
        });
        const updateVacation = await client.vacation.update({
          where: {id},
          data: {
            restAnnualVacation:
              vacationType === "ANNUAL" ||
              vacationType == "HALF" ||
              vacationType === "SICK"
                ? existsVacation.restAnnualVacation - day
                : existsVacation.restAnnualVacation,
            restOtherVacation:
              vacationType === "OTHER" || vacationType === "OTHERSICK"
                ? existsVacation.restOtherVacation - day
                : existsVacation.restOtherVacation,
            totalVacation: existsVacation.totalVacation - day,
          },
        });

        if (!createVacation && updateVacation) {
          return {
            ok: false,
            errorMsg: "휴가를 생성하는데 실패하였습니다.",
          };
        }
        return {
          ok: true,
          id: createVacation.id,
        };
      }
    ),
  },
};
