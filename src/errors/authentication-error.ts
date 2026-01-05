import { CustomError } from './custom-error.ts';

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Unauthenticated');

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serialize() {
    return { message: 'User authentication failed.' };
  }
}
