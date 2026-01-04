declare global {
  declare namespace Express {
    interface Request {
      user?: {
        id: number;
      }
    }
  }
}

export {}