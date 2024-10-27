import mongoose from "mongoose";
import { TErrorSources, TGenericResponce } from "../interface/error";

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericResponce => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  return {
    statusCode: 400,
    errorSources,
    message: "validation Error.",
  };
};
