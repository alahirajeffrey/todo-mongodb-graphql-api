import express from "express";
import * as dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { connectDatabase } from "./db.js";
import schema from "./graphql.schema.js";
import resolvers from "./resolvers.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDatabase(process.env.MONGO_URI);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
