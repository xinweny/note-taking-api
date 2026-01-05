// Abstract class blueprint for creating custom error classes
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);

    statusCode = statusCode;
  }

  abstract serialize(): { message: string };
}
