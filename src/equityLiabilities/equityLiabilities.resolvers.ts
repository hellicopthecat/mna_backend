import {EquityLiabilities} from "@prisma/client";
import {protectResolver} from "../user/user.util";
import client from "../prismaClient";

export default {
  EquityLiabilities: {
    inNoutId: protectResolver(async ({id}: EquityLiabilities) => {
      const {inNoutId} = await client.equityLiabilities.findUnique({
        where: {id},
        select: {inNoutId: true},
      });
      return inNoutId;
    }),
  },
};
