import { CustomError } from './custom-error.ts';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return { message: 'Resource not found.' };
  }
}
