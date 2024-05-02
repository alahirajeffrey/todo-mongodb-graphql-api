import { graphql, buildSchema } from "graphql";
import { connectDatabase } from "./src/db.js";
import schema from "./src/schema.js";
import resolvers from "./src/resolvers.js";

const handler = async (event, context) => {
  try {
    // Initialize database connection
    await connectDatabase(process.env.MONGO_URI);

    // Parse incoming GraphQL query from the Lambda event
    const { query } = JSON.parse(event.body);

    // Execute GraphQL query
    const response = await graphql({
      schema: buildSchema(schema),
      source: query, // Assuming query is a string
      contextValue: {
        /* Optionally provide context value */
      },
      rootValue: resolvers,
    });

    // Return GraphQL response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (error) {
    // Handle errors gracefully
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export { handler };
