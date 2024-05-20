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
    },
    earnIncomeDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      return earnIncomeDedution(preTaxMonthlySalary * 12);
    },
    earnIncomeAmount: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      const annualSalary = preTaxMonthlySalary * 12;
      return annualSalary - earnIncomeDedution(annualSalary);
    },
    familyDedution: async ({id}: Salary) => {
      const {familyCount} = await client.salary.findUnique({
        where: {id},
        select: {familyCount: true},
      });
      return familyDedution(familyCount);
    },
    pensionInsuranceDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary} = await client.salary.findUnique({
        where: {id},
        select: {preTaxMonthlySalary: true},
      });
      return pensionInsuranceDedution(preTaxMonthlySalary);
    },
    specialIncomeDedution: async ({id}: Salary) => {
      const {preTaxMonthlySalary, familyCount} = await client.salary.findUnique(
        {
          where: {id},
          select: {preTaxMonthlySalary: true, familyCount: true},
        }
      );
      return specialIncomeDedution(preTaxMonthlySalary * 12, familyCount);
    },
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
    },
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
    },
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
      return earnIncomeTaxCredit(annualSalary, calculatedTax);
    },
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
      return calculatedTax - earnTaxCredit;
    },
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
    },
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
