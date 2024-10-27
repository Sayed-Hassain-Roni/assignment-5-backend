import { TErrorSources, TGenericResponce } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericResponce => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: " ",
      message: extractedMessage,
    },
  ];

  return {
    statusCode: 400,
    message: "Duplicate ID.",
    errorSources,
  };
};
