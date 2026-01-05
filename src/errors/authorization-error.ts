import { CustomError } from './custom-error.ts';

export class AuthorizationError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Forbidden');

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serialize() {
    return { message: 'User not logged in.' };
  }
}
