import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

export type User = {
  userId: string;
  email: string;
  role: string;
};
