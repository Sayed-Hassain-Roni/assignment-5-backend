import { Request, Response } from "express";
import { AuthLoginServices } from "./auth.services";
import catchAsync from "../../utils/catchasync";

const atuhLogin = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log("this", user);
  const results = await AuthLoginServices.AuthLoging(req.body);
  console.log(results.accessToken);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User loging successfully",
    token: results.accessToken,
    data: results,
  });
});

export const AuthController = {
  atuhLogin,
};
