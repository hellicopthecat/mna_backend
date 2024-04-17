import bcrypt from "bcrypt";
import {User} from "@prisma/client";
import client from "../../prismaClient";
import {Resolvers} from "../../types";

export default {
  Mutation: {
    createUser: async (
      _,
      {username, email, password, firstName, lastName, phone}: User
    ) => {
      try {
        const existsUser = await client.user.findFirst({
          where: {OR: [{username}, {email}]},
        });
        if (existsUser) {
          if (username === existsUser.username) {
            return {
              ok: false,
              errorMsg: "사용되고 있는 유저이름입니다.",
            };
          }
          if (email === existsUser.email) {
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
        } else {
          const bcryptPw = await bcrypt.hash(password, 10);
          const create = await client.user.create({
            data: {
              username,
              password: bcryptPw,
              firstName,
              lastName,
              email,
              phone,
            },
          });
          if (create) {
            return {
              ok: true,
            };
          }
        }
      } catch (error) {
        return error;
      }
    },
  },
} as Resolvers;
