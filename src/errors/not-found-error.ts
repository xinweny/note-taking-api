import { CustomError } from './custom-error.ts';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message = 'Not Found') {
    super(message);
  }
}
