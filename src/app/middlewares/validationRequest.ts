import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationRequest = (validateSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateSchema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationRequest;
