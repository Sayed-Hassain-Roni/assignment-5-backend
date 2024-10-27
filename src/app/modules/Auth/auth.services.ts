import { compare, hash } from "bcrypt";
import { UserModel } from "../Users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import { resolve } from "path";
import config from "../../config";

const AuthLoging = async (payload: TLoginUser) => {
  //Check user exits..
  const User = await UserModel.findOne({ email: payload?.email });

  if (!User) {
    throw new Error("Email dose not exits..");
  }

  //Check Password Correct..
  const isPasswordCorrect = await compare(payload?.password, User?.password);

  if (!isPasswordCorrect) {
    throw new Error("Password dose not match..");
  }

  // Create token...

  const jwtPayload = {
    userId: User,
    role: User.role,
  };
  //   console.log(jwtPayload.userId);

  const accessToken = jwt.sign(jwtPayload, config.jwt_token_access as string, {
    expiresIn: "30d",
  });
  console.log(User._id);
  return {
    User,
    accessToken,
  };
};

export const AuthLoginServices = {
  AuthLoging,
};
