import {User} from "@prisma/client";

type Context = {
  logginUser?: User;
  abbreviation: 1000000;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
