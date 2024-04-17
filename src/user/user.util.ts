import jwt, {JwtPayload} from "jsonwebtoken";
import client from "../prismaClient";
import {Context, Resolver} from "../types";
import {GraphQLResolveInfo} from "graphql";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const {id} = jwt.verify(token, process.env.TOKEN_SECRET_KEY) as JwtPayload;
    const user = await client.user.findUnique({where: {id}});

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectResolver =
  (resovler: Resolver) =>
  (root: any, args: any, context: Context, info: GraphQLResolveInfo) => {
    if (!context.logginUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return;
      } else {
        return {
          ok: false,
          errorMsg: "로그인 후 사용 가능합니다.",
        };
      }
    }
    return resovler(root, args, context, info);
  };
