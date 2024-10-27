import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

const NotFound = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    succuess: false,
    statusCode: 404,
    message: "Not Found",
  });
};

export default NotFound;
