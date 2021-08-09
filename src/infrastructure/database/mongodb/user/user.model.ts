import { model } from "mongoose";
import { IUserDocument } from "@src/infrastructure/database/mongodb/user/user.types";
import UserSchema from "@src/infrastructure/database/mongodb/user/user.schema";

export const collection = "users";

export const UserModel = model<IUserDocument>(collection, UserSchema);
