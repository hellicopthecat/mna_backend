import {Company, EquityLiabilities} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    editEnL: protectResolver(
      async (
        _,
        {
          id,
          enLId,
          enLName,
          enLType,
          enLDesc,
          current,
          assests,
          value,
        }: Company & EquityLiabilities,
        {logginUser}
      ) => {
        const existsAdmin = await client.company.findUnique({
          where: {id, companyManager: {some: {id: logginUser.id}}},
        });
        if (!existsAdmin) {
          return {
            ok: false,
            errorMsg: "권한이 없습니다.",
          };
        }
        const findEnL = await client.equityLiabilities.findFirst({
          where: {enLId},
        });
        if (!findEnL) {
          return {ok: false, errorMsg: "존재하지 않는 자산 제목입니다."};
        }
        const updateEnL = await client.equityLiabilities.update({
          where: {enLId},
          data: {
            enLName,
            enLType,
            enLDesc,
            current,
            assests,
            value,
          },
        });

        if (!updateEnL) {
          return {
            ok: false,
            errorMsg: "자산을 편집하는데 실패하였습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
