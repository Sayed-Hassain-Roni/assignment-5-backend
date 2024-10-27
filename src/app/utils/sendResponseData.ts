import { Response } from "express";
import httpStatus from "http-status";

const sendResponseData = <T>(res: Response, data: T, message: string) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: message,
    data: data,
  });
};

export default sendResponseData;
