import { Schema, model } from "mongoose";
import { hash } from "bcrypt";
import { TLogingUser, TUser } from "./user.interface";

// Define the TUser schema
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
    address: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Define the TUser schema
const LoginUserSchema = new Schema<TLogingUser>({
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, required: true, enum: ["admin", "user"] },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Create the model..
export const UserModel = model<TUser>("User", userSchema);
export const LoginUserModel = model<TLogingUser>("LoginUser", LoginUserSchema);
