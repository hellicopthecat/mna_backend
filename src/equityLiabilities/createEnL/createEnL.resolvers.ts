import {Company, EquityLiabilities} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    createEnL: protectResolver(
      async (
        _,
        {
          companyName,
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
        const existsAdmin = await client.company.findFirst({
          where: {
            companyName,
            OR: [
              {companyManager: {some: {id: logginUser.id}}},
              {companyOwner: {id: logginUser.id}},
            ],
          },
        });
        console.log(existsAdmin);
        if (!existsAdmin) {
          return {
            ok: false,
            errorMsg: "존재하지않는 회사이거나 권한이 없습니다.",
          };
        }
        const findEnL = await client.equityLiabilities.findFirst({
          where: {enLId},
        });
        if (findEnL) {
          return {ok: false, errorMsg: "존재하는 자산 제목입니다."};
        }
        const createEnL = await client.equityLiabilities.create({
          data: {
            enLId,
            enLName,
            enLType,
            enLDesc,
            current,
            assests,
            value,
          },
        });
        const updateInNout = await client.inNout.update({
          where: {id: existsAdmin.inNoutId},
          data: {
            totalAssets: {connect: {id: createEnL.id}},
          },
        });
        if (!createEnL && !updateInNout) {
          return {
            ok: false,
            errorMsg: "자산을 생성하는데 실패하였습니다.",
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
