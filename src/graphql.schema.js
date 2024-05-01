// import {
//   GraphQLObjectType,
//   GraphQLSchema,
//   GraphQLID,
//   GraphQLBoolean,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLString,
// } from "graphql";
// import Todo from "./todo.model.js";

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

// const TodoType = new GraphQLObjectType({
//   name: "Todo",
//   fields: () => ({
//     id: { type: GraphQLID },
//     title: { type: GraphQLString },
//     description: { type: GraphQLString },
//     isCompleted: { type: GraphQLBoolean },
//     createdAt: { type: GraphQLString },
//   }),
// });

// const Queries = new GraphQLObjectType({
//   name: "Queries",
//   fields: {
//     todo: {
//       type: TodoType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return Todo.findById(args.id);
//       },
//     },
//     todos: {
//       type: new GraphQLList(TodoType),
//       resolve(parent, args) {
//         return Todo.find();
//       },
//     },
//   },
// });

// const Mutations = new GraphQLObjectType({
//   name: "Mutations",
//   fields: {
//     // add todo
//     addTodo: {
//       type: TodoType,
//       args: {
//         title: { type: GraphQLNonNull(GraphQLString) },
//         description: { type: GraphQLNonNull(GraphQLString) },
//       },
//       async resolve(parent, args) {
//         const todo = Todo.create({
//           title: args.title,
//           description: args.description,
//         });

//         return todo;
//       },
//     },

//     // update todo
//     updateTodo: {
//       type: TodoType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//         title: { type: GraphQLString },
//         description: { type: GraphQLString },
//         isCompleted: { type: GraphQLBoolean },
//       },
//       async resolve(parent, args) {
//         const updatedTodo = Todo.findByIdAndUpdate(args.id, {
//           title: args.title,
//           description: args.description,
//           isCompleted: args.isCompleted,
//         });

//         return updatedTodo;
//       },
//     },

//     //delete todo
//     deleteTodo: {
//       type: TodoType,
//       args: {
//         id: { type: GraphQLNonNull(GraphQLID) },
//       },
//       async resolve(parent, args) {
//         return Todo.findByIdAndDelete(args.id);
//       },
//     },
//   },
// });

// export default new GraphQLSchema({ query: Queries, mutation: Mutations });

export default schema;
