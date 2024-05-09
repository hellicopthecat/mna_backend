import {Company, EquityLiabilities} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Query: {
    seeEnL: protectResolver(
      async (
        _,
        {companyName, id}: Company & EquityLiabilities,
        {logginUser}
      ) => {
        const existsAdmin = await client.company.findUnique({
          where: {companyName, companyManager: {some: {id: logginUser.id}}},
        });
        if (!existsAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        }
        const findEnL = await client.equityLiabilities.findUnique({
          where: {id},
        });
        if (!findEnL) {
          return {ok: false, errorMsg: "존재하지 않는 자산 제목입니다."};
        }
        return findEnL;
      }
    ),
  },
};
