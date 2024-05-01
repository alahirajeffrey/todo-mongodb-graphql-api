import Todo from "./todo.model.js";

const resolvers = {
  // get todo by id
  getTodo: async ({ id }) => {
    try {
      const todo = await Todo.findById(id);
      return todo;
    } catch (error) {
      throw new Error(`Error retrieving todo: ${error.message}`);
    }
  },

  // get all users
  getTodos: async () => {
    try {
      const todos = await Todo.find();
      return todos;
    } catch (error) {
      throw new Error(`Error retrieving todos: ${error.message} `);
    }
  },

  // add new todo
  addTodo: async ({ title, description }) => {
    try {
      // validate input
      if (!title || !description) {
        return { message: "title and or description are required" };
      }

      const todo = await Todo.create({
        title: title,
        description: description,
      });

      console.log(todo);

      return todo;
    } catch (error) {
      throw new Error(`Error creating todo: ${error.message}`);
    }
  },

  // update a todo
  updateTodo: async ({ id, title, description, isCompleted }) => {
    try {
      // validate input
      if (!id) {
        return { message: "id is required" };
      }
      const updatedTodo = await Todo.findByIdAndUpdate(id, {
        title: title,
        description: description,
        isCompleted: isCompleted,
      });

      return updatedTodo;
    } catch (error) {
      throw new Error(`Error updating todo: ${error.message}`);
    }
  },

  // delete todo
  deleteTodo: async ({ id }) => {
    try {
      // validate input
      if (!id) {
        return { message: "id is required" };
      }

      const todo = await Todo.findByIdAndDelete(id);
      return todo;
    } catch (error) {
      throw new Error(`Error deleting todo: ${error.message}`);
    }
  },
};

export default resolvers;
