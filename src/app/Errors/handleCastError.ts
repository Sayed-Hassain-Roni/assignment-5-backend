import mongoose from "mongoose";
import { TErrorSources, TGenericResponce } from "../interface/error";

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericResponce => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    errorSources,
    message: "Invalid ID.",
  };
};
