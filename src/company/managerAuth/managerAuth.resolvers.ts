import {Company, User} from "@prisma/client";
import {protectResolver} from "../../user/user.util";
import client from "../../prismaClient";

export default {
  Mutation: {
    managerAuth: protectResolver(
      async (_, {username, companyName}: User & Company, {logginUser}) => {
        try {
          //find User
          const existsUser = await client.user.findFirst({where: {username}});
          if (!existsUser) {
            return {ok: false, errorMsg: "유저가 없습니다."};
          }
          //target Company
          const targetCompany = await client.company.findUnique({
            where: {companyName},
          });
          if (!targetCompany) {
            return {ok: false, errorMsg: "등록된 회사가 존재하지 않습니다."};
          }
          //companyManager
          const checkAdmin = await client.company.findFirst({
            where: {companyName, companyManager: {some: {id: logginUser.id}}},
          });

          if (!checkAdmin) {
            return {ok: false, errorMsg: "권한이 없습니다."};
          }

          //update Company
          const updateCompany = await client.company.update({
            where: {companyName},
            data: {
              companyManager: {connect: {id: existsUser.id}},
              worker: {connect: {id: existsUser.id}},
            },
          });
          if (!updateCompany) {
            return {ok: false, errorMsg: "직원으로 등록할수없습니다."};
          }
          return {
            ok: true,
          };
        } catch (err) {
          return err;
        }
      }
    ),
  },
};
