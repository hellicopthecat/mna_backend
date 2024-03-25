import bcrypt from "bcrypt";
import {User} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";

export default {
  Mutation: {
    createUser: async (
      _,
      {username, password, firstName, lastName, email}: User
    ) => {
      try {
        const existsUser = await client.user.findFirst({
          where: {OR: [{username}, {email}]},
        });
        if (existsUser.username === username) {
          return {
            ok: false,
            errorMsg: "사용되고 있는 유저이름입니다.",
          };
        }
        if (existsUser.email === email) {
          return {
            ok: false,
            errorMsg: "사용되고 있는 이메일입니다.",
          };
        }
        if (password.length < 3) {
          return {
            ok: false,
            errorMsg: "비밀번호는 3자리보다 커야합니다.",
          };
        }
        const bcryptPw = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            password: bcryptPw,
            firstName,
            lastName,
            email,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return error;
      }
    },
  },
} as Resolvers;
