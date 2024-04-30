import mongoose from "mongoose";

export const connectDatabase = async (connectionUri) => {
  await mongoose
    .connect(connectionUri)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.error(`Error occured : ${err.message}`);
    });
};
