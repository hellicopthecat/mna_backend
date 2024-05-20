import {Resolvers} from "../types";
import client from "../prismaClient";
import {InNout} from "@prisma/client";

const reduceAssets = (values: number[]) => {
  return values.reduce((prev, curr) => prev + curr, 0);
};

export default {
  InNout: {
    totalAssets: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: {select: {value: true}}},
      });
      const assets = totalAssets.map((asset) => asset.value);
      return reduceAssets(assets);
    }, // 전체자산액
    totalAssetsDesc: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {
          totalAssets: {skip: 0, take: 10, orderBy: {id: "desc"}},
        },
      });
      return totalAssets;
    }, // 전체자산내역
    currentAssets: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const currentAsset = totalAssets.filter(
        (assets) => assets.assests && assets.current
      );
      const assetArray = currentAsset.map((asset) => asset.value);
      return reduceAssets(assetArray);
    }, // 유동자산액
    currentAssetsDesc: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: {skip: 0, take: 10, orderBy: {id: "desc"}}},
      });
      const currentAsset = totalAssets.filter(
        (assets) => assets.assests && assets.current
      );
      return currentAsset;
    }, // 유동자산내역
    nonCurrentAssets: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const nonCurrentAsset = totalAssets.filter(
        (assets) => assets.assests && !assets.current
      );
      const assetArray = nonCurrentAsset.map((asset) => asset.value);
      return reduceAssets(assetArray);
    }, // 비유동자산액
    nonCurrentAssetsDesc: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: {skip: 0, take: 10, orderBy: {id: "desc"}}},
      });
      const nonCurrentAsset = totalAssets.filter(
        (assets) => assets.assests && !assets.current
      );

      return nonCurrentAsset;
    }, // 비유동자산내역
    currentLiabilities: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const currentLiability = totalAssets.filter(
        (assets) => !assets.assests && assets.current
      );
      const liabilityArray = currentLiability.map((asset) => asset.value);
      return reduceAssets(liabilityArray);
    }, // 유동부채액
    currentLiabilitiesDesc: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: {skip: 0, take: 10, orderBy: {id: "desc"}}},
      });
      const currentLiability = totalAssets.filter(
        (assets) => !assets.assests && assets.current
      );
      return currentLiability;
    }, // 유동부채내역
    nonCurrentLiabilities: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const nonCurrentLiability = totalAssets.filter(
        (assets) => !assets.assests && !assets.current
      );
      const assetArray = nonCurrentLiability.map((asset) => asset.value);
      return reduceAssets(assetArray);
    }, // 비유동부채액
    nonCurrentLiabilitiesDesc: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: {skip: 0, take: 10, orderBy: {id: "desc"}}},
      });
      const nonCurrentLiability = totalAssets.filter(
        (assets) => !assets.assests && !assets.current
      );
      return nonCurrentLiability;
    }, // 비유동부채내역
    netAssets: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentLiability = totalAssets.filter((assets) => !assets.assests);
      const liabilityArray = currentLiability.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_LIABILITIES = reduceAssets(liabilityArray);
      return TOTAL_ASSETS - TOTAL_LIABILITIES;
    }, // 순자산
    capital: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentLiability = totalAssets.filter((assets) => !assets.assests);
      const liabilityArray = currentLiability.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_LIABILITIES = reduceAssets(liabilityArray);
      return TOTAL_ASSETS - TOTAL_LIABILITIES;
    }, // 자본
    liabilities: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentAssets = totalAssets.filter((assets) => assets.assests);
      const assetsArray = currentAssets.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_CAPITAL = reduceAssets(assetsArray);
      return TOTAL_ASSETS - TOTAL_CAPITAL;
    }, // 부채
    totalRevenue: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const revenue = inNoutDesc.filter(
        (ie) => ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const revenueValue = revenue.map((income) => income.money);
      return reduceAssets(revenueValue);
    }, // 총수익
    totalExpenses: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const expense = inNoutDesc.filter(
        (ie) => !ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const expenseValue = expense.map((income) => income.money);
      return reduceAssets(expenseValue);
    }, // 총비용
    netIncome: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const revenue = inNoutDesc.filter(
        (ie) => ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const revenueValue = revenue.map((income) => income.money);
      const expense = inNoutDesc.filter(
        (ie) => !ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const expenseValue = expense.map((income) => income.money);
      return reduceAssets(revenueValue) - reduceAssets(expenseValue);
    }, // 순이익
    profitMargin: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const revenue = inNoutDesc.filter(
        (ie) => ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const revenueValue = revenue.map((income) => income.money);
      const expense = inNoutDesc.filter(
        (ie) => !ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const expenseValue = expense.map((income) => income.money);
      const totalRevenue = reduceAssets(revenueValue);
      const netIncome = reduceAssets(revenueValue) - reduceAssets(expenseValue);
      if (totalRevenue <= 0 || netIncome <= 0) {
        return 0;
      }
      return Number(((netIncome / totalRevenue) * 100).toFixed(4));
    }, // 이익률
    equityRatio: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentLiability = totalAssets.filter((assets) => !assets.assests);
      const liabilityArray = currentLiability.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_LIABILITIES = reduceAssets(liabilityArray);
      const CAPITAL = TOTAL_ASSETS - TOTAL_LIABILITIES;

      return !(CAPITAL / TOTAL_ASSETS) ? 0 : (CAPITAL / TOTAL_ASSETS) * 100;
    }, // 자기자본비율
    debtRatio: async ({id}: InNout) => {
      const {totalAssets} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentLiability = totalAssets.filter((assets) => !assets.assests);
      const liabilityArray = currentLiability.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_LIABILITIES = reduceAssets(liabilityArray);

      return !(TOTAL_LIABILITIES / TOTAL_ASSETS)
        ? 0
        : (TOTAL_LIABILITIES / TOTAL_ASSETS) * 100;
    }, // 부채비율
    roe: async ({id}: InNout) => {
      const {totalAssets, inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {totalAssets: true, inNoutDesc: true},
      });
      const t_Assets = totalAssets.map((asset) => asset.value);
      const currentLiability = totalAssets.filter((assets) => !assets.assests);
      const liabilityArray = currentLiability.map((asset) => asset.value);
      const TOTAL_ASSETS = reduceAssets(t_Assets);
      const TOTAL_LIABILITIES = reduceAssets(liabilityArray);
      const CAPITAL = TOTAL_ASSETS - TOTAL_LIABILITIES;
      const revenue = inNoutDesc.filter(
        (ie) => ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const revenueValue = revenue.map((income) => income.money);
      const expense = inNoutDesc.filter(
        (ie) => !ie.incomeTrue && ie.paymentsDone === "PAID"
      );
      const expenseValue = expense.map((income) => income.money);
      const NETINCOME = reduceAssets(revenueValue) - reduceAssets(expenseValue);
      return NETINCOME / CAPITAL === Infinity || !(NETINCOME / CAPITAL)
        ? 0
        : Number(((NETINCOME / CAPITAL) * 100).toFixed(5));
    }, // 자기자본회수기간
    incomeModel: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const income = inNoutDesc.filter(
        (item) => item.incomeTrue && item.paymentsDone === "PAID"
      );
      return income;
    }, // 수익모델
    incomeMoney: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const income = inNoutDesc.filter(
        (item) => item.incomeTrue && item.paymentsDone === "PAID"
      );
      const {money} = income.reduce(
        (prevValue, currentValue) => ({
          money: prevValue.money + currentValue.money,
        }),
        {money: 0}
      );
      return money;
    }, // 수익금
    expendModel: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const expend = inNoutDesc.filter(
        (item) => !item.incomeTrue && item.paymentsDone === "PAID"
      );
      return expend;
    }, // 지출모델
    expendMoney: async ({id}: InNout) => {
      const {inNoutDesc} = await client.inNout.findUnique({
        where: {id},
        select: {inNoutDesc: true},
      });
      const expend = inNoutDesc.filter(
        (item) => !item.incomeTrue && item.paymentsDone === "PAID"
      );
      const {money} = expend.reduce(
        (prevValue, currentValue) => ({
          money: prevValue.money + currentValue.money,
        }),
        {money: 0}
      );
      return money;
    }, // 지출금
  },
} as Resolvers;
