import { CustomError } from './custom-error.ts';

export class AuthorizationError extends CustomError {
  statusCode = 403;

  constructor(message = 'Forbidden') {
    super(message);
  }
}
