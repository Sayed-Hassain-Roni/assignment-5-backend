export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericResponce = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
