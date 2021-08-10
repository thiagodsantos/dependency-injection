import Mongoose from "mongoose";

let database: Mongoose.Connection;
const uri: string | undefined = process.env.MONGO_URI;

export const connect = async () => {
  if (database || !uri) {
    return;
  }

  try {
    await Mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    database = Mongoose.connection;
  } catch (error) {
    throw new Error('DATABASE_CONNECT_ERROR');
  }
}

export const disconnect = async () => {
  if (!database) {
    return;
  }

  try {
    await Mongoose.disconnect();
  } catch (error) {
    throw new Error('DATABASE_DISCONNECT_ERROR');
  }
}
