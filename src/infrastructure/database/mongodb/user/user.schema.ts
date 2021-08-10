import { Schema } from "mongoose";

export default new Schema({
  uid: String,
  name: String,
  email: String,
  password: String
});
