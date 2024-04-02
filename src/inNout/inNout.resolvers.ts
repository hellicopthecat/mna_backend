import {Resolvers} from "../types";
import client from "../prismaClient";

export default {
  InNout: {
    incomeModel: async ({id}) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const income = inNoutDesc.filter((item) => item.incomeTrue);
      return income;
    },
    incomeMoney: async ({id}) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      let money: number;
      const income = inNoutDesc.filter(
        (item) => item.incomeTrue && item.paymentsDone
      );
      income.forEach((item) => (item.money += money));
      return money;
    },
    expendModel: async ({id}) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const expend = inNoutDesc.filter((item) => !item.incomeTrue);
      return expend;
    },
    expendMoney: async ({id}) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      let money: number;
      const income = inNoutDesc.filter(
        (item) => !item.incomeTrue && item.paymentsDone
      );
      income.forEach((item) => (item.money += money));
      return money;
    },
  },
} as Resolvers;
