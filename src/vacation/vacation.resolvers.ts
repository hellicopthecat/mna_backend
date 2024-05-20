import {Vacation} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  Vacation: {
    useAnnualVacation: async ({id}: Vacation) => {
      const {description} = await client.vacation.findUnique({
        where: {id},
        select: {description: true},
      });
      const usedAnnuals = description.filter(
        (vacation) =>
          vacation.vacationType === "ANNUAL" ||
          vacation.vacationType === "HALF" ||
          vacation.vacationType === "SICK"
      );
      const usedDayArr = usedAnnuals.map((annuals) => annuals.day);
      return usedDayArr.reduce((prev, current) => prev + current, 0);
    },
    restVacation: async ({id}: Vacation) => {
      const {description, annual} = await client.vacation.findUnique({
        where: {id},
        select: {annual: true, description: true},
      });
      const usedAnnuals = description.filter(
        (vacation) =>
          vacation.vacationType === "ANNUAL" ||
          vacation.vacationType === "HALF" ||
          vacation.vacationType === "SICK"
      );
      const usedDayArr = usedAnnuals.map((annuals) => annuals.day);
      return annual - usedDayArr.reduce((prev, current) => prev + current, 0);
    },
    user: async ({id}: Vacation) => {
      const {user} = await client.vacation.findUnique({
        where: {id},
        select: {user: true},
      });
      return user;
    },
    company: async ({id}: Vacation) => {
      const {company} = await client.vacation.findUnique({
        where: {id},
        select: {company: true},
      });
      return company;
    },
  },
} as Resolvers;
