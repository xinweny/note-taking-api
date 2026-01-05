import { CustomError } from './custom-error.ts';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message = 'Bad Request') {
    super(message);
  }
}
