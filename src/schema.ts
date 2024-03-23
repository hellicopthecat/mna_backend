import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";

const typeLoader = loadFilesSync(`${__dirname}/**/*.typeDefs.graphql`);
const resolverLoader = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(typeLoader);
export const resolvers = mergeResolvers(resolverLoader);
