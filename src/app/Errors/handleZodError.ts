import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericResponce } from "../interface/error";

export const handleZodError = (err: ZodError): TGenericResponce => {
  const statusCode = 400;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};
