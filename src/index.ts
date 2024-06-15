import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import {typeDefs, resolvers} from "./schema";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {getUser} from "./user/user.util";

const PORT = 4000;
const schema = makeExecutableSchema({typeDefs, resolvers});
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "http://localhost:4000/graphql",
        "http://localhost:8081",
        "http://localhost:5173",
      ],
      exposedHeaders: ["Apollo-Require-Preflight"],
    }),
    express.json(),
    morgan("tiny"),
    expressMiddleware(server, {
      context: async ({req}) => ({
        logginUser: await getUser(req.headers.token),
      }),
    })
  );
});
httpServer.listen(PORT, () => {
  console.log(`✅ Server is Listen http://localhost:${PORT}/graphql`);
});
