import config from "../../config";
import { TLogingUser, TUser } from "./user.interface";
import { LoginUserModel, UserModel } from "./user.model";

const CreateUserIntoDB = async (payload: TUser) => {
  const LoginData: Partial<TLogingUser> = {};

  LoginData.password = payload.password || (config.default_password as string);

  LoginData.email = payload.email;
  LoginData.role = payload.role;

  // create login user..
  const newUser = await LoginUserModel.create(LoginData);

  if (Object.values(newUser).length) {
    const results = await UserModel.create(payload);

    return results;
  }
};

export const UserServices = {
  CreateUserIntoDB,
};
