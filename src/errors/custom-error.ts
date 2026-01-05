// Abstract class blueprint for creating custom error classes
export abstract class CustomError extends Error {
  declare statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);

    statusCode = statusCode;
  }
}
