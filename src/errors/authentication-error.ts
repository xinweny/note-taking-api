import { CustomError } from './custom-error.ts';

export class AuthenticationError extends CustomError {
  statusCode = 401;

  constructor(message = 'Not Allowed') {
    super(message);
  }
}
