import {Salary} from "@prisma/client";
import {Resolvers} from "../types";
import client from "../prismaClient";
import {
  childTax,
  earnIncomeDedution,
  earnIncomeTaxCredit,
  familyDedution,
  pensionInsuranceDedution,
  simplifiedTax,
  specialIncomeDedution,
  taxBase,
  taxCalculate,
} from "./salary.util";

export default {
  Salary: {
    annualSalary: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      return preTaxMonthlySalary * 12;
    }, // 연봉
    earnIncomeDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      return earnIncomeDedution(preTaxMonthlySalary * 12);
    }, //근로소득공제금액
    earnIncomeAmount: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      const annualSalary = preTaxMonthlySalary * 12;
      return annualSalary - earnIncomeDedution(annualSalary);
    }, //근로소득금액
    familyDedution: async ({id}: Salary) => {
      const {familyCount} = await client.salary.findUnique({
        where: {id},
        select: {familyCount: true},
      });
      return familyDedution(familyCount);
    }, //인적공제
    pensionInsuranceDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      return pensionInsuranceDedution(preTaxMonthlySalary);
    }, //연금보험료공제
    specialIncomeDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      return specialIncomeDedution(preTaxMonthlySalary * 12, familyCount);
    }, //특별소득공제
    taxBase: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      const annualSalary = preTaxMonthlySalary * 12;
      const e_Amount = annualSalary - earnIncomeDedution(annualSalary);
      const f_dedution = familyDedution(familyCount);
      const pi_dedution = pensionInsuranceDedution(preTaxMonthlySalary);
      const s_dedution = specialIncomeDedution(annualSalary, familyCount);
      return taxBase(e_Amount, f_dedution, pi_dedution, s_dedution);
    }, //과세표준
    taxCalculate: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      const annualSalary = preTaxMonthlySalary * 12;
      const e_Amount = annualSalary - earnIncomeDedution(annualSalary);
      const f_dedution = familyDedution(familyCount);
      const pi_dedution = pensionInsuranceDedution(preTaxMonthlySalary);
      const s_dedution = specialIncomeDedution(annualSalary, familyCount);
      const baseTax = taxBase(e_Amount, f_dedution, pi_dedution, s_dedution);
      return taxCalculate(baseTax);
    }, //산출세액
    earnIncomeTaxCredit: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      const annualSalary = preTaxMonthlySalary * 12;
      const e_Amount = annualSalary - earnIncomeDedution(annualSalary);
      const f_dedution = familyDedution(familyCount);
      const pi_dedution = pensionInsuranceDedution(preTaxMonthlySalary);
      const s_dedution = specialIncomeDedution(annualSalary, familyCount);
      const baseTax = taxBase(e_Amount, f_dedution, pi_dedution, s_dedution);
      const calculatedTax = taxCalculate(baseTax);
      return (
        Math.floor(earnIncomeTaxCredit(annualSalary, calculatedTax) / 100) * 100
      );
    }, //근로소득세액공제
    taxDetermined: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      const annualSalary = preTaxMonthlySalary * 12;
      const e_Amount = annualSalary - earnIncomeDedution(annualSalary);
      const f_dedution = familyDedution(familyCount);
      const pi_dedution = pensionInsuranceDedution(preTaxMonthlySalary);
      const s_dedution = specialIncomeDedution(annualSalary, familyCount);
      const baseTax = taxBase(e_Amount, f_dedution, pi_dedution, s_dedution);
      const calculatedTax = taxCalculate(baseTax);
      const earnTaxCredit = earnIncomeTaxCredit(annualSalary, calculatedTax);
      return Math.floor((calculatedTax - earnTaxCredit) / 100) * 100;
    }, //결정세액
    simplifiedTax: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      const annualSalary = preTaxMonthlySalary * 12;
      const e_Amount = annualSalary - earnIncomeDedution(annualSalary);
      const f_dedution = familyDedution(familyCount);
      const pi_dedution = pensionInsuranceDedution(preTaxMonthlySalary);
      const s_dedution = specialIncomeDedution(annualSalary, familyCount);
      const baseTax = taxBase(e_Amount, f_dedution, pi_dedution, s_dedution);
      const calculatedTax = taxCalculate(baseTax);
      const earnTaxCredit = earnIncomeTaxCredit(annualSalary, calculatedTax);
      const taxDetermined = calculatedTax - earnTaxCredit;
      return simplifiedTax(taxDetermined);
    }, //간이세액
    childTax: async ({id}: Salary) => {
      const {childCount} = await client.salary.findUnique({
        where: {id},
        select: {childCount: true},
      });
      return childTax(childCount);
    },
    user: async ({id}: Salary) => {
      const {user} = await client.salary.findFirst({
        where: {id},
        select: {user: true},
      });
      return user;
    },
    company: async ({id}: Salary) => {
      const {company} = await client.salary.findFirst({
        where: {id},
        select: {company: true},
      });
      return company;
    },
  },
} as Resolvers;
