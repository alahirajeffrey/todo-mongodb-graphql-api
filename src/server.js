import express from "express";
import * as dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import connectDatabase from "./db";
import schema from "./graphql.schema";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();

connectDatabase(process.env.MONGO_URI);

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
