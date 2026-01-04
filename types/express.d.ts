declare global {
  declare namespace Express {
    interface Request {
      user?: {
        id: number;
      }
      file?: Express.Multer.File;
      cacheKey?: string;
    }
  }
}

export {}