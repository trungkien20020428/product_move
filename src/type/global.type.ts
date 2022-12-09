export type validate = Promise<{
  message: string;
  success: boolean;
}>;

export type resType = Promise<{
  code: number;
  success: boolean;
  message: string;
  result: object;
}>;
