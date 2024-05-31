import {Company} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    searchByCompanyName: protectResolver(async (_, {companyName}: Company) => {
      if (!companyName) {
        return [];
      }
      const findCompany = await client.company.findMany({
        where: {companyName: {contains: companyName}},
      });

      return findCompany;
    }),
  },
};
