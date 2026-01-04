import { JwtPayload } from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface JwtUserPayload extends JwtPayload {
    id: number;
  }
}