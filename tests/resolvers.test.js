import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import resolvers from "../src/resolvers.js";
import Todo from "../src/todo.model.js";

// const { MongoMemoryServer } = require("mongodb-memory-server");
// const mongoose = require("mongoose");
// const resolvers = require("../src/resolvers.js");
// const Todo = require("../src/todo.model.js");

describe("Resolvers test", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  it("should get a todo by id", async () => {
    const todoData = { title: "test title", description: "test description" };
    const todo = await Todo.create(todoData);

    const result = await resolvers.getTodo({ id: todo._id });

    expect(result).toEqual(expect.objectContaining(todoData));
  });

  it("should get all todos", async () => {
    const todosData = [
      { title: "first todo", description: "test description" },
      { title: "second todo", description: "test description" },
    ];
    await Todo.create(todosData);

    const result = await resolvers.getTodos();

    expect(result).toHaveLength(todosData.length);
  });

  it("should add a new todo", async () => {
    const todoData = { title: "test title", description: "test description" };

    const result = await resolvers.addTodo(todoData);

    expect(result).toMatchObject(todoData);
  });
});
