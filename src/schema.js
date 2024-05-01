import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    description: String!
    isCompleted: Boolean!
    createdAt: String!
  }

  type Query {
    getTodo(id: ID!): Todo
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(title: String!, description: String!): Todo
    updateTodo(id: ID!, title: String, description: String, isCompleted: Boolean): Todo
    deleteTodo(id: ID!): Todo
  }
`);

export default schema;
