import Mongoose from "mongoose";

let database: Mongoose.Connection;
const uri: string | undefined = process.env.MONGO_URI;

export const connect = async () => {
  if (database || !uri) {
    return;
  }

  await Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;
}

export const disconnect = async () => {
  if (!database) {
    return;
  }

  await Mongoose.disconnect();
}
