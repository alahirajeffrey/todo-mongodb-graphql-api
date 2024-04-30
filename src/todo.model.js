import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("todo", TodoSchema);
