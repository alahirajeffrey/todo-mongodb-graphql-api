import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLNullableType,
} from "graphql";
import Todo from "./todo.model";

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
  }),
});

const Queries = new GraphQLObjectType({
  name: "Queries",
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find();
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    // add todo
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const todo = Todo.create({
          title: args.title,
          description: args.description,
        });

        return { message: "Todo created", data: todo };
      },
    },

    // update todo
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNullableType(GraphQLString) },
        description: { type: GraphQLNullableType(GraphQLString) },
        isCompleted: { type: GraphQLNullableType(GraphQLBoolean) },
      },
      resolve(parent, args) {
        const updatedTodo = Todo.findByIdAndUpdate(args.id, {
          title: args.title,
          description: args.description,
          isCompleted: args.isCompleted,
        });

        return { message: "Todo updated", data: updatedTodo };
      },
    },

    //delete todo
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Todo.findByIdAndDelete(args.id);

        return { message: "Todo deleted" };
      },
    },
  },
});

export default new GraphQLSchema({ query: Queries, mutation: Mutations });
