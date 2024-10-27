import { Request, Response } from "express";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchasync";
import sendResponseData from "../../utils/sendResponseData";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.CreateUserIntoDB(req.body);

  const message = "User registered successfully";
  sendResponseData(res, user, message);
});

export const UserController = {
  createUser,
};
