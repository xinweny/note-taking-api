export class CustomError extends Error {
  declare statusCode: number;
  declare message: string;

  constructor(statusCode: number, message: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}
