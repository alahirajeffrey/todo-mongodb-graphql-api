import mongoose from "mongoose";

export default connectDatabase = async (connectionUri) => {
  mongoose
    .connect(connectionUri)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((err) => {
      console.error(`Error occured : ${err.message}`);
    });
};
