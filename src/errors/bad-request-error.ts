import { CustomError } from './custom-error.ts';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Bad Request');

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return { message: 'The server was unable to process the request.' };
  }
}
